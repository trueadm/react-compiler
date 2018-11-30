process.env.NODE_ENV = "production";

const glob = require("glob");
const { promisify } = require("util");
const fs = require("fs");
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const babel = require("@babel/core");
const ReactDOMServer = require("react-dom/server");
const { performance } = require("perf_hooks");
const chalk = require("chalk");
const { createElementForTesting, renderToString } = require("./compiler-runtime/renderToString");
const tmp = require("tmp");
const ClosureCompiler = require("google-closure-compiler").compiler;
const argv = require("minimist")(process.argv.slice(2));
const { compileEntryModuleFileToDirectory, parseAndCompileSource } = require("../lib/compiler");
const path = require("path");

const sizeFlag = argv.size || false;
const benchmarkFlag = argv.benchmark || false;
const filterTests = Array.isArray(argv._) && argv._.length > 0 ? argv._[0] : null;

function transformSource(source) {
  source = source.replace(
    /import {\W.*} from "react-compiler-runtime";/g,
    `const { "createReactNode": createReactNode, "createTemplateNode": createTemplateNode } = require("react-compiler-runtime");`,
  );
  return babel.transform(source, {
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
    cache: false,
    configFile: false,
    presets: ["@babel/preset-flow"],
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
  try {
    /* eslint-disable-next-line */
    fn(require, module, exports);
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

function renderOriginalComponentToString(component, props) {
  /* eslint-disable-next-line */
  if (global.gc) global.gc();
  if (benchmarkFlag) {
    // Run 5 times to warm up cache
    for (let i = 0; i < 5; i++) {
      ReactDOMServer.renderToString(createElementForTesting(component, props));
    }
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
    // Run 5 times to warm up cache
    for (let i = 0; i < 5; i++) {
      renderToString(createElementForTesting(component, props));
    }
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

  let { output: originalComponentOutput, time: originalComponentTime } = renderOriginalComponentToString(
    originalComponent,
    props,
  );
  let { output: compiledComponentOutput, time: compiledComponentTime } = renderCompiledComponentToString(
    compiledComponent,
    props,
  );

  if (originalComponentOutput !== compiledComponentOutput) {
    console.error(
      ` ${chalk.red(
        "✖",
      )}  ${file}\n\nReceived:\n\n${compiledComponentOutput}\n\nExpected:\n\n${originalComponentOutput}\n\nComponent Opcodes:\n\n${JSON.stringify(
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
    let timeDifference =
      compiledComponentTime < originalComponentTime
        ? Math.round((originalComponentTime / compiledComponentTime) * 10) / 10
        : Math.round((compiledComponentTime / originalComponentTime) * 10) / 10;
    const timeDifferenceStr =
      compiledComponentTime <= originalComponentTime
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
      )}  ${moduleTestName}\n\nReceived:\n\n${compiledComponentOutput}\n\nExpected:\n\n${originalComponentOutput}\n\nComponent Opcodes:\n\n${JSON.stringify(
        compiledComponent,
      )}`,
    );
    process.exit(1);
  }
  console.log(` ${chalk.green("✔")}  ${chalk.bold.white(moduleTestName)}`);
}

console.log(chalk.gray("\nRunning tests:\n"));

let tests = glob.sync("tests/**/*.js", { ignore: "tests/modules/**/*.js" });
tests = [...tests, ...glob.sync("tests/modules/**/index.js")];
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
