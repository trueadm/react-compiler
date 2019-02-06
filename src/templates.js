import * as t from "@babel/types";
import invariant from "./invariant";
import { markNodeAsUsed } from "./utils";

export const ROOT_COMPONENT = 0;
export const COMPONENT = 1;
export const HOST_COMPONENT = 2;
export const TEXT = 3;
export const VALUE = 4;
export const FRAGMENT = 5;
export const CONDITIONAL = 6;
export const LOGICAL = 7;
export const TEMPLATE_FUNCTION_CALL = 8;
export const MULTI_CONDITIONAL = 9;
export const TEXT_ARRAY = 10;
export const REFERENCE_COMPONENT = 11;
export const VNODE = 12;
export const REFERENCE_VNODE = 13;
export const MULTI_RETURN_CONDITIONAL = 14;
export const VNODE_COLLECTION = 15;
export const CONTEXT_PROVIDER = 16;
export const CONTEXT_CONSUMER = 17;

// Elements
export const HAS_STATIC_PROPS = 1 << 6;
export const HAS_DYNAMIC_PROPS = 1 << 7;
export const HAS_STATIC_STYLES = 1 << 8;
export const HAS_DYNAMIC_STYLES = 1 << 9;
export const HAS_CHILD = 1 << 10;
export const HAS_CHILDREN = 1 << 11;
export const HAS_STATIC_TEXT_CONTENT = 1 << 12;
export const HAS_DYNAMIC_TEXT_CONTENT = 1 << 13;
export const HAS_DYNAMIC_TEXT_ARRAY_CONTENT = 1 << 14;
export const IS_STATIC = 1 << 15;
export const IS_SVG = 1 << 16;
export const IS_VOID = 1 << 17;

// Components
export const HAS_HOOKS = 1 << 6;

// Collection
export const HAS_KEYS = 1 << 6;

// Logical
export const LOGICAL_AND = 1 << 6;
export const LOGICAL_OR = 1 << 7;

function valueToBabelNode(value) {
  if (typeof value === "boolean") {
    return t.booleanLiteral(value);
  } else if (typeof value === "number") {
    return t.numericLiteral(value);
  } else if (typeof value === "string") {
    return t.stringLiteral(value);
  } else if (value === null) {
    return t.nullLiteral();
  } else if (value === undefined) {
    return t.unaryExpression("void", t.numericLiteral(0));
  }
  throw new Error("TODO");
}

export class ComponentTemplateNode {
  constructor(
    name,
    componentPath,
    isRootComponent,
    usesHooks,
    defaultProps,
    functionKind,
    typeAnnotation,
    shapeOfPropsObject,
  ) {
    this.name = name;
    this.componentPath = componentPath;
    this.insertPath = null;
    this.isStatic = false;
    this.computeFunctionRef = null;
    this.templateNode = null;
    this.isRootComponent = isRootComponent;
    this.usesHooks = usesHooks;
    this.defaultProps = defaultProps;
    this.functionKind = functionKind;
    this.typeAnnotation = typeAnnotation;
    this.shapeOfPropsObject = shapeOfPropsObject;
    this.propsArray = null;
    this.propsValueIndex = null;
    this.childComponents = [];
    this.insertionPath = null;
  }

  getKeyASTNode() {
    debugger;
  }

  toAST() {
    const ASTNode = [];
    let flag = this.isRootComponent ? ROOT_COMPONENT : COMPONENT;
    if (this.isStatic) {
      flag |= IS_STATIC;
    }
    if (this.usesHooks) {
      flag |= HAS_HOOKS;
    }
    // TODO: Maybe change to hex if less bytes?
    ASTNode.push(t.numericLiteral(flag));
    if (!this.isStatic) {
      if (this.isRootComponent) {
        if (this.shapeOfPropsObject === null) {
          ASTNode.push(t.numericLiteral(0));
        } else {
          ASTNode.push(t.arrayExpression(this.shapeOfPropsObject.map(a => t.stringLiteral(a.value))));
        }
      }
      ASTNode.push(t.identifier(this.computeFunctionRef));
    }
    if (this.templateNode !== null) {
      ASTNode.push(this.templateNode.toAST());
    }
    return t.arrayExpression(ASTNode);
  }
}

export class ReferenceComponentTemplateNode {
  constructor(componentRefName, componentTemplateNode, propsArrayASTNode, keyASTNode) {
    this.componentTemplateNode = componentTemplateNode;
    this.componentRefName = componentRefName;
    this.propsArrayASTNode = propsArrayASTNode;
    this.keyASTNode = keyASTNode;
  }

  getKeyASTNode() {
    return this.keyASTNode;
  }

  toAST() {
    const componentRefIdentifier = t.identifier(this.componentRefName);
    markNodeAsUsed(componentRefIdentifier);
    let flags = REFERENCE_COMPONENT;

    if (t.isArrayExpression(this.propsArrayASTNode)) {
      flags |= HAS_STATIC_PROPS;
    }

    return t.arrayExpression([t.numericLiteral(flags), componentRefIdentifier, this.propsArrayASTNode]);
  }
}

export class ReferenceVNode {
  constructor(valueIndex) {
    this.valueIndex = valueIndex;
  }

  getKeyASTNode() {
    debugger;
  }

  toAST() {
    return t.arrayExpression([t.numericLiteral(REFERENCE_VNODE), t.numericLiteral(this.valueIndex)]);
  }
}

function hostComponentChildrenToAST(flag, children, isContextProvider) {
  let childrenASTNode = null;
  const childrenLength = children.length;
  if (childrenLength === 1) {
    const child = children[0];

    if (!isContextProvider) {
      if (child instanceof StaticTextTemplateNode) {
        flag |= HAS_STATIC_TEXT_CONTENT;
        childrenASTNode = t.stringLiteral(child.text);
      } else if (child instanceof DynamicTextTemplateNode) {
        flag |= HAS_DYNAMIC_TEXT_CONTENT;
        childrenASTNode = t.numericLiteral(child.valueIndex);
      } else if (child instanceof FragmentTemplateNode) {
        invariant(false, "TODO");
      } else if (child instanceof DynamicTextArrayTemplateNode) {
        flag |= HAS_DYNAMIC_TEXT_ARRAY_CONTENT;
        childrenASTNode = t.numericLiteral(child.valueIndex);
      }
    }
    if (child instanceof StaticValueTemplateNode) {
      // Should not happen
      invariant(false, "TODO");
    } else if (childrenASTNode === null) {
      flag |= HAS_CHILD;
      childrenASTNode = child.toAST();
    }
  } else if (childrenLength > 1) {
    flag |= HAS_CHILDREN;
    const childrenASTNodes = [];
    for (let child of children) {
      if (child instanceof FragmentTemplateNode) {
        const fragmentChildren = child.children;

        for (let x = 0; x < fragmentChildren.length; x++) {
          const fragmentChild = fragmentChildren[x];
          childrenASTNodes.push(fragmentChild.toAST());
        }
      } else if (child instanceof StaticValueTemplateNode) {
        // Should not happen
        invariant(false, "TODO");
      } else {
        childrenASTNodes.push(child.toAST());
      }
    }
    childrenASTNode = t.arrayExpression(childrenASTNodes);
  }
  return [flag, childrenASTNode];
}

export class HostComponentTemplateNode {
  constructor(tagName, isVoidElement) {
    this.tagName = tagName;
    this.isVoidElement = isVoidElement;
    this.staticProps = [];
    this.dynamicProps = [];
    this.staticStyles = [];
    this.dynamicStyles = [];
    this.children = [];
    this.isStatic = false;
    this.keyASTNode = null;
  }

  getKeyASTNode() {
    return this.keyASTNode === null ? t.nullLiteral() : this.keyASTNode;
  }

  toAST() {
    const ASTNode = [];
    const hasStaticProps = this.staticProps.length !== 0;
    const hasDynamicProps = this.dynamicProps.length !== 0;
    const hasStaticStyles = this.staticStyles.length !== 0;
    const hasDynamicStyles = this.dynamicStyles.length !== 0;
    let flag = HOST_COMPONENT;
    let staticPropsASTNode = null;
    let dynamicPropsASTNode = null;
    let staticStylesASTNode = null;
    let dynamicStylesASTNode = null;

    if (this.isStatic) {
      flag |= IS_STATIC;
    }
    if (this.isVoidElement) {
      flag |= IS_VOID;
    }
    if (hasStaticProps) {
      flag |= HAS_STATIC_PROPS;
      const staticPropASTNodes = [];
      for (let [propName, propInformation, propValue] of this.staticProps) {
        staticPropASTNodes.push(
          t.stringLiteral(propName),
          t.numericLiteral(propInformation),
          valueToBabelNode(propValue),
        );
      }
      staticPropsASTNode = t.arrayExpression(staticPropASTNodes);
    }
    if (hasStaticStyles) {
      flag |= HAS_STATIC_STYLES;
      const staticStylesASTNodes = [];
      for (let [styleName, propValue] of this.staticStyles) {
        staticStylesASTNodes.push(t.stringLiteral(styleName), valueToBabelNode(propValue));
      }
      staticStylesASTNode = t.arrayExpression(staticStylesASTNodes);
    }
    if (hasDynamicProps) {
      flag |= HAS_DYNAMIC_PROPS;
      const dynamicPropASTNodes = [];
      for (let [propName, propInformation, valueIndex] of this.dynamicProps) {
        dynamicPropASTNodes.push(
          t.stringLiteral(propName),
          t.numericLiteral(propInformation),
          t.numericLiteral(valueIndex),
        );
      }
      dynamicPropsASTNode = t.arrayExpression(dynamicPropASTNodes);
    }
    if (hasDynamicStyles) {
      flag |= HAS_DYNAMIC_STYLES;
      const dynamicStylesASTNodes = [];
      for (let [styleName, valueIndex] of this.dynamicStyles) {
        dynamicStylesASTNodes.push(t.stringLiteral(styleName), t.numericLiteral(valueIndex));
      }
      dynamicStylesASTNode = t.arrayExpression(dynamicStylesASTNodes);
    }
    let childrenASTNode = null;
    [flag, childrenASTNode] = hostComponentChildrenToAST(flag, this.children, false);
    // TODO: Maybe change to hex if less bytes?
    ASTNode.push(t.numericLiteral(flag));
    ASTNode.push(t.stringLiteral(this.tagName));

    if (staticPropsASTNode !== null) {
      ASTNode.push(staticPropsASTNode);
    }
    if (staticStylesASTNode !== null) {
      ASTNode.push(staticStylesASTNode);
    }
    if (dynamicPropsASTNode !== null) {
      ASTNode.push(dynamicPropsASTNode);
    }
    if (dynamicStylesASTNode !== null) {
      ASTNode.push(dynamicStylesASTNode);
    }
    if (childrenASTNode !== null) {
      ASTNode.push(childrenASTNode);
    }
    return t.arrayExpression(ASTNode);
  }
}

export class ContextProviderTemplateNode {
  constructor(contextObjectValueIndex) {
    this.contextObjectValueIndex = contextObjectValueIndex;
    this.staticProps = [];
    this.dynamicProps = [];
    this.children = [];
  }

  toAST() {
    const ASTNode = [];
    const hasStaticProps = this.staticProps.length !== 0;
    const hasDynamicProps = this.dynamicProps.length !== 0;
    let flag = CONTEXT_PROVIDER;
    let contextValueASTNode = null;

    if (hasStaticProps) {
      flag |= HAS_STATIC_PROPS;
      invariant(this.staticProps.length < 2, "Context providers should never have more than 1 prop");
      const [propName, , propValue] = this.staticProps[0];
      invariant(propName === "value", "Context providers prop should always be value");
      contextValueASTNode = valueToBabelNode(propValue);
    }
    if (hasDynamicProps) {
      debugger;
    }
    let childrenASTNode = null;
    [flag, childrenASTNode] = hostComponentChildrenToAST(flag, this.children, true);
    ASTNode.push(t.numericLiteral(flag));
    ASTNode.push(t.numericLiteral(this.contextObjectValueIndex));

    if (contextValueASTNode !== null) {
      ASTNode.push(contextValueASTNode);
    }
    if (childrenASTNode !== null) {
      ASTNode.push(childrenASTNode);
    }
    return t.arrayExpression(ASTNode);
  }
}

export class ContextConsumerTemplateNode {
  constructor(contextObjectValueIndex, templateNode, computeFunctionValueIndex) {
    this.contextObjectValueIndex = contextObjectValueIndex;
    this.templateNode = templateNode;
    this.computeFunctionValueIndex = computeFunctionValueIndex;
  }

  toAST() {
    return t.arrayExpression([
      t.numericLiteral(CONTEXT_CONSUMER),
      t.numericLiteral(this.contextObjectValueIndex),
      t.numericLiteral(this.computeFunctionValueIndex),
      this.templateNode.toAST(),
    ]);
  }
}

export class StaticTextTemplateNode {
  constructor(text) {
    this.isStatic = true;
    this.text = text;
  }

  getKeyASTNode() {
    debugger;
  }

  toAST() {
    return t.arrayExpression([t.numericLiteral(TEXT | IS_STATIC), t.stringLiteral(this.text + "")]);
  }
}

export class DynamicTextArrayTemplateNode {
  constructor(valueIndex) {
    this.valueIndex = valueIndex;
  }

  toAST() {
    return t.arrayExpression([t.numericLiteral(TEXT_ARRAY), t.numericLiteral(this.valueIndex)]);
  }
}

export class DynamicTextTemplateNode {
  constructor(valueIndex) {
    this.valueIndex = valueIndex;
  }

  getKeyASTNode() {
    debugger;
  }

  toAST() {
    return t.arrayExpression([t.numericLiteral(TEXT), t.numericLiteral(this.valueIndex)]);
  }
}

export class StaticValueTemplateNode {
  constructor(value) {
    this.isStatic = true;
    this.value = value;
  }

  getKeyASTNode() {
    debugger;
  }

  toAST() {
    return t.arrayExpression([t.numericLiteral(VALUE | IS_STATIC), valueToBabelNode(this.value)]);
  }
}

export class DynamicValueTemplateNode {
  constructor(valueIndex) {
    this.valueIndex = valueIndex;
  }

  getKeyASTNode() {
    debugger;
  }

  toAST() {
    return t.arrayExpression([t.numericLiteral(VALUE), t.numericLiteral(this.valueIndex)]);
  }
}

export class TemplateFunctionCallTemplateNode {
  constructor(templateNode, computeFunctionValueIndex) {
    this.templateNode = templateNode;
    this.computeFunctionValueIndex = computeFunctionValueIndex;
  }

  getKeyASTNode() {
    // TODO
    return t.nullLiteral();
  }

  toAST() {
    return t.arrayExpression([
      t.numericLiteral(TEMPLATE_FUNCTION_CALL),
      this.templateNode.toAST(),
      t.numericLiteral(this.computeFunctionValueIndex),
    ]);
  }
}

export class MultiConditionalTemplateNode {
  constructor() {
    this.conditions = [];
  }

  toAST() {
    const conditionsASTNodes = [];

    for (let { conditionTemplateNode, isDefault, valueIndex } of this.conditions) {
      if (isDefault) {
        conditionsASTNodes.push(t.nullLiteral());
      } else {
        conditionsASTNodes.push(t.numericLiteral(valueIndex));
      }
      conditionsASTNodes.push(conditionTemplateNode.toAST());
    }
    return t.arrayExpression([t.numericLiteral(MULTI_CONDITIONAL), t.arrayExpression(conditionsASTNodes)]);
  }
}

export class MultiReturnConditionalTemplateNode {
  constructor() {
    this.conditions = [];
    this.isStatic = false;
  }

  toAST() {
    const multiReturnASTNodes = [t.numericLiteral(MULTI_RETURN_CONDITIONAL)];
    for (let [branchIndex, templateNode] of this.conditions) {
      multiReturnASTNodes.push(t.numericLiteral(branchIndex), templateNode.toAST());
    }
    return t.arrayExpression(multiReturnASTNodes);
  }
}

export class FragmentTemplateNode {
  constructor(children, keyASTNode) {
    this.children = children;
    this.keyASTNode = keyASTNode;
  }

  getKeyASTNode() {
    return this.keyASTNode;
  }

  toAST() {
    return t.arrayExpression([
      t.numericLiteral(FRAGMENT),
      t.arrayExpression(this.children.map(child => child.toAST())),
    ]);
  }
}

export class ConditionalTemplateNode {
  constructor(valueIndex, alternateTemplateNode, consequentTemplateNode) {
    this.valueIndex = valueIndex;
    this.alternateTemplateNode = alternateTemplateNode;
    this.consequentTemplateNode = consequentTemplateNode;
  }

  toAST() {
    return t.arrayExpression([
      t.numericLiteral(CONDITIONAL),
      t.numericLiteral(this.valueIndex),
      this.alternateTemplateNode.toAST(),
      this.consequentTemplateNode.toAST(),
    ]);
  }
}

export class LogicalTemplateNode {
  constructor(operator, leftTemplateNode, rightTemplateNode) {
    this.operator = operator;
    this.leftTemplateNode = leftTemplateNode;
    this.rightTemplateNode = rightTemplateNode;
  }

  toAST() {
    let flags = LOGICAL;

    if (this.operator === "||") {
      flags |= LOGICAL_OR;
    } else if (this.operator === "&&") {
      flags |= LOGICAL_AND;
    } else {
      invariant(false, "Unsupported LogicalTemplateNode operator");
    }
    return t.arrayExpression([t.numericLiteral(flags), this.leftTemplateNode.toAST(), this.rightTemplateNode.toAST()]);
  }
}

export class VNodeCollectionTemplateNode {
  constructor(valueIndex, templateNode) {
    this.valueIndex = valueIndex;
    this.templateNode = templateNode;
  }

  getKeyASTNode() {
    return this.templateNode.getKeyASTNode();
  }

  toAST() {
    let flags = VNODE_COLLECTION;

    if (!t.isNullLiteral(this.getKeyASTNode())) {
      flags |= HAS_KEYS;
    }
    return t.arrayExpression([t.numericLiteral(flags), t.numericLiteral(this.valueIndex)]);
  }
}
