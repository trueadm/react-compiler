import glob from "glob";
import { promisify } from "util";
import fs from "fs";
import { transform } from "@babel/core";
import { performance } from "perf_hooks";
import chalk from "chalk";
import { createElementForTesting } from "./compiler-runtime/utils";
import { renderToString } from "./compiler-runtime/renderToString";
import { render } from "./compiler-runtime/render";
import tmp from "tmp";
import { compiler as ClosureCompiler } from "google-closure-compiler";
import path from "path";
import { JSDOM } from "jsdom";
import { createContext, createReactNode, useState } from "./compiler-runtime/index";
import { parse } from "simple-html-dom-parser";

process.env.NODE_ENV = "production";

const { compileEntryModuleFileToDirectory, parseAndCompileSource } = require("../lib/compiler");
const { window } = new JSDOM(``);
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const argv = require("minimist")(process.argv.slice(2));
const ReactDOMServer = require("react-dom/server");
const ReactDOM = require("react-dom");
const mode = argv.mode === "dom" ? "dom" : argv.mode === "ssr" ? "ssr" : null;

if (mode === null) {
  console.log(
    `Invalid or no "mode" specified for test. Use --mode to specify a mode. Possible values are "ssr" and  "dom".`,
  );
  process.exit(1);
}

/* eslint-disable-next-line */
global.window = window;
/* eslint-disable-next-line */
global.document = window.document;

const sizeFlag = argv.size || false;
const benchmarkFlag = argv.benchmark || false;
let filterTests = Array.isArray(argv._) && argv._.length > 0 ? argv._[0] : null;

function transformSource(source) {
  source = source.replace(
    /import {\W.*} from "react-compiler-runtime";/g,
    `const { "createReactNode": createReactNode } = require("react-compiler-runtime");`,
  );
  return transform(source, {
    configFile: false,
    presets: ["@babel/preset-flow"],
    plugins: [
      ["@babel/plugin-proposal-object-rest-spread", { loose: true, useBuiltIns: true }],
      ["@babel/plugin-transform-react-jsx", { useBuiltIns: true }],
    ],
  }).code;
}

function loadBabelRegister() {
  require("@babel/register")({
    include: [/node_modules/, /scripts/, /tests/],
    ignore: [],
    cache: false,
    configFile: false,
    presets: ["@babel/preset-env", "@babel/preset-flow"],
    plugins: [
      ["@babel/plugin-transform-modules-commonjs", { loose: true, allowTopLevelThis: true }],
      ["@babel/plugin-proposal-object-rest-spread", { loose: true, useBuiltIns: true }],
      ["@babel/plugin-transform-react-jsx", { useBuiltIns: true }],
    ],
  });
}

function executeSource(source, needsTransforming) {
  const transformedSource = needsTransforming ? transformSource(source) : source;
  /* eslint-disable-next-line */
  let fn = new Function("require", "module", "exports", transformedSource);
  const module = {};
  const exports = {};
  module.exports = exports;
  try {
    fn(
      _path => {
        if (_path === "react-compiler-runtime") {
          return {
            createContext,
            createReactNode,
            useState,
          };
        }
        return require(_path);
      },
      module,
      exports,
    );
  } catch (error) {
    console.log("Failed to execute sourcecode:\n\n");
    console.error(error.stack);
    process.exit(1);
  }
  if (module.exports === undefined) {
    throw new Error(`Executed code did not assign anything to "module.exports".`);
  }
  return module.exports;
}

function renderOriginalComponent(component, props) {
  const root = document.createElement("div");
  document.body.appendChild(root);
  /* eslint-disable-next-line */
  if (global.gc) global.gc();
  if (benchmarkFlag) {
    // Run once to warm up cache
    ReactDOM.render(createElementForTesting(component, props), root);
    ReactDOM.render(null, root);
  }
  // Run once again to measure perf
  const start = performance.now();
  ReactDOM.render(createElementForTesting(component, props), root);
  const time = Math.round((performance.now() - start) * 100) / 100;
  const output = root.innerHTML;
  ReactDOM.render(null, root);
  document.body.removeChild(root);
  root.innerHTML = "";
  return {
    output: unescapeCompiledOutput(output),
    time,
  };
}

function renderCompiledComponent(component, props) {
  const root = document.createElement("div");
  document.body.appendChild(root);
  /* eslint-disable-next-line */
  if (global.gc) global.gc();
  if (benchmarkFlag) {
    // Run once to warm up cache
    render(createElementForTesting(component, props), root);
    render(null, root);
  }
  // Run once again to measure perf
  const start = performance.now();
  render(createElementForTesting(component, props), root);
  const time = Math.round((performance.now() - start) * 100) / 100;
  const output = root.innerHTML;
  render(null, root);
  document.body.removeChild(root);
  root.innerHTML = "";
  return {
    output: unescapeCompiledOutput(output),
    time,
  };
}

function unescapeCompiledOutput(output) {
  // Optimize this at some point
  return output
    .replace(/(\&amp;amp;|\&amp;)/g, "&")
    .replace(/\&lt;/g, "<")
    .replace(/\&gt;/g, ">");
}

function renderOriginalComponentToString(component, props) {
  /* eslint-disable-next-line */
  if (global.gc) global.gc();
  if (benchmarkFlag) {
    // Run once to warm up cache
    ReactDOMServer.renderToString(createElementForTesting(component, props));
  }
  // Run once again to measure perf
  const start = performance.now();
  const output = ReactDOMServer.renderToString(createElementForTesting(component, props));
  const time = Math.round((performance.now() - start) * 100) / 100;
  return {
    output,
    time,
  };
}

function renderCompiledComponentToString(component, props) {
  /* eslint-disable-next-line */
  if (global.gc) global.gc();
  if (benchmarkFlag) {
    // Run once to warm up cache
    renderToString(createElementForTesting(component, props));
  }
  // Run once again to measure perf
  const start = performance.now();
  const output = renderToString(createElementForTesting(component, props));
  const time = Math.round((performance.now() - start) * 100) / 100;
  return {
    output,
    time,
  };
}

async function evaluatePropsFromSourceComments(source) {
  if (source.includes("// props:")) {
    const propsSource = source.match(/\/\/ props\:.*\n/);
    if (propsSource[0] !== undefined) {
      /* eslint-disable-next-line */
      return eval(`(${propsSource[0].replace("// props:", "")})`);
    }
  } else if (source.includes("// props_from_file:")) {
    const propsSource = source.match(/\/\/ props_from_file\:.*\n/);
    if (propsSource[0] !== undefined) {
      const filename = propsSource[0].replace("// props_from_file:", "").trim();
      const propsJson = await readFileAsync(filename, "utf8");
      return JSON.parse(propsJson);
    }
  }
  return {};
}

async function temporarilyWiteSourceToDisk(source) {
  const inputFile = tmp.fileSync();
  const tempPath = inputFile.name;
  await writeFileAsync(tempPath, source, "utf8");
  return tempPath;
}

function getBytes(string) {
  /* eslint-disable-next-line */
  return Buffer.byteLength(string, "utf8");
}

async function minifyTestSource(src, compilation_level) {
  const transformedSrc = `(function(){\n${transformSource(src)}\n})();`;
  const tempFilePath = await temporarilyWiteSourceToDisk(transformedSrc);
  const minifiedSrc = await new Promise((resolve, reject) => {
    const closureCompiler = new ClosureCompiler({
      js: tempFilePath,
      compilation_level,
      language_in: "ECMASCRIPT6_STRICT",
      language_out: "ECMASCRIPT6_STRICT",
      warning_level: "QUIET",
      env: "CUSTOM",
      externs: "./scripts/test-externs.js",
      apply_input_source_maps: false,
      use_types_for_optimization: false,
      process_common_js_modules: false,
      rewrite_polyfills: false,
    });

    closureCompiler.run((exitCode, stdOut, stdErr) => {
      if (!stdErr) {
        resolve(stdOut);
      } else {
        reject(new Error(stdErr));
      }
    });
  });
  return { output: minifiedSrc, size: getBytes(minifiedSrc) };
}

function assertNode(a, b) {
  if (a.type === b.type) {
    if (a.type === "document") {
      if (a.children.length !== b.children.length) {
        debugger;
        return false;
      }
      for (let i = 0; i < a.children.length; i++) {
        const assertion = assertNode(a.children[i], b.children[i]);
        if (!assertion) {
          return false;
        }
      }
    } else if (a.type === "tag") {
      if (a.attr !== null) {
        if (b.attr !== null) {
          for (let key in a.attr) {
            if (a.attr[key] !== b.attr[key]) {
              debugger;
              return false;
            }
          }
          for (let key in b.attr) {
            if (a.attr[key] !== b.attr[key]) {
              debugger;
              return false;
            }
          }
        } else {
          return false;
        }
      } else if (b.attr !== null) {
        debugger;
        return false;
      }
      if (a.children.length !== b.children.length) {
        debugger;
        return false;
      }
      for (let i = 0; i < a.children.length; i++) {
        const assertion = assertNode(a.children[i], b.children[i]);
        if (!assertion) {
          return false;
        }
      }
    } else if (a.type === "text") {
      if (a.data !== b.data) {
        debugger;
        return false;
      }
    } else if (a.type === "comment") {
      if (a.data !== b.data) {
        debugger;
        return false;
      }
    }
    return true;
  }
  return false;
}

function assertDOMStructureEquals(a, b) {
  const aNode = parse(a);
  const bNode = parse(b);

  return assertNode(aNode, bNode);
}

async function runTest(file, originalSource, compiledSource, minifySources) {
  const props = await evaluatePropsFromSourceComments(originalSource);
  let originalComponent;
  let compiledComponent;
  let originalSize;
  let compiledSize;

  if (minifySources) {
    const { output: minifiedOriginalSource, size: _originalSize } = await minifyTestSource(originalSource, "SIMPLE");
    originalSize = _originalSize;
    const useSimpleMode = originalSource.includes("// gcc_SIMPLE");
    const { output: minifiedCompiledSource, size: _compiledSize } = await minifyTestSource(
      compiledSource,
      useSimpleMode ? "SIMPLE" : "ADVANCED",
    );
    compiledSize = _compiledSize;
    originalComponent = executeSource(minifiedOriginalSource, false);
    compiledComponent = executeSource(minifiedCompiledSource, false);
  } else {
    originalComponent = executeSource(originalSource, true);
    compiledComponent = executeSource(compiledSource, true);
  }
  let originalComponentOutput, originalComponentTime, compiledComponentOutput, compiledComponentTime;

  if (mode === "ssr") {
    ({ output: originalComponentOutput, time: originalComponentTime } = renderOriginalComponentToString(
      originalComponent,
      props,
    ));
    ({ output: compiledComponentOutput, time: compiledComponentTime } = renderCompiledComponentToString(
      compiledComponent,
      props,
    ));
  } else if (mode === "dom") {
    ({ output: originalComponentOutput, time: originalComponentTime } = renderOriginalComponent(
      originalComponent,
      props,
    ));
    ({ output: compiledComponentOutput, time: compiledComponentTime } = renderCompiledComponent(
      compiledComponent,
      props,
    ));
  }

  if (!assertDOMStructureEquals(originalComponentOutput, compiledComponentOutput)) {
    console.error(
      ` ${chalk.red(
        "✖",
      )}  ${file}\n\nReceived:\n\n${compiledComponentOutput}\n\nExpected:\n\n${originalComponentOutput}\n\nComponent Template:\n\n${JSON.stringify(
        compiledComponent,
      )}`,
    );
    process.exit(1);
  }

  const codeSizeDifference = Math.round((compiledSize / originalSize) * 100);
  const codeSizeDifferenceStr =
    compiledSize <= originalSize
      ? chalk.green(`${100 - codeSizeDifference}% less code`)
      : chalk.red(`${codeSizeDifference - 100}% more code`);
  const codeSizeMetrics = minifySources
    ? chalk.gray(`${compiledSize + " bytes"} vs ${originalSize + " bytes"}  ${codeSizeDifferenceStr}`)
    : "";

  if (benchmarkFlag) {
    if (originalComponentTime === 0) {
      compiledComponentTime = 0.004;
    }
    if (compiledComponentTime === 0) {
      compiledComponentTime = 0.004;
    }
    const timeDifferenceAbsolute =
      compiledComponentTime <= originalComponentTime
        ? originalComponentTime - compiledComponentTime
        : compiledComponentTime - originalComponentTime;
    let timeDifference =
      compiledComponentTime < originalComponentTime
        ? Math.round((originalComponentTime / compiledComponentTime) * 10) / 10
        : Math.round((compiledComponentTime / originalComponentTime) * 10) / 10;
    const timeDifferenceStr =
      timeDifferenceAbsolute < 1
        ? ""
        : compiledComponentTime <= originalComponentTime
        ? chalk.green(`${timeDifference}x faster`)
        : chalk.red(`${timeDifference}x slower`);

    const performanceMetrics = chalk.gray(
      `${compiledComponentTime + "ms"} vs ${originalComponentTime + "ms"}  ${timeDifferenceStr}`,
    );
    console.log(` ${chalk.green("✔")}  ${chalk.bold.white(file)}   ${performanceMetrics}  ${codeSizeMetrics}`);
  } else if (minifySources) {
    console.log(` ${chalk.green("✔")}  ${chalk.bold.white(file)}   ${codeSizeMetrics}`);
  } else {
    console.log(` ${chalk.green("✔")}  ${chalk.bold.white(file)}`);
  }
}

function compileSource(file, source) {
  try {
    return parseAndCompileSource(source);
  } catch (e) {
    console.error(` ${chalk.red("✖")}  ${file}\n\nCompiler Error:\n\n${e.stack}`);

    process.exit(1);
  }
}

function stripOutCompileFlag(source) {
  return source.replace("Component.compileRootComponent = true;", "");
}

async function minifyTestModules(files, minifiedOutputFile, compilation_level) {
  const minifiedSrc = await new Promise((resolve, reject) => {
    const closureCompiler = new ClosureCompiler({
      js: files,
      compilation_level,
      language_in: "ECMASCRIPT6_STRICT",
      language_out: "ECMASCRIPT6_STRICT",
      warning_level: "QUIET",
      env: "CUSTOM",
      externs: "./scripts/test-externs.js",
      apply_input_source_maps: false,
      use_types_for_optimization: false,
      process_common_js_modules: false,
      rewrite_polyfills: false,
    });

    closureCompiler.run((exitCode, stdOut, stdErr) => {
      if (!stdErr) {
        resolve(stdOut);
      } else {
        reject(new Error(stdErr));
      }
    });
  });
  return { output: minifiedSrc, size: getBytes(minifiedSrc) };
}

function getTestModulesFromDirectory(directory) {
  const modules = glob.sync(`${directory}/**/*.js`);
  const originalModuleFiles = [];
  const compiledModuleFiles = [];

  for (let module of modules) {
    if (module.endsWith(".compiled.js")) {
      compiledModuleFiles.push(path.resolve(module));
    } else {
      originalModuleFiles.push(path.resolve(module));
    }
  }
  return {
    compiledModuleFiles,
    originalModuleFiles,
  };
}

async function runModuleTest(indexModulePath, minifyModules) {
  loadBabelRegister();
  const indexModuleSource = await readFileAsync(indexModulePath, "utf8");
  const moduleDirectory = path.dirname(indexModulePath);
  const moduleTestPaths = moduleDirectory.split(path.sep);
  const moduleTestName = moduleTestPaths[moduleTestPaths.length - 1];

  if (indexModuleSource.includes("// skip")) {
    console.log(chalk.gray(`Skipped ${chalk.white.bold(moduleTestName)}`));
    return;
  }
  const props = await evaluatePropsFromSourceComments(indexModuleSource);
  try {
    compileEntryModuleFileToDirectory(indexModulePath, { silent: true });
  } catch (e) {
    console.error(` ${chalk.red("✖")}  ${moduleTestName}\n\nCompiler Error:\n\n${e.stack}`);
    process.exit(1);
  }
  const originalComponent = require(path.resolve(indexModulePath));
  const compiledComponent = require(path.resolve(indexModulePath.replace(".js", ".compiled.js")));

  // For now we don't support benchmarking module tests. Benchmarking the original
  // tests will be hindered by babel register's overhead. We also don't support minifying
  // just yet, support is pending.
  getTestModulesFromDirectory; // TODO
  minifyTestModules; // TODO

  const { output: originalComponentOutput } = renderOriginalComponentToString(originalComponent, props);
  const { output: compiledComponentOutput } = renderCompiledComponentToString(compiledComponent, props);

  if (originalComponentOutput !== compiledComponentOutput) {
    console.error(
      ` ${chalk.red(
        "✖",
      )}  ${moduleTestName}\n\nReceived:\n\n${compiledComponentOutput}\n\nExpected:\n\n${originalComponentOutput}\n\nComponent Template:\n\n${JSON.stringify(
        compiledComponent,
      )}`,
    );
    process.exit(1);
  }
  console.log(` ${chalk.green("✔")}  ${chalk.bold.white(moduleTestName)}`);
}

console.log(chalk.gray(`\nRunning ${mode} tests:\n`));

let tests = glob.sync("tests/**/*.js", { ignore: "tests/modules/**/*.js" });
tests = [...tests, ...glob.sync("tests/modules/**/index.js")];
if (benchmarkFlag && filterTests === null) {
  filterTests = "benchmark";
}
if (filterTests !== null) {
  tests = tests.filter(file => file.includes(filterTests));
}

async function processFiles() {
  for (let test of tests) {
    const isModuleTest = test.includes("/modules/");
    if (isModuleTest) {
      await runModuleTest(test, sizeFlag);
    } else {
      const source = await readFileAsync(test, "utf8");
      if (source.includes("// skip")) {
        console.log(chalk.gray(`Skipped ${chalk.white.bold(test)}`));
        continue;
      }
      const compiledSource = compileSource(test, source);
      try {
        await runTest(test, stripOutCompileFlag(source), compiledSource, sizeFlag);
      } catch (error) {
        console.error(error.stack);
        process.exit(1);
      }
    }
  }

  console.log(chalk.gray(`\nCompleted all ${chalk.white(tests.length)} tests.\n`));
}

processFiles();
