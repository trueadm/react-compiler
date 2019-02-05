import { pushOpcode, pushOpcodeValue } from "../opcodes";
import { assertType, getTypeAnnotationForExpression } from "../annotations";
import {
  getBindingPathRef,
  getReferenceFromExpression,
  isDestructuredRef,
  isIdentifierReferenceConstant,
} from "../references";
import {
  emptyObject,
  getAllPathsFromMutatedBinding,
  getCachedRuntimeValue,
  getCodeLocation,
  getComponentName,
  getRuntimeValueHash,
  getRuntimeValueIndexForPropsArray,
  getRuntimeValueIndex,
  handleWhiteSpace,
  isArrayMapConstructorTemplate,
  isCommonJsLikeRequireCall,
  isConditionalComponentType,
  isHostComponentType,
  isNodeWithinReactElementTemplate,
  isObjectAssignCall,
  isPrimitive,
  isReactCreateElement,
  isReactFragment,
  joinPathConditions,
  markNodeAsDCE,
  markNodeAsUsed,
  moveOutCallExpressionFromTemplate,
  moveOutFunctionFromTemplate,
  pathContainsReactElement,
  updateCommonJSLikeRequireCallPathToCompiledPath,
  updateImportSyntaxPathToCompiledPath,
  isFbCxCall,
} from "../utils";
import {
  getContextObjectRuntimeValueIndex,
  isReferenceReactContextConsumer,
  isReferenceReactContextProvider,
} from "./context";
import { createOpcodesForReactContextConsumer } from "./context";
import { compileMutatedBinding, compileNode } from "../nodes";
import { hyphenateStyleName } from "./style";
import { compileReactFunctionComponent } from "./components";
import { compileReactComputeFunction } from "./functions";
import { getPropInformation, isUnitlessNumber } from "./prop-information";
import { validateArgumentsDoNotContainTemplateNodes, validateParamsDoNotConflictOuterScope } from "../validation";
import invariant from "../invariant";
import * as t from "@babel/types";
import { compileCxMockCall } from "../mocks/cx";
import {
  ConditionalTemplateNode,
  DynamicTextArrayTemplateNode,
  DynamicTextTemplateNode,
  DynamicValueTemplateNode,
  FragmentTemplateNode,
  HostComponentTemplateNode,
  LogicalTemplateNode,
  ReferenceComponentTemplateNode,
  ReferenceVNode,
  StaticTextTemplateNode,
  StaticValueTemplateNode,
  TemplateFunctionCallTemplateNode,
  VNodeCollectionTemplateNode,
} from "../templates";

const emptyPlaceholderNode = t.nullLiteral();
const voidElements = new Set([
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

function compileArrayMapTemplate(childPath, state, componentPath) {
  const args = childPath.get("arguments");
  const calleePath = childPath.get("callee");

  if (!t.isMemberExpression(calleePath.node)) {
    invariant(false, "TODO");
  }
  const mapFunctionPath = getReferenceFromExpression(args[0], state);
  // Compiles the array map function to return vNodes
  const { templateNode } = compileReactComputeFunction(mapFunctionPath, state, false, null, true);
  const vNodeCollectionValueIndex = getRuntimeValueIndex(childPath.node, state);
  return new VNodeCollectionTemplateNode(vNodeCollectionValueIndex, templateNode);
}

function compileHostComponentPropValue(templateNode, tagName, valuePath, propNameStr, state, componentPath) {
  markNodeAsDCE(valuePath.node);
  const valueRefPath = getReferenceFromExpression(valuePath, state);
  const typeAnnotation = getTypeAnnotationForExpression(valueRefPath, state);

  if (propNameStr === "style") {
    if (t.isObjectExpression(valueRefPath.node)) {
      compileHostComponentStylesObject(templateNode, valuePath, valueRefPath, state, componentPath);
    } else if (t.isIdentifier(valueRefPath.node)) {
      if (t.isObjectTypeAnnotation(typeAnnotation)) {
        compileHostComponentStylesIdentifier(
          templateNode,
          typeAnnotation,
          valuePath,
          valueRefPath,
          state,
          componentPath,
        );
      }
    }
    return;
  } else if (propNameStr === "ref") {
    // TODO
    return;
  } else if (propNameStr === "key") {
    const keyASTNode = valueRefPath.node;
    markNodeAsUsed(keyASTNode);
    templateNode.keyASTNode = keyASTNode;
    return;
  }
  const runtimeValueHash = getRuntimeValueHash(state);
  let propTemplateNode;

  if (isFbCxCall(valuePath, state)) {
    propTemplateNode = compileCxMockCall(valueRefPath, state);
  } else {
    propTemplateNode = compileNode(valuePath, valueRefPath, state, componentPath, false);
  }
  let isPartialTemplate = false;
  // If there are no opcodes then early continue.
  if (t.isCallExpression(valueRefPath.node) && propTemplateNode instanceof TemplateFunctionCallTemplateNode) {
    isPartialTemplate = true;
  }
  const [propName, propInformation] = getPropInformation(propNameStr, isPartialTemplate);

  // Static vs dynamic
  if (!isPartialTemplate && runtimeValueHash === getRuntimeValueHash(state)) {
    if (propNameStr === "value" && tagName === "textarea") {
      templateNode.children.push(propTemplateNode);
      return;
    }
    if (propTemplateNode instanceof StaticTextTemplateNode) {
      templateNode.staticProps.push([propName, propInformation, propTemplateNode.text]);
    } else if (propTemplateNode instanceof StaticValueTemplateNode) {
      if (propTemplateNode.value !== undefined && propTemplateNode.value !== null) {
        templateNode.staticProps.push([propName, propInformation, propTemplateNode.value]);
      }
    } else {
      debugger;
      invariant(false, "TODO");
    }
  } else {
    if (propNameStr === "value" && tagName === "textarea") {
      templateNode.children.push(propTemplateNode);
      return;
    }
    if (propTemplateNode instanceof DynamicTextTemplateNode || propTemplateNode instanceof DynamicValueTemplateNode) {
      templateNode.dynamicProps.push([propName, propInformation, propTemplateNode.valueIndex]);
    } else {
      invariant(false, "TODO");
    }
  }
}

function compileHostComponentChildren(templateNode, childPath, state, componentPath) {
  markNodeAsDCE(childPath.node);
  let refChildPath = getReferenceFromExpression(childPath, state);

  if (isDestructuredRef(refChildPath)) {
    refChildPath = refChildPath.property;
  }
  const typeAnnotation = getTypeAnnotationForExpression(refChildPath, state);
  const childNode = refChildPath.node;

  if (
    t.isIdentifier(childNode) &&
    !isIdentifierReferenceConstant(refChildPath, state) &&
    assertType(childPath, typeAnnotation, true, state, "REACT_NODE")
  ) {
    const childTemplateNode = compileMutatedBinding(refChildPath, state, componentPath, false);
    if (childTemplateNode !== null) {
      templateNode.children.push(childTemplateNode);
      return;
    }
  }

  if (isArrayMapConstructorTemplate(refChildPath, state)) {
    const childArrayCollection = compileArrayMapTemplate(refChildPath, state, componentPath);
    templateNode.children.push(childArrayCollection);
    return;
  }

  if (t.isArrayExpression(childNode)) {
    markNodeAsDCE(childNode);
    const elementsPath = refChildPath.get("elements");
    if (elementsPath.length > 0) {
      if (elementsPath.length === 0) {
        compileHostComponentChildren(templateNode, elementsPath[0], state, componentPath);
      } else {
        for (let elementPath of elementsPath) {
          compileHostComponentChildren(
            templateNode,
            getReferenceFromExpression(elementPath, state),
            state,
            componentPath,
          );
        }
      }
    }
    return;
  }

  const childTemplateNode = compileNode(childPath, refChildPath, state, componentPath, false);

  // If there are no opcodes then early return.
  if (childTemplateNode === null) {
    return;
  }
  if (childTemplateNode instanceof StaticValueTemplateNode) {
    const value = childTemplateNode.value;

    if (typeof value === "string" || typeof value === "number") {
      templateNode.children.push(new StaticTextTemplateNode(value + ""));
    }
    return;
  }
  if (
    childTemplateNode instanceof HostComponentTemplateNode ||
    childTemplateNode instanceof StaticTextTemplateNode ||
    childTemplateNode instanceof DynamicTextTemplateNode ||
    childTemplateNode instanceof TemplateFunctionCallTemplateNode ||
    childTemplateNode instanceof ReferenceVNode ||
    childTemplateNode instanceof ReferenceComponentTemplateNode ||
    childTemplateNode instanceof ConditionalTemplateNode ||
    childTemplateNode instanceof LogicalTemplateNode
  ) {
    templateNode.children.push(childTemplateNode);
    return;
  }
  // Empty children
  if (assertType(childPath, typeAnnotation, false, state, "NULL", "VOID", "BOOLEAN")) {
    // TODO remove runtime values to optimize size?
    return;
  }
  if (t.isArrowFunctionExpression(childNode) || t.isFunctionExpression(childNode)) {
    pushOpcode(opcodes, "ELEMENT_DYNAMIC_FUNCTION_CHILD", childOpcodes);
    const reconcilerValueIndexForHostNode = state.reconciler.valueIndex++;
    pushOpcodeValue(opcodes, reconcilerValueIndexForHostNode, "HOST_NODE_VALUE_POINTER_INDEX");
    return;
  }
  // React templates from incoming props
  if (assertType(childPath, typeAnnotation, true, state, "REACT_NODE")) {
    if (state.isRootComponent) {
      throw new Error(
        `The compiler found a React element node type in the root component but was unable to statically find JSX template at ${getCodeLocation(
          childNode,
        )}`,
      );
    }
    const reactNodeValueIndex = getRuntimeValueIndex(refChildPath.node, state);
    templateNode.children.push(new ReferenceVNode(reactNodeValueIndex));
    return;
  }
  if (childTemplateNode instanceof DynamicValueTemplateNode) {
    // Non-array
    if (assertType(childPath, typeAnnotation, false, state, "NULL", "NUMBER", "STRING", "VOID", "BOOLEAN")) {
      templateNode.children.push(new DynamicTextTemplateNode(childTemplateNode.valueIndex));
      return;
    }
    // Array
    if (assertType(childPath, typeAnnotation, false, state, "ARRAY", "NULL", "NUMBER", "STRING", "VOID", "BOOLEAN")) {
      templateNode.children.push(new DynamicTextArrayTemplateNode(childTemplateNode.valueIndex));
      return;
    }
  }
}

export function compileJSXFragment(childrenPath, attributesPath, state, componentPath, isRoot) {
  let keyASTNode = t.nullLiteral();
  if (attributesPath.length > 0) {
    const propsMap = getPropsMapFromJSXElementAttributes(attributesPath, state);
    if (propsMap.has("key")) {
      keyASTNode = propsMap.get("key").get("expression").node;
    }
  }
  return compileReactFragment(childrenPath, keyASTNode, state, componentPath, isRoot);
}

function compiledReactCreateElementFragment(args, state, componentPath, isRoot) {
  let children = null;
  let attributes = null;
  let keyASTNode = t.nullLiteral();

  markNodeAsDCE(args[0].node);
  if (args.length > 1) {
    attributes = args[1];
  }
  if (args.length > 2) {
    children = args.slice(2);
  }
  if (t.isObjectExpression(attributes)) {
    const propsMap = getPropsMapFromObjectExpression(attributes.get("properties"));
    if (propsMap.has("key")) {
      keyASTNode = propsMap.get("key").node;
    }
  } else if (!t.isNullLiteral(attributes)) {
    invariant(false, "TODO");
  }
  return compileReactFragment(children, keyASTNode, state, componentPath, isRoot);
}

function compileReactFragment(childrenPath, keyASTNode, state, componentPath, isRoot) {
  const fragment = [];
  const filteredChildrenPath = childrenPath.filter(childPath => {
    if (t.isJSXText(childPath.node) && handleWhiteSpace(childPath.node.value) === "") {
      return false;
    }
    return true;
  });

  for (let i = 0; i < filteredChildrenPath.length; i++) {
    const child = filteredChildrenPath[i];
    const childRef = getReferenceFromExpression(child, state);
    const childTemplateNode = compileNode(child, childRef, state, componentPath, isRoot);

    if (childTemplateNode !== null) {
      if (childTemplateNode instanceof FragmentTemplateNode) {
        fragment.push(...childTemplateNode.children);
      } else {
        fragment.push(childTemplateNode);
      }
    }
  }
  return new FragmentTemplateNode(fragment, keyASTNode);
}

function compileHostComponentStylesIdentifier(
  templateNode,
  typeAnnotation,
  stylePath,
  stylePathRef,
  state,
  componentPath,
) {
  for (let typeProperty of typeAnnotation.properties) {
    if (!t.isObjectTypeProperty(typeProperty)) {
      invariant(false, "TODO");
    }
    const key = typeProperty.key;
    let styleName;

    if (t.isIdentifier(key)) {
      styleName = key.name;
    } else {
      invariant(false, "TODO");
    }
    const hyphenatedStyleName = hyphenateStyleName(styleName);
    const runtimeValuePointer = getRuntimeValueIndex(t.memberExpression(stylePathRef.node, key), state);
    templateNode.dynamicStyles.push([hyphenatedStyleName, runtimeValuePointer]);
  }
}

function compileHostComponentStylesObject(templateNode, stylePath, stylePathRef, state, componentPath) {
  const propertiesPath = stylePathRef.get("properties");

  for (let propertyPath of propertiesPath) {
    const node = propertyPath.node;

    if (!t.isObjectProperty(node)) {
      invariant(false, "TODO");
    }
    const key = node.key;
    let styleName;

    if (t.isIdentifier(key)) {
      styleName = key.name;
    } else if (t.isStringLiteral(key)) {
      styleName = key.value;
    } else {
      invariant(false, "TODO");
    }
    const propertyValue = propertyPath.get("value");
    const propertyValueRef = getReferenceFromExpression(propertyValue, state);
    const runtimeValueHash = getRuntimeValueHash(state);

    const styleTemplateNode = compileNode(propertyValue, propertyValueRef, state, componentPath, false);
    const hyphenatedStyleName = hyphenateStyleName(styleName);
    const isUnitless = isUnitlessNumber.has(styleName);

    // Static vs Dynamic style
    if (runtimeValueHash === getRuntimeValueHash(state)) {
      if (styleTemplateNode instanceof StaticTextTemplateNode) {
        templateNode.staticStyles.push([hyphenatedStyleName, styleTemplateNode.text]);
      } else if (styleTemplateNode instanceof StaticValueTemplateNode) {
        let value = styleTemplateNode.value;

        if (value === null || value === undefined) {
          continue;
        }
        if (typeof value === "boolean") {
          value = "";
        }
        if (typeof value === "number" && !isUnitless && value !== 0) {
          value = `${value}px`;
        }
        templateNode.staticStyles.push([hyphenatedStyleName, value]);
      } else {
        invariant(false, "TODO");
      }
    } else {
      // TODO handle unitless
      if (
        styleTemplateNode instanceof DynamicTextTemplateNode ||
        styleTemplateNode instanceof DynamicValueTemplateNode
      ) {
        templateNode.dynamicStyles.push([hyphenatedStyleName, styleTemplateNode.valueIndex]);
      } else {
        invariant(false, "TODO");
      }
    }
  }
}

function canInlineNode(path, state) {
  const pathRef = getReferenceFromExpression(path, state);

  if (isPrimitive(pathRef.node) || t.isJSXElement(pathRef.node)) {
    return true;
  } else if (t.isArrayExpression(pathRef.node)) {
    const elements = path.get("elements");

    for (let element of elements) {
      const canInlineElement = canInlineNode(element, state);

      if (!canInlineElement) {
        return false;
      }
    }
    return true;
  } else if (t.isObjectExpression(pathRef.node)) {
    const properties = path.get("properties");

    for (let property of properties) {
      if (t.isObjectProperty(property)) {
        if (property.computed) {
          const propertyKey = property.get("key");
          if (!t.isStringLiteral(propertyKey)) {
            return false;
          }
        }
        const propertyValue = property.get("value");
        const canInlineProperty = canInlineNode(propertyValue, state);

        if (!canInlineProperty) {
          return false;
        }
      } else {
        invariant(false, "TODO");
      }
    }
    return true;
  }
  return false;
}

function getTopLevelPathFromComponentPath(path) {
  let parentPath = path.parentPath;
  let lastPathKey = path.key;

  while (!t.isProgram(parentPath.node) && !t.isBlockStatement(parentPath.node)) {
    lastPathKey = parentPath.key;
    parentPath = parentPath.parentPath;
  }
  return { key: lastPathKey, path: parentPath };
}

function hoistOpcodesNode(componentPath, state, opcodesNode) {
  const hash = JSON.stringify(opcodesNode);
  const propTemplateOpcodeCache = state.propTemplateOpcodeCache;

  if (propTemplateOpcodeCache.has(hash)) {
    return propTemplateOpcodeCache.get(hash);
  }
  const identifier = t.identifier("__hoisted__opcodes__" + state.counters.hoistedOpcodes++);
  markNodeAsUsed(identifier);
  let hoistDepth = 0;
  let currentPath = componentPath;

  while (hoistDepth++ < 3) {
    let { key, path } = getTopLevelPathFromComponentPath(currentPath);
    if (t.isProgram(path.node)) {
      const body = path.node.body;
      body.splice(key, 0, t.variableDeclaration("var", [t.variableDeclarator(identifier, opcodesNode)]));
      break;
    } else {
      currentPath = path;
      if (hoistDepth > 1) {
        invariant(false, "TODO");
      }
    }
  }

  propTemplateOpcodeCache.set(hash, identifier);
  return identifier;
}

function createPropTemplateFromJSXElement(path, state, componentPath) {
  const runtimeValues = new Map();
  const childState = { ...state, ...{ runtimeValues } };
  const templateNode = compileJSXElement(path, childState, componentPath);

  state.helpers.add("createVNode");
  if (runtimeValues.size === 0) {
    return [t.callExpression(t.identifier("createVNode"), [templateNode.toAST()]), true];
  } else {
    const runtimeValuesArray = [];
    for (let [runtimeValue, { index }] of runtimeValues) {
      runtimeValuesArray[index] = runtimeValue;
    }
    return [
      t.callExpression(t.identifier("createVNode"), [templateNode.toAST(), t.arrayExpression(runtimeValuesArray)]),
      false,
    ];
  }
}

function createPropTemplateFromReactCreateElement(path, state, componentPath) {
  const runtimeValues = new Map();
  const childState = { ...state, ...{ runtimeValues } };
  const templateNode = compileReactCreateElement(path, childState, componentPath);

  state.helpers.add("createVNode");
  if (runtimeValues.size === 0) {
    return [t.callExpression(t.identifier("createVNode"), [templateNode.toAST()]), true];
  } else {
    const runtimeValuesArray = [];
    for (let [runtimeValue, { index }] of runtimeValues) {
      runtimeValuesArray[index] = runtimeValue;
    }
    return [
      t.callExpression(t.identifier("createVNode"), [templateNode.toAST(), t.arrayExpression(runtimeValuesArray)]),
      false,
    ];
  }
}

function createPropTemplateForMutatedBinding(pathRef, state, componentPath) {
  const { paths, binding } = getAllPathsFromMutatedBinding(pathRef, state);
  if (paths.length === 0) {
    return null;
  }

  let baseConditionalNode = null;
  let currentConditonalNode = null;
  for (let { pathConditions, path: conditionalPath } of paths) {
    const joinedPathConditionsNode = joinPathConditions(pathConditions, state);
    const { node } = getNodeAndInlineStatusFromValuePath(conditionalPath, state, componentPath);
    if (baseConditionalNode === null) {
      currentConditonalNode = baseConditionalNode = t.conditionalExpression(
        joinedPathConditionsNode,
        node,
        emptyPlaceholderNode,
      );
    } else {
      currentConditonalNode = currentConditonalNode.alternate = t.conditionalExpression(
        joinedPathConditionsNode,
        node,
        emptyPlaceholderNode,
      );
    }
  }
  const node = binding.path.node;
  if (t.isVariableDeclarator(node)) {
    if (node.init !== null) {
      const elsePath = binding.path.get("init");
      const { node: elseNode } = getNodeAndInlineStatusFromValuePath(elsePath, state, componentPath);
      currentConditonalNode.alternate = elseNode;
    }
  } else {
    invariant(false, "TODO");
  }
  return { node: baseConditionalNode, canInline: false };
}

function createPropTemplateForConditionalExpression(pathRef, state, componentPath) {
  const testPath = getReferenceFromExpression(pathRef.get("test"), state);
  const test = testPath.node;
  const consequentPath = pathRef.get("consequent");
  const { node: consequentNode } = getNodeAndInlineStatusFromValuePath(consequentPath, state, componentPath);
  const alternatePath = pathRef.get("alternate");
  const { node: alternateNode } = getNodeAndInlineStatusFromValuePath(alternatePath, state, componentPath);
  const conditionalNode = t.conditionalExpression(test, consequentNode, alternateNode);
  return { node: conditionalNode, canInline: false };
}

function createPropTemplateForLogicalExpression(pathRef, state, componentPath) {
  const leftPath = pathRef.get("left");
  const { node: leftNode } = getNodeAndInlineStatusFromValuePath(leftPath, state, componentPath);
  const rightPath = pathRef.get("alternate");
  const { node: rightNode } = getNodeAndInlineStatusFromValuePath(rightPath, state, componentPath);
  const conditionalNode = t.logicalExpression(leftNode, rightNode);
  return { node: conditionalNode, canInline: false };
}

function createPropTemplateForObjectExpression(pathRef, state, componentPath) {
  const propertyNodes = [];
  let canInlineElements = true;

  const propertiesPath = pathRef.get("properties");
  if (propertiesPath.length > 0) {
    for (let propertyPath of propertiesPath) {
      const propertyNode = propertyPath.node;

      if (t.isObjectProperty(propertyNode)) {
        const keyNode = propertyNode.key;
        const computed = propertyNode.computed;
        const shorthand = propertyNode.shorthand;
        const valuePath = getReferenceFromExpression(propertyPath.get("value"), state);
        const { node, canInline } = getNodeAndInlineStatusFromValuePath(valuePath, state, componentPath);
        if (!canInline) {
          canInlineElements = false;
        }
        propertyNodes.push(t.objectProperty(keyNode, node, computed, shorthand));
      } else {
        invariant(false, "TODO");
      }
    }
  }
  return { node: t.objectExpression(propertyNodes), canInline: canInlineElements };
}

function createPropTemplateForArrayExpression(pathRef, state, componentPath) {
  const childrenNodes = [];
  let canInlineElements = true;

  const elementsPath = pathRef.get("elements");
  if (elementsPath.length > 0) {
    for (let elementPath of elementsPath) {
      const { node, canInline } = getNodeAndInlineStatusFromValuePath(elementPath, state, componentPath);
      if (!canInline) {
        canInlineElements = false;
      }
      childrenNodes.push(node);
    }
  }
  return { node: t.arrayExpression(childrenNodes), canInline: canInlineElements };
}

function createPropTemplateForCallExpression(path, pathRef, state, componentPath) {
  const calleePath = getReferenceFromExpression(pathRef.get("callee"), state);
  const { isStatic, templateNode } = compileReactComputeFunction(calleePath, state, false, null, false);

  state.helpers.add("createVNode");
  if (isStatic) {
    const node = t.callExpression(t.identifier("createVNode"), [templateNode.toAST()]);
    return { node, canInline: true };
  }
  const node = t.callExpression(t.identifier("createVNode"), [templateNode.toAST(), pathRef.node]);
  return { node, canInline: true };
}

function createPropTemplateForFunctionExpression(pathRef, state, componentPath) {
  const node = pathRef.node;

  if (t.isArrowFunctionExpression(node) || t.isFunctionExpression(node)) {
    if (isNodeWithinReactElementTemplate(pathRef, state)) {
      moveOutFunctionFromTemplate(pathRef);
    }
  }
  const { isStatic, templateNode } = compileReactComputeFunction(pathRef, state, false, null, false);

  state.helpers.add("createVNode");
  if (isStatic) {
    const funcNode = t.arrowFunctionExpression(
      [],
      t.callExpression(t.identifier("createVNode"), [templateNode.toAST()]),
    );
    return { node: funcNode, canInline: true };
  } else {
    const params = pathRef.node.params;
    validateParamsDoNotConflictOuterScope(params, componentPath, pathRef, state);
    pathRef.node.params = [];
    throw new Error("LOL")
    const funcNode = t.arrowFunctionExpression(
      params,
      t.callExpression(t.identifier("createVNode"), [templateNode.toAST(), t.callExpression(pathRef.node, [])]),
    );
    return { node: funcNode, canInline: false };
  }
}

function createPropForCallExpression(path, pathRef, state, componentPath) {
  // Check if any of the nodes passed as arguments contain template nodes
  validateArgumentsDoNotContainTemplateNodes(path, pathRef, state);

  if (isNodeWithinReactElementTemplate(path, state)) {
    moveOutCallExpressionFromTemplate(path, pathRef, state);
  }

  if (assertType(path, getTypeAnnotationForExpression(pathRef, state), true, state, "REACT_NODE")) {
    return createPropTemplateForCallExpression(path, pathRef, state, componentPath);
  }
  let canInline = canInlineNode(pathRef, state);
  let node = pathRef.node;
  if (!canInline) {
    markNodeAsUsed(node);
  }
  return { node, canInline };
}

function getNodeAndInlineStatusFromValuePath(path, state, componentPath) {
  const pathRef = getReferenceFromExpression(path, state);
  const typeAnnotation = getTypeAnnotationForExpression(pathRef, state);

  if (
    t.isIdentifier(pathRef.node) &&
    !isIdentifierReferenceConstant(pathRef, state) &&
    assertType(path, typeAnnotation, true, state, "REACT_NODE")
  ) {
    const resultOrNull = createPropTemplateForMutatedBinding(pathRef, state, componentPath);
    if (resultOrNull !== null) {
      return resultOrNull;
    }
  }
  let canInline = canInlineNode(pathRef, state);
  let node = pathRef.node;

  if (t.isConditionalExpression(node) && pathContainsReactElement(pathRef, state)) {
    return createPropTemplateForConditionalExpression(pathRef, state, componentPath);
  } else if (t.isLogicalExpression(node) && pathContainsReactElement(pathRef, state)) {
    return createPropTemplateForLogicalExpression(pathRef, state, componentPath);
  } else if (t.isArrayExpression(node) && pathContainsReactElement(pathRef, state)) {
    return createPropTemplateForArrayExpression(pathRef, state, componentPath);
  } else if (t.isObjectExpression(node) && pathContainsReactElement(pathRef, state)) {
    return createPropTemplateForObjectExpression(pathRef, state, componentPath);
  } else if (t.isJSXText(node)) {
    node = t.stringLiteral(handleWhiteSpace(node.value));
  } else if (t.isJSXElement(node)) {
    [node, canInline] = createPropTemplateFromJSXElement(pathRef, state, componentPath);
  } else if (isReactCreateElement(pathRef, state)) {
    [node, canInline] = createPropTemplateFromReactCreateElement(pathRef, state, componentPath);
  } else if (t.isCallExpression(node)) {
    return createPropForCallExpression(path, pathRef, state, componentPath);
  } else if (assertType(path, typeAnnotation, true, state, "REACT_NODE")) {
    if (t.isArrowFunctionExpression(node) || t.isFunctionExpression(node) || t.isFunctionDeclaration(node)) {
      return createPropTemplateForFunctionExpression(pathRef, state, componentPath);
    }
    if (state.isRootComponent || (!t.isIdentifier(node) && !t.isMemberExpression(node))) {
      throw new Error(
        `The compiler found a React element type used as props in component <${getComponentName(
          componentPath,
        )}> but was unable to statically find JSX template at ${getCodeLocation(pathRef.node)}`,
      );
    }
  }

  if (!canInline) {
    markNodeAsUsed(node);
  }
  return { node, canInline };
}

function getPropNodeForCompositeComponent(propName, attributesPath, childrenPath, defaultProps, state, componentPath) {
  let defaultPropValue = null;
  if (defaultProps !== null) {
    const defaultPropsProperties = defaultProps.get("properties");
    for (let defaultPropsProperty of defaultPropsProperties) {
      if (t.isObjectProperty(defaultPropsProperty.node)) {
        const nameNode = defaultPropsProperty.node.key;
        let attributeName;

        if (t.isIdentifier(nameNode)) {
          attributeName = nameNode.name;
        }
        if (propName === attributeName) {
          const valuePath = defaultPropsProperty.get("value");
          defaultPropValue = getNodeAndInlineStatusFromValuePath(valuePath, state, componentPath);
          break;
        }
      } else {
        invariant(false, "TODO");
      }
    }
  }
  if (propName === "children" && childrenPath !== null) {
    const filteredChildrenPath = childrenPath.filter(childPath => {
      if (t.isJSXText(childPath.node) && handleWhiteSpace(childPath.node.value) === "") {
        return false;
      }
      return true;
    });
    if (filteredChildrenPath.length === 0) {
      return { node: t.unaryExpression("void", t.numericLiteral(0)), canInline: true };
    } else if (filteredChildrenPath.length === 1) {
      return getNodeAndInlineStatusFromValuePath(filteredChildrenPath[0], state, componentPath);
    } else {
      const childrenNodes = [];
      let canInlineChildren = true;

      for (let childPath of filteredChildrenPath) {
        const { node, canInline } = getNodeAndInlineStatusFromValuePath(childPath, state, componentPath);
        if (!canInline) {
          canInlineChildren = false;
        }
        childrenNodes.push(node);
      }
      return { node: t.arrayExpression(childrenNodes), canInline: canInlineChildren };
    }
  }
  let result = null;
  if (Array.isArray(attributesPath)) {
    for (let attributePath of attributesPath) {
      if (t.isJSXAttribute(attributePath.node)) {
        const nameNode = attributePath.node.name;
        let attributeName;

        if (t.isJSXIdentifier(nameNode)) {
          attributeName = nameNode.name;
        }
        if (propName === attributeName) {
          const valuePath = attributePath.get("value");
          markNodeAsDCE(valuePath.node);
          result = getNodeAndInlineStatusFromValuePath(valuePath, state, componentPath);
        }
      } else if (t.isJSXSpreadAttribute(attributePath.node) && t.isIdentifier(attributePath.node.argument)) {
        const argumentPath = attributePath.get("argument");
        const argumentPathRef = getReferenceFromExpression(argumentPath, state);

        if (t.isObjectExpression(argumentPathRef.node)) {
          const propertiesPath = argumentPathRef.get("properties");

          for (let propertyPath of propertiesPath) {
            if (t.isObjectProperty(propertyPath.node)) {
              const key = propertyPath.node.key;
              const valuePath = propertyPath.get("value");
              if (t.isIdentifier(key) && key.name === propName) {
                markNodeAsDCE(valuePath.node);
                result = getNodeAndInlineStatusFromValuePath(valuePath, state, componentPath);
                break;
              }
            } else {
              invariant(false, "TODO");
            }
          }
        } else {
          invariant(false, "TODO");
        }
      } else if (t.isObjectProperty(attributePath.node)) {
        const nameNode = attributePath.node.key;
        let attributeName;

        if (t.isIdentifier(nameNode)) {
          attributeName = nameNode.name;
        } else if (t.isStringLiteral(nameNode)) {
          attributeName = nameNode.value;
        }
        if (propName === attributeName) {
          const valuePath = attributePath.get("value");
          markNodeAsDCE(valuePath.node);
          result = getNodeAndInlineStatusFromValuePath(valuePath, state, componentPath);
        }
      } else {
        invariant(false, "TODO");
      }
    }
  } else if (t.isCallExpression(attributesPath)) {
    if (isObjectAssignCall(attributesPath, state)) {
      const args = attributesPath.get("arguments");

      for (let argumentPath of args) {
        const argumentPathRef = getReferenceFromExpression(argumentPath, state);

        if (t.isObjectExpression(argumentPathRef.node)) {
          const propertiesPath = argumentPathRef.get("properties");

          for (let propertyPath of propertiesPath) {
            if (t.isObjectProperty(propertyPath.node)) {
              const key = propertyPath.node.key;
              const valuePath = propertyPath.get("value");
              if (
                (t.isIdentifier(key) && key.name === propName) ||
                (t.isStringLiteral(key) && key.value === propName)
              ) {
                markNodeAsDCE(valuePath.node);
                result = getNodeAndInlineStatusFromValuePath(valuePath, state, componentPath);
                break;
              }
            } else {
              invariant(false, "TODO");
            }
          }
        } else if (t.isCallExpression(argumentPathRef.node)) {
          const annotation = getTypeAnnotationForExpression(argumentPathRef, state);

          if (t.isObjectTypeAnnotation(annotation)) {
            for (let typeProperty of annotation.properties) {
              const typePropertyKey = typeProperty.key;

              if (t.isIdentifier(typePropertyKey) && propName === typePropertyKey.name) {
                const cachedNode = getCachedRuntimeValue(argumentPathRef.node, state);
                result = { node: t.memberExpression(cachedNode, typePropertyKey), canInline: false };
              } else if (t.isStringLiteral(typePropertyKey) && propName === typePropertyKey.value) {
                const cachedNode = getCachedRuntimeValue(argumentPathRef.node, state);
                result = { node: t.memberExpression(cachedNode, typePropertyKey, true), canInline: false };
              }
            }
          } else {
            invariant(false, "TODO");
          }
        } else {
          invariant(false, "TODO");
        }
      }
    } else {
      invariant(false, "TODO");
    }
  }
  if (result !== null) {
    return result;
  }
  if (defaultPropValue !== null) {
    return defaultPropValue;
  }
  return { node: t.unaryExpression("void", t.numericLiteral(0)), canInline: true };
}

function createPropsArrayForCompositeComponent(
  path,
  attributesPath,
  childrenPath,
  shapeOfPropsObject,
  defaultProps,
  state,
  componentPath,
) {
  let canInlineArray = true;
  let keyASTNode = t.nullLiteral();
  const propsArray = [];

  for (let propShape of shapeOfPropsObject) {
    const propName = propShape.key;
    const { node, canInline } = getPropNodeForCompositeComponent(
      propName,
      attributesPath,
      childrenPath,
      defaultProps,
      state,
      componentPath,
    );
    if (propName === "key") {
      keyASTNode = node;
      continue;
    }
    if (!canInline) {
      canInlineArray = false;
    }
    propsArray.push(node);
  }

  return {
    keyASTNode,
    canInlineArray,
    propsArray,
  };
}

function compileCompositeComponent(path, componentName, attributesPath, childrenPath, state, componentPath) {
  const binding = getBindingPathRef(path, componentName, state);
  const compiledComponentCache = state.compiledComponentCache;
  let componentTemplateNode;
  let externalModuleState;

  // Change the require call to be that of the compiled
  if (state.externalBindings.has(componentName)) {
    const { pathRef, resolvedPathRef } = state.externalBindings.get(componentName);
    if (isCommonJsLikeRequireCall(pathRef)) {
      state.applyPostTransform(() => {
        updateCommonJSLikeRequireCallPathToCompiledPath(pathRef);
      });
    } else if (t.isImportDefaultSpecifier(pathRef.node) || t.isImportSpecifier(pathRef.node)) {
      state.applyPostTransform(() => {
        updateImportSyntaxPathToCompiledPath(pathRef.parentPath);
      });
    }
    externalModuleState = resolvedPathRef.moduleState;
    externalModuleState.needsCompiling();
    externalModuleState.isRootComponent = false;
  }
  if (compiledComponentCache.has(componentName)) {
    componentTemplateNode = compiledComponentCache.get(componentName);
    if (!componentTemplateNode.isStatic) {
      state.componentTemplateNode.childComponents.push(componentTemplateNode);
    }
  } else {
    if (binding === undefined) {
      throw new Error(
        `Compiled failed to find the reference for component <${componentName}> at ${getCodeLocation(path.node)}`,
      );
    }
    let compositeComponentPath = getReferenceFromExpression(binding.path, state, true, componentName);
    if (isDestructuredRef(compositeComponentPath)) {
      const propertyPath = compositeComponentPath.property;

      if (t.isObjectProperty(propertyPath.node)) {
        const valuePath = propertyPath.get("value");
        compositeComponentPath = getReferenceFromExpression(valuePath, state);
      } else {
        compositeComponentPath = propertyPath;
      }
    }
    const childState = externalModuleState || {
      ...state,
      ...{ isRootComponent: false },
    };
    componentTemplateNode = compileReactFunctionComponent(compositeComponentPath, childState);
  }
  const { defaultProps, isStatic, shapeOfPropsObject, templateNode } = componentTemplateNode;

  if (isStatic) {
    // We can remove the component entirely and just inline the template into the existing tree
    if (Array.isArray(attributesPath)) {
      for (let attributePath of attributesPath) {
        markNodeAsDCE(attributePath.node);
      }
    }
    if (Array.isArray(childrenPath)) {
      for (let childPath of childrenPath) {
        markNodeAsDCE(childPath.node);
      }
    }
    return templateNode;
  }
  const { keyASTNode, propsArray, canInlineArray } = createPropsArrayForCompositeComponent(
    path,
    attributesPath,
    childrenPath,
    shapeOfPropsObject,
    defaultProps,
    state,
    componentPath,
  );
  let propsArrayASTNode = t.arrayExpression(propsArray);

  if (!canInlineArray) {
    propsArrayASTNode = t.numericLiteral(getRuntimeValueIndexForPropsArray(propsArrayASTNode, state));
  }
  return new ReferenceComponentTemplateNode(componentName, componentTemplateNode, propsArrayASTNode, keyASTNode);
}

export function compileJSXElement(path, state, componentPath) {
  const openingElementPath = path.get("openingElement");
  const typePath = openingElementPath.get("name");
  const attributesPath = openingElementPath.get("attributes");
  const childrenPath = path.get("children");
  const templateNode = compileJSXElementType(typePath, attributesPath, childrenPath, state, componentPath);

  if (t.isBlockStatement(path.node)) {
    const body = path.get("body");
    const returnStatement = body[body.length - 1];
    if (t.isReturnStatement(returnStatement)) {
      returnStatement.get("argument").replaceWith(emptyObject);
    } else {
      invariant(false, "Should never happen");
    }
  } else {
    path.replaceWith(emptyObject);
  }

  return templateNode;
}

function compileJSXElementType(typePath, attributesPath, childrenPath, state, componentPath) {
  const typeName = t.isStringLiteral(typePath.node) ? typePath.node.value : typePath.node.name;

  if (isReferenceReactContextProvider(typePath, state)) {
    const contextObjectRuntimeValueIndex = getContextObjectRuntimeValueIndex(typePath, state);
    const hostNodeId = Symbol();
    pushOpcode(opcodes, "OPEN_CONTEXT_PROVIDER", contextObjectRuntimeValueIndex);
    createOpcodesForJSXElementHostComponent(
      hostNodeId,
      null,
      attributesPath,
      childrenPath,
      opcodes,
      state,
      componentPath,
    );
    pushOpcode(opcodes, "CLOSE_CONTEXT_PROVIDER");
  } else if (isReferenceReactContextConsumer(typePath, state)) {
    createOpcodesForReactContextConsumer(typePath, childrenPath, opcodes, state, componentPath);
  } else if (isReactFragment(typePath, state)) {
    return compileJSXFragment(childrenPath, attributesPath, state, componentPath, false);
  } else if (isHostComponentType(typePath, state)) {
    const isVoidElement = voidElements.has(typeName);
    const templateNode = new HostComponentTemplateNode(typeName, isVoidElement);
    compileJSXElementHostComponent(templateNode, typeName, attributesPath, childrenPath, state, componentPath);
    return templateNode;
  } else if (isConditionalComponentType(typePath, state)) {
    const typePathRef = getReferenceFromExpression(typePath, state);
    if (t.isConditionalExpression(typePathRef.node)) {
      return compileForksOfConditionalReactElementType(typePathRef, state, forkedTypePath =>
        compileJSXElementType(forkedTypePath, attributesPath, childrenPath, state, componentPath),
      );
    }
    invariant(false, "TODO");
  } else {
    let componentName = typeName;

    if (typeName === undefined) {
      if (t.isFunctionDeclaration(typePath.node)) {
        componentName = typePath.node.id.name;
      } else {
        invariant(false, "TODO");
      }
    }
    return compileCompositeComponent(typePath, componentName, attributesPath, childrenPath, state, componentPath);
  }
}

function getPropsMapFromJSXElementAttributes(attributesPath, state) {
  const propsMap = new Map();
  for (let attributePath of attributesPath) {
    const attributeNode = attributePath.node;
    if (t.isJSXAttribute(attributeNode)) {
      const attributeName = attributeNode.name;
      let nameStr;

      if (t.isJSXIdentifier(attributeName)) {
        nameStr = attributeName.name;
      } else {
        invariant(false, "TODO");
      }
      const valuePath = attributePath.get("value");
      propsMap.set(nameStr, valuePath);
    } else if (t.isJSXSpreadAttribute(attributeNode) && t.isIdentifier(attributeNode.argument)) {
      const argumentPath = attributePath.get("argument");
      const argumentPathRef = getReferenceFromExpression(argumentPath, state, true);

      if (t.isObjectExpression(argumentPathRef.node)) {
        const properties = argumentPathRef.get("properties");
        for (let propertyPath of properties) {
          if (t.isObjectProperty(propertyPath.node)) {
            let nameStr;

            if (t.isIdentifier(propertyPath.node.key)) {
              nameStr = propertyPath.node.key.name;
            } else {
              invariant(false, "TOOD");
            }
            const valuePath = propertyPath.get("value");
            propsMap.set(nameStr, valuePath);
          } else {
            invariant(false, "TOOD");
          }
        }
      } else {
        invariant(false, "TOOD");
      }
    } else {
      invariant(false, "TOOD");
    }
  }
  return propsMap;
}

function getPropsMapFromObjectExpression(propertiesPath) {
  const propsMap = new Map();
  for (let propertyPath of propertiesPath) {
    const propertyNode = propertyPath.node;
    if (t.isObjectProperty(propertyNode)) {
      const attributeName = propertyNode.key;
      let nameStr;

      if (t.isIdentifier(attributeName)) {
        nameStr = attributeName.name;
      } else if (t.isStringLiteral(attributeName)) {
        nameStr = attributeName.value;
      } else {
        invariant(false, "TODO");
      }

      const valuePath = propertyPath.get("value");
      propsMap.set(nameStr, valuePath);
    } else {
      invariant(false, "TODO");
    }
  }
  return propsMap;
}

function compileJSXElementHostComponent(templateNode, tagName, attributesPath, childrenPath, state, componentPath) {
  // The following is only for host components (<div />) and
  // context provider components (as we treat them like host components).
  // The following logic is not for composite components (<Component />).

  if (attributesPath.length > 0) {
    const propsMap = getPropsMapFromJSXElementAttributes(attributesPath, state);
    const renderChildren = propsMap.get("children");
    propsMap.delete("children");
    for (let [propName, valuePath] of propsMap) {
      compileHostComponentPropValue(templateNode, tagName, valuePath, propName, state, componentPath);
    }
    if (renderChildren !== undefined) {
      compileHostComponentChildren(templateNode, renderChildren, state, componentPath);
    }
  }
  const filteredChildrenPath = childrenPath.filter(childPath => {
    if (t.isJSXText(childPath.node) && handleWhiteSpace(childPath.node.value) === "") {
      return false;
    }
    return true;
  });
  if (filteredChildrenPath.length > 1) {
    for (let i = 0; i < filteredChildrenPath.length; i++) {
      compileHostComponentChildren(templateNode, filteredChildrenPath[i], state, componentPath);
    }
  } else if (filteredChildrenPath.length === 1) {
    compileHostComponentChildren(templateNode, filteredChildrenPath[0], state, componentPath);
  }
}

function compileReactCreateElementHostComponent(templateNode, tagName, args, state, componentPath) {
  if (args.length > 1) {
    const configPath = args[1];
    const configPathRef = getReferenceFromExpression(configPath, state);
    const configNode = configPathRef.node;

    const compilePropsGivenMap = propsMap => {
      const renderChildren = propsMap.get("children");
      propsMap.delete("children");
      for (let [propName, valuePath] of propsMap) {
        compileHostComponentPropValue(templateNode, tagName, valuePath, propName, state, componentPath);
      }
      if (renderChildren !== undefined) {
        compileHostComponentChildren(templateNode, renderChildren, state, componentPath);
      }
    };

    if (t.isNullLiteral(configNode)) {
      // NO-OP
    } else if (t.isObjectExpression(configNode)) {
      const propertiesPath = configPathRef.get("properties");
      const propsMap = getPropsMapFromObjectExpression(propertiesPath);

      compilePropsGivenMap(propsMap);
    } else if (t.isCallExpression(configNode)) {
      if (isObjectAssignCall(configPathRef, state)) {
        const objectAssignArgs = configPathRef.get("arguments");
        let propsMap = new Map();

        for (let argumentPath of objectAssignArgs) {
          const argumentPathRef = getReferenceFromExpression(argumentPath, state);

          if (t.isObjectExpression(argumentPathRef.node)) {
            const propertiesPath = argumentPathRef.get("properties");
            propsMap = new Map([...propsMap, ...getPropsMapFromObjectExpression(propertiesPath)]);
          } else {
            invariant(false, "TODO");
          }
        }
        compilePropsGivenMap(propsMap);
      } else {
        invariant(false, "TODO");
      }
    } else {
      invariant(false, "TODO");
    }
  }
  if (args.length > 2) {
    const childrenLength = args.length - 2;

    if (childrenLength > 1) {
      for (let i = 0; i < childrenLength; ++i) {
        compileHostComponentChildren(templateNode, args[2 + i], state, componentPath);
      }
    } else {
      compileHostComponentChildren(templateNode, args[2], state, componentPath);
    }
  }
}

function compileForksOfConditionalReactElementType(typePath, state, fork) {
  const testPath = getReferenceFromExpression(typePath.get("test"), state);
  const test = testPath.node;
  let runtimeConditionalIndex;

  const runtimeConditionals = state.runtimeConditionals;
  if (runtimeConditionals.has(test)) {
    runtimeConditionalIndex = runtimeConditionals.get(test);
  } else {
    runtimeConditionalIndex = runtimeConditionals.size;
    runtimeConditionals.set(test, runtimeConditionalIndex);
  }
  const valueIndex = getRuntimeValueIndex(test, state);

  const consequentPath = typePath.get("consequent");
  const consequentPathRef = getReferenceFromExpression(consequentPath, state);
  const consequentTemplateNode = fork(consequentPathRef);

  const alternatePath = typePath.get("alternate");
  const alternatePathRef = getReferenceFromExpression(alternatePath, state);
  const alternateTemplateNode = fork(alternatePathRef);

  return new ConditionalTemplateNode(valueIndex, consequentTemplateNode, alternateTemplateNode);
}

function compileReactCreateElementType(typePath, args, state, componentPath) {
  if (isHostComponentType(typePath, state)) {
    const nameNode = typePath.node;
    const strName = nameNode.value;
    const isVoidElement = voidElements.has(strName);
    const templateNode = new HostComponentTemplateNode(strName, isVoidElement);
    compileReactCreateElementHostComponent(templateNode, strName, args, state, componentPath);
    return templateNode;
  } else if (isConditionalComponentType(typePath, state)) {
    const typePathRef = getReferenceFromExpression(typePath, state);
    if (t.isConditionalExpression(typePathRef.node)) {
      return compileForksOfConditionalReactElementType(typePathRef, state, forkedTypePath =>
        compileReactCreateElementType(forkedTypePath, args, state, componentPath),
      );
    }
    invariant(false, "TODO");
  } else {
    let componentName;
    let attributesPath = null;
    let childrenPath = null;

    if (args.length > 1) {
      const configPath = args[1];
      const configPathRef = getReferenceFromExpression(configPath, state);

      if (t.isNullLiteral(configPathRef.node)) {
        // NO-OP
      } else if (t.isObjectExpression(configPathRef.node)) {
        attributesPath = configPathRef.get("properties");
      } else if (t.isCallExpression(configPathRef.node)) {
        attributesPath = configPathRef;
      } else {
        invariant(false, "TODO");
      }
    }
    if (args.length > 2) {
      childrenPath = args.slice(2);
    }

    if (isReferenceReactContextProvider(typePath, state)) {
      const contextObjectRuntimeValueIndex = getContextObjectRuntimeValueIndex(typePath, state);
      const hostNodeId = Symbol();
      pushOpcode(opcodes, "OPEN_CONTEXT_PROVIDER", contextObjectRuntimeValueIndex);
      createOpcodesForReactCreateElementHostComponent(hostNodeId, null, args, opcodes, state, componentPath);
      pushOpcode(opcodes, "CLOSE_CONTEXT_PROVIDER");
      return;
    } else if (isReferenceReactContextConsumer(typePath, state)) {
      createOpcodesForReactContextConsumer(typePath, childrenPath, opcodes, state, componentPath);
      return;
    } else if (t.isIdentifier(typePath.node)) {
      componentName = typePath.node.name;
    } else if (t.isFunctionDeclaration(typePath.node)) {
      componentName = typePath.node.id.name;
    } else if (isReactFragment(typePath, state)) {
      return compiledReactCreateElementFragment(args, state, componentPath);
    } else {
      invariant(false, "TODO");
    }

    return compileCompositeComponent(typePath, componentName, attributesPath, childrenPath, state, componentPath);
  }
}

export function compileReactCreateElement(path, state, componentPath) {
  markNodeAsDCE(path.node);
  if (t.isMemberExpression(path.node.callee)) {
    markNodeAsDCE(path.node.callee.object);
  }
  const args = path.get("arguments");

  if (args.length === 0) {
    throw new Error(
      `Compiler failed to due React.createElement() called with no arguments at ${getCodeLocation(path.node)}`,
    );
  }
  const typePath = args[0];

  const templateNode = compileReactCreateElementType(typePath, args, state, componentPath);
  if (t.isBlockStatement(path.node)) {
    const body = path.get("body");
    const returnStatement = body[body.length - 1];
    if (t.isReturnStatement(returnStatement)) {
      returnStatement.get("argument").replaceWith(emptyObject);
    } else {
      invariant(false, "Should never happen");
    }
  } else {
    path.replaceWith(emptyObject);
  }
  return templateNode;
}
