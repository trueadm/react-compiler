import fs from "fs";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import { createOpcodesForReactFunctionComponent } from "./react/functions";
import { removePath } from "./utils";
import { makeClosureCompilerAdvancedFriendly } from "./transforms";
import { validateFunctionComponentUsesDestructuredProps, validateReactElementsHaveAllBeenCompiled } from "./validation";
import { basename, dirname, join } from "path";
import { applyDeadCodeElimination } from "./deadcode";
import { resolveModuleBindingReference } from "./references";
import invariant from "./invariant";
import chalk from "chalk";
import * as t from "@babel/types";

const babelParserPlugins = ["jsx", "flow", "objectRestSpread"];

function parseSourceToAst(source) {
  try {
    return parse(source, { sourceType: "module", startLine: 1, plugins: babelParserPlugins });
  } catch (err) {
    console.error(err.stack);
    process.exit(1);
  }
}

function applyFbtTransforms(ast) {
  // TODO
}

function checkIfIdHasFlag(id, path, compilerContext, moduleFilePath) {
  // Check if the function has the ".compile = true" flag
  if (t.isIdentifier(id)) {
    const binding = path.scope.getBinding(id.name);
    let hasCompileFlag = false;

    if (binding === undefined) {
      return;
    }
    for (let referencePath of binding.referencePaths) {
      let parentPath = referencePath.parentPath;
      let parentNode = parentPath.node;
      if (
        t.isMemberExpression(parentNode) &&
        t.isIdentifier(parentNode.object) &&
        parentNode.object.name === id.name &&
        t.isIdentifier(parentNode.property) &&
        parentNode.property.name === "compileRootComponent"
      ) {
        parentPath = parentPath.parentPath;
        parentNode = parentPath.node;

        if (
          t.isAssignmentExpression(parentNode) &&
          t.isBooleanLiteral(parentNode.right) &&
          parentNode.right.value === true
        ) {
          removePath(parentPath);
          hasCompileFlag = true;
          break;
        }
      }
    }

    if (hasCompileFlag) {
      validateFunctionComponentUsesDestructuredProps(path);
      const moduleState = compilerContext.modules.get(moduleFilePath).state;
      moduleState.needsCompiling();
      createOpcodesForReactFunctionComponent(path, moduleState);
      makeClosureCompilerAdvancedFriendly(path);
    }
  }
}

function applyReactVmOpcodes(moduleFilePath, ast, compilerContext) {
  traverse(ast, {
    FunctionExpression(path) {
      const parentPath = path.parentPath;

      if (t.isVariableDeclarator(parentPath.node)) {
        const id = parentPath.node.id;
        checkIfIdHasFlag(id, path, compilerContext, moduleFilePath);
      }
    },
    FunctionDeclaration(path) {
      const node = path.node;
      const id = node.id;

      checkIfIdHasFlag(id, path, compilerContext, moduleFilePath);
    },
  });
}

function createModuleState(moduleFilePath, compilerContext) {
  return {
    applyPostTransform: compilerContext.applyPostTransform,
    applyDeadCodeElimination: compilerContext.applyDeadCodeElimination,
    computeFunctionCache: new Map(),
    compiledComponentCache: new Map(),
    componentPath: null,
    counters: {
      hoistedOpcodes: 0,
      runtimeCachedValues: 0,
    },
    currentModulePath: moduleFilePath,
    externalBindings: new Map(),
    externalPathRefs: new Map(),
    helpers: new Set(),
    isRootComponent: true,
    needsCompiling() {
      compilerContext.modules.get(moduleFilePath).needsCompiling = true;
    },
    propTemplateOpcodeCache: new Map(),
    resolveModuleBindingSync: compilerContext.resolveModuleBindingSync,
    runtimeCachedValues: null,
    runtimeConditionals: null,
    runtimeValues: null,
  };
}

function parseSourceFile(moduleFilePath, compilerContext) {
  const modules = compilerContext.modules;
  if (!modules.has(moduleFilePath)) {
    const moduleSource = fs.readFileSync(moduleFilePath, "utf8");
    const ast = parseSourceToAst(moduleSource);
    applyFbtTransforms(ast);
    const moduleState = createModuleState(moduleFilePath, compilerContext);
    compilerContext.modules.set(moduleFilePath, {
      needsCompiling: false,
      state: moduleState,
      ast,
    });
    return ast;
  }
  return modules.get(moduleFilePath).ast;
}

function compileEntryModuleFile(moduleFilePath, compilerContext) {
  const ast = parseSourceFile(moduleFilePath, compilerContext);
  applyReactVmOpcodes(moduleFilePath, ast, compilerContext);
  return generate(ast).code;
}

function resolveModulePath(moduleString, currentModulePath) {
  const currentDirectory = dirname(currentModulePath);
  let possiblePath;
  if (moduleString.startsWith("./")) {
    const moduleName = basename(moduleString.slice(2), ".js");
    possiblePath = `${currentDirectory}/${moduleName}.js`;
    if (fs.existsSync(possiblePath)) {
      return possiblePath;
    }
  } else if (moduleString.startsWith("../")) {
    invariant(false, "TODO");
  } else {
    invariant(false, "TODO");
  }
  return null;
}

function createCompilerContext() {
  const compilerContext = {
    applyPostTransform(func) {
      compilerContext.postTransformFuncs.push(func);
    },
    modules: new Map(),
    postTransformFuncs: [],
    resolveModuleBindingSync(moduleString, currentModulePath, binding) {
      const moduleFilePath = resolveModulePath(moduleString, currentModulePath);
      const ast = parseSourceFile(moduleFilePath, compilerContext);
      const moduleState = compilerContext.modules.get(moduleFilePath).state;
      return resolveModuleBindingReference(ast, binding, moduleState);
    },
  };
  return compilerContext;
}

export function compileEntryModuleFileToDirectory(entryModulePath, options) {
  if (!options.silent) {
    console.log(`\nCompiling entry module ${chalk.green(entryModulePath)}\n`);
  }
  const compilerContext = createCompilerContext();
  compileEntryModuleFile(entryModulePath, compilerContext);
  applyDeadCodeEliminationToModules(compilerContext);
  applyPostTransforms(compilerContext);
  writeCompiledModulesToDisk(compilerContext, options);
  validateReactElementsHaveBeenRemoved(compilerContext);
  if (!options.silent) {
    console.log(`\nCompilation complete.\n`);
  }
}

function applyPostTransforms(compilerContext) {
  for (let postTransformFunc of compilerContext.postTransformFuncs) {
    postTransformFunc();
  }
}

function addModuleHelpers(ast, moduleState) {
  const helpers = moduleState.helpers;

  if (helpers.has("createReactNode") && helpers.has("createTemplateNode")) {
    ast.program.body.unshift(
      t.importDeclaration(
        [
          t.importSpecifier(t.identifier("createReactNode"), t.identifier("createReactNode")),
          t.importSpecifier(t.identifier("createTemplateNode"), t.identifier("createTemplateNode")),
        ],
        t.stringLiteral("react-compiler-runtime"),
      ),
    );
  } else if (helpers.has("createReactNode")) {
    ast.program.body.unshift(
      t.importDeclaration(
        [t.importSpecifier(t.identifier("createReactNode"), t.identifier("createReactNode"))],
        t.stringLiteral("react-compiler-runtime"),
      ),
    );
  } else if (helpers.has("createTemplateNode")) {
    ast.program.body.unshift(
      t.importDeclaration(
        [t.importSpecifier(t.identifier("createTemplateNode"), t.identifier("createTemplateNode"))],
        t.stringLiteral("react-compiler-runtime"),
      ),
    );
  }
}

function applyDeadCodeEliminationToModules(compilerContext) {
  for (let [, { ast, state }] of compilerContext.modules) {
    applyDeadCodeElimination(ast, state);
  }
}

function validateReactElementsHaveBeenRemoved(compilerContext) {
  for (let [, { ast, state }] of compilerContext.modules) {
    validateReactElementsHaveAllBeenCompiled(ast, state);
  }
}

function writeCompiledModulesToDisk(compilerContext, options) {
  for (let [moduleFilePath, { ast, needsCompiling, state }] of compilerContext.modules) {
    if (needsCompiling) {
      addModuleHelpers(ast, state);
      const outputFilePath = join(dirname(moduleFilePath), `${basename(moduleFilePath, ".js")}.compiled.js`);
      if (!options.silent) {
        console.log(
          chalk.gray(`Successfully compiled ${chalk.white(moduleFilePath)} to ${chalk.white(outputFilePath)}`),
        );
      }
      const compiledSource = generate(ast).code;
      fs.writeFileSync(outputFilePath, compiledSource, "utf8");
    }
  }
}

export function parseAndCompileSource(source) {
  const moduleFilePath = "[source]";
  const compilerContext = createCompilerContext();
  const ast = parseSourceToAst(source);
  const moduleState = createModuleState(moduleFilePath, compilerContext);
  compilerContext.modules.set(moduleFilePath, {
    needsCompiling: false,
    state: moduleState,
    ast,
  });
  applyFbtTransforms(ast);
  applyReactVmOpcodes(moduleFilePath, ast, compilerContext);
  applyDeadCodeEliminationToModules(compilerContext);
  applyPostTransforms(compilerContext);
  addModuleHelpers(ast, moduleState);
  validateReactElementsHaveBeenRemoved(compilerContext);
  return generate(ast).code;
}
