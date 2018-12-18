import {
  getCodeLocation,
  isArrayConstructor,
  isReactHook,
  isReactCreateElement,
  isFbCxCall,
  isFbCxRequireCall,
  isFbtRequireCall,
  isFbtCall,
} from "./utils";
import {
  getBindingPathRef,
  getReferenceFromExpression,
  isDestructuredRef,
  isIdentifierReferenceConstant,
} from "./references";
import invariant from "./invariant";
import * as t from "@babel/types";

export function getTypeAlias(path, annotation, state) {
  if (t.isGenericTypeAnnotation(annotation)) {
    if (t.isIdentifier(annotation.id)) {
      const bindingName = annotation.id.name;
      const binding = getBindingPathRef(path, bindingName, state);

      if (binding === undefined) {
        return null;
      }
      if (t.isTypeAlias(binding.path.node)) {
        return binding.path.node;
      } else if (t.isImportSpecifier(binding.path.node)) {
        const parentPath = binding.path.parentPath;

        if (t.isImportDeclaration(parentPath.node)) {
          invariant(t.isStringLiteral(parentPath.node.source), "TODO");
          const moduleName = parentPath.node.source.value;
          const externalPathRef = state.resolveModuleBindingSync(moduleName, state.currentModulePath, bindingName);
          state.externalPathRefs.set(externalPathRef, path);
          return t.typeAlias(annotation.id, null, externalPathRef.node);
        }
      }
    }
  }
  return null;
}

export function getTypeAnnotationForExpression(path, state, errorOnMissingType = true) {
  const node = path.node;

  if (t.isStringLiteral(node) || t.isJSXText(node) || t.isTemplateLiteral(node)) {
    return t.stringTypeAnnotation();
  } else if (t.isBooleanLiteral(node)) {
    return t.booleanLiteralTypeAnnotation(node.value);
  } else if (t.isNumericLiteral(node)) {
    return t.numberTypeAnnotation();
  } else if (t.isJSXElement(node) || isReactCreateElement(path, state)) {
    const jsxType = t.genericTypeAnnotation(t.identifier("empty"));
    jsxType.id = t.qualifiedTypeIdentifier(t.identifier("Node"), t.identifier("React"));
    return jsxType;
  } else if (t.isJSXFragment(node)) {
    const jsxType = t.genericTypeAnnotation(t.identifier("empty"));
    jsxType.id = t.qualifiedTypeIdentifier(t.identifier("Fragment"), t.identifier("React"));
    return jsxType;
  } else if (t.isNullLiteral(node) || node == null) {
    return t.nullLiteralTypeAnnotation();
  } else if (t.isUnaryExpression(node) && node.operator === "void") {
    return t.voidTypeAnnotation();
  }
  if (t.isMemberExpression(node)) {
    const objectPath = path.get("object");
    const objectType = getTypeAnnotationForExpression(objectPath, state, errorOnMissingType);
    const property = node.property;

    if (t.isObjectTypeAnnotation(objectType)) {
      for (let typeProperty of objectType.properties) {
        const typePropertyKey = typeProperty.key;

        if (t.isIdentifier(property) && t.isIdentifier(typePropertyKey) && property.name === typePropertyKey.name) {
          return typeProperty.value;
        }
      }
    }
    return objectType;
  } else if (t.isIdentifier(node)) {
    const bindingName = path.node.name;
    const binding = getBindingPathRef(path, bindingName, state);

    if (state.compiledComponentCache.has(bindingName)) {
      const result = state.compiledComponentCache.get(bindingName);
      return result.typeAnnotation;
    }
    if (binding !== undefined && binding.path !== path) {
      const bindingPath = binding.path;
      const bindingNode = bindingPath.node;
      const typeForIdentifier = getTypeAnnotationForExpression(bindingPath, state, false);
      // Might be a type in another module
      if (t.isAnyTypeAnnotation(typeForIdentifier)) {
        let bindingPathRef = getReferenceFromExpression(bindingPath, state, true, bindingName);
        if (isDestructuredRef(bindingPathRef)) {
          const propertyPath = bindingPathRef.property;

          if (t.isObjectProperty(propertyPath.node)) {
            const valuePath = propertyPath.get("value");
            bindingPathRef = getReferenceFromExpression(valuePath, state);
          } else {
            bindingPathRef = propertyPath;
          }
        }
        return getTypeAnnotationForExpression(bindingPathRef, state, errorOnMissingType);
      }
      const typeAlias = getTypeAlias(path, typeForIdentifier, state);

      if (typeAlias !== null) {
        if (typeAlias !== null) {
          const aliasAnnotation = typeAlias.right;

          if (t.isObjectTypeAnnotation(aliasAnnotation)) {
            for (let typeProperty of aliasAnnotation.properties) {
              const typePropertyKey = typeProperty.key;

              if (t.isIdentifier(typePropertyKey) && node.name === typePropertyKey.name) {
                return typeProperty.value;
              } else if (t.isStringLiteral(typePropertyKey) && node.name === typePropertyKey.value) {
                return typeProperty.value;
              }
            }
          } else {
            invariant(false, "TODO");
          }
        }
      } else if (t.isObjectPattern(bindingNode)) {
        for (let typeProperty of typeForIdentifier.properties) {
          const typePropertyKey = typeProperty.key;

          if (t.isIdentifier(typePropertyKey) && node.name === typePropertyKey.name) {
            return typeProperty.value;
          } else if (t.isStringLiteral(typePropertyKey) && node.name === typePropertyKey.value) {
            return typeProperty.value;
          }
        }
      }
      if (!isIdentifierReferenceConstant(path, state)) {
        const types = [typeForIdentifier];
        for (let constantViolation of binding.constantViolations) {
          const constantViolationNode = constantViolation.node;
          if (t.isAssignmentExpression(constantViolationNode)) {
            const rightPath = constantViolation.get("right");
            if (t.isMemberExpression(rightPath.node) && rightPath.node.object === path.node) {
              throw new Error(
                `Compiled failed to find type annotation for object "${
                  path.node.name
                }" due to an unsupported line property assignment at ${getCodeLocation(path.node)}`,
              );
            }
            const typeForReference = getTypeAnnotationForExpression(rightPath, state, errorOnMissingType);
            types.push(typeForReference);
          } else {
            debugger;
            invariant(false, "TODO");
          }
        }
        return t.unionTypeAnnotation(types);
      }
      if (!t.isObjectPattern(bindingNode)) {
        return typeForIdentifier;
      }
    }
    const annotation = path.getTypeAnnotation();

    if (!t.isAnyTypeAnnotation(annotation)) {
      return annotation;
    }
  } else if (t.isVariableDeclarator(node)) {
    const id = node.id;
    if (t.isTypeAnnotation(id.typeAnnotation)) {
      return id.typeAnnotation.typeAnnotation;
    }
    const initPath = path.get("init");
    return getTypeAnnotationForExpression(initPath, state, errorOnMissingType);
  } else if (t.isJSXExpressionContainer(node)) {
    const expressionPath = path.get("expression");
    return getTypeAnnotationForExpression(expressionPath, state, errorOnMissingType);
  } else if (t.isArrayExpression(node)) {
    let currentAnnotation;
    let failed = false;

    const elements = path.get("elements");
    for (let element of elements) {
      const annotation = getTypeAnnotationForExpression(element, state, errorOnMissingType);

      if (!t.isAnyTypeAnnotation(annotation)) {
        if (currentAnnotation === undefined) {
          currentAnnotation = annotation;
        } else if (t.isUnionTypeAnnotation(currentAnnotation)) {
          currentAnnotation.types.push(annotation);
        } else if (!t.isNodesEquivalent(annotation, currentAnnotation)) {
          currentAnnotation = t.unionTypeAnnotation([currentAnnotation, annotation]);
        }
      } else {
        failed = true;
        break;
      }
    }

    if (!failed) {
      return currentAnnotation;
    }
  } else if (t.isObjectPattern(node) || t.isObjectExpression(node)) {
    const annotation = path.getTypeAnnotation();

    if (!t.isAnyTypeAnnotation(annotation)) {
      return annotation;
    }
  } else if (t.isConditionalExpression(node)) {
    const consequentPath = path.get("consequent");
    const alternatePath = path.get("alternate");

    const consequentType = getTypeAnnotationForExpression(consequentPath, state, errorOnMissingType);
    const alternateType = getTypeAnnotationForExpression(alternatePath, state, errorOnMissingType);
    return t.unionTypeAnnotation([consequentType, alternateType]);
  } else if (t.isLogicalExpression(node)) {
    const leftPath = path.get("left");
    const rightPath = path.get("right");

    const leftType = getTypeAnnotationForExpression(leftPath, state, errorOnMissingType);
    const rightType = getTypeAnnotationForExpression(rightPath, state, errorOnMissingType);
    return t.unionTypeAnnotation([leftType, rightType]);
  } else if (t.isCallExpression(node)) {
    if (
      isFbCxCall(path, state) ||
      isFbCxRequireCall(path, state) ||
      isFbtRequireCall(path, state) ||
      isFbtCall(path, state)
    ) {
      return t.stringTypeAnnotation();
    } else if (isReactHook(path, state)) {
      if (
        (t.isMemberExpression(node.callee) &&
          t.isIdentifier(node.callee.property) &&
          node.callee.property.name === "useState") ||
        (t.isIdentifier(node.callee) && node.callee.name === "useState")
      ) {
        const firstArgumentOfUseState = path.get("arguments")[0];
        if (firstArgumentOfUseState !== undefined) {
          return getTypeAnnotationForExpression(firstArgumentOfUseState, state, errorOnMissingType);
        }
      }
    }
    if (isArrayConstructor(path, state)) {
      return t.genericTypeAnnotation(t.identifier("Array"));
    }
    let calleePath = path.get("callee");
    let calleeType = getTypeAnnotationForExpression(calleePath, state, errorOnMissingType);

    if (t.isGenericTypeAnnotation(calleeType)) {
      calleePath = getReferenceFromExpression(path.get("callee"), state);
      calleeType = getTypeAnnotationForExpression(calleePath, state, errorOnMissingType);
      return calleeType;
    } else if (t.isFunctionTypeAnnotation(calleeType)) {
      if (calleeType.returnType !== undefined) {
        return calleeType.returnType;
      }
    }
    return calleeType;
  } else if (
    t.isObjectMethod(node) ||
    t.isFunctionDeclaration(node) ||
    t.isFunctionExpression(node) ||
    t.isArrowFunctionExpression(node)
  ) {
    const returnType = node.returnType;

    if (returnType != null) {
      return returnType.typeAnnotation;
    }
  } else if (t.isBinaryExpression(node)) {
    const leftPath = path.get("left");
    const rightPath = path.get("right");
    const leftExpression = getReferenceFromExpression(leftPath, state);
    const rightExpression = getReferenceFromExpression(rightPath, state);
    const operator = node.operator;
    // Check if either side is string literal, as this is shorthand for string concat
    if (operator === "+") {
      if (t.isStringLiteral(leftExpression.node) || t.isStringLiteral(rightExpression.node)) {
        return t.stringTypeAnnotation();
      } else if (t.isNumericLiteral(leftExpression.node) && t.isNumericLiteral(rightExpression.node)) {
        return t.numberTypeAnnotation();
      }
      const leftAnnotation = getTypeAnnotationForExpression(leftPath, state);
      const rightAnnotation = getTypeAnnotationForExpression(rightPath, state);
      if (t.isStringTypeAnnotation(leftAnnotation) || t.isStringTypeAnnotation(rightAnnotation)) {
        return t.stringTypeAnnotation();
      }
      invariant(false, "TODO");
    } else if (
      operator === "instanceof" ||
      operator === "in" ||
      operator === "!=" ||
      operator === "!==" ||
      operator === "==" ||
      operator === "==="
    ) {
      return t.booleanTypeAnnotation();
    } else {
      invariant(false, "TODO");
    }
  } else if (t.isUpdateExpression(node)) {
    const operator = node.operator;
    if (operator === "++" || operator === "--") {
      return t.numberTypeAnnotation();
    }
    invariant(false, "TODO");
  } else if (t.isUnaryExpression(node)) {
    const operator = node.operator;
    if (operator === "!" || operator === "delete") {
      return t.booleanTypeAnnotation();
    } else if (operator === "+" || operator === "-" || operator === "++" || operator === "--" || operator === "~") {
      return t.numberTypeAnnotation();
    } else if (operator === "typeof") {
      return t.stringTypeAnnotation();
    } else if (operator === "void") {
      return t.voidTypeAnnotation();
    }
  } else {
    invariant(false, "TODO: found Babel node type that hasn't beed added to getTypeAnnotationForExpression");
  }
  if (errorOnMissingType) {
    if (t.isIdentifier(path.node)) {
      throw new Error(
        `Missing or <any> type annotation for runtime value "${path.node.name}" at ${getCodeLocation(path.node)}`,
      );
    } else {
      getTypeAnnotationForExpression(path, state);
      throw new Error(`Missing or <any> type annotation at ${getCodeLocation(path.node)}`);
    }
  }
  return t.anyTypeAnnotation();
}

export function assertType(path, assetType, hasOneOf, state, ...types) {
  const typesSet = new Set(types);

  if (Array.isArray(assetType)) {
    for (let type of assetType) {
      const assertion = assertType(path, type, hasOneOf, state, ...types);

      if (hasOneOf) {
        if (assertion) {
          return true;
        }
      } else if (!assertion) {
        return false;
      }
    }
    return hasOneOf ? false : true;
  } else {
    switch (assetType.type) {
      case "AnyTypeAnnotation":
        break;
      case "StringTypeAnnotation":
        if (hasOneOf) {
          if (typesSet.has("STRING")) {
            return true;
          }
        } else if (!typesSet.has("STRING")) {
          return false;
        }
        break;
      case "NullLiteralTypeAnnotation":
        if (hasOneOf) {
          if (typesSet.has("NULL")) {
            return true;
          }
        } else if (!typesSet.has("NULL")) {
          return false;
        }
        break;
      case "VoidTypeAnnotation":
        if (hasOneOf) {
          if (typesSet.has("VOID")) {
            return true;
          }
        } else if (!typesSet.has("VOID")) {
          return false;
        }
        break;
      case "NumberLiteralTypeAnnotation":
      case "NumberTypeAnnotation":
        if (hasOneOf) {
          if (typesSet.has("NUMBER")) {
            return true;
          }
        } else if (!typesSet.has("NUMBER")) {
          return false;
        }
        break;
      case "BooleanTypeAnnotation":
      case "BooleanLiteralTypeAnnotation":
        if (hasOneOf) {
          if (typesSet.has("BOOLEAN")) {
            return true;
          }
        } else if (!typesSet.has("BOOLEAN")) {
          return false;
        }
        break;
      case "QualifiedTypeIdentifier":
        if (
          t.isIdentifier(assetType.qualification) &&
          t.isIdentifier(assetType.id) &&
          assetType.qualification.name === "React" &&
          assetType.id.name === "Node"
        ) {
          if (hasOneOf) {
            if (typesSet.has("REACT_NODE")) {
              return true;
            }
          } else if (!typesSet.has("REACT_NODE")) {
            return false;
          }
        }
        break;
      case "GenericTypeAnnotation":
        const typeAlias = getTypeAlias(path, assetType, state);

        if (typeAlias !== null) {
          const assertion = assertType(path, typeAlias.right, hasOneOf, state, ...types);

          if (hasOneOf) {
            if (assertion) {
              return true;
            }
          } else if (!assertion) {
            return false;
          }
          break;
        }
        const id = assetType.id;

        if (t.isQualifiedTypeIdentifier(id)) {
          const assertion = assertType(path, id, hasOneOf, state, ...types);

          if (hasOneOf) {
            if (assertion) {
              return true;
            }
          } else if (!assertion) {
            return false;
          }
        } else if (t.isIdentifier(id) && id.name === "Array") {
          const typeParameters = assetType.typeParameters;

          if (hasOneOf) {
            if (typesSet.has("ARRAY")) {
              return true;
            }
          } else if (!typesSet.has("ARRAY")) {
            return false;
          }
          if (typeParameters != null) {
            for (let param of typeParameters.params) {
              const assertion = assertType(path, param, hasOneOf, state, ...types);

              if (hasOneOf) {
                if (assertion) {
                  return true;
                }
              } else if (!assertion) {
                return false;
              }
            }
          }
          return hasOneOf ? false : true;
        }
        break;
      case "UnionTypeAnnotation":
        for (let unionType of assetType.types) {
          const assertion = assertType(path, unionType, hasOneOf, state, ...types);

          if (hasOneOf) {
            if (assertion) {
              return true;
            }
          } else if (!assertion) {
            return false;
          }
        }
        break;
      case "ObjectTypeProperty": {
        const valueAnnotation = assetType.value;
        const assertion = assertType(path, valueAnnotation, hasOneOf, state, ...types);

        if (hasOneOf) {
          if (assertion) {
            return true;
          }
        } else if (!assertion) {
          return false;
        }
        break;
      }
      case "ObjectTypeAnnotation": {
        if (hasOneOf) {
          if (typesSet.has("OBJECT")) {
            return true;
          }
        } else if (!typesSet.has("OBJECT")) {
          return false;
        }
        for (let typeProperty of assetType.properties) {
          const assertion = assertType(path, typeProperty, hasOneOf, state, ...types);

          if (hasOneOf) {
            if (assertion) {
              return true;
            }
          } else if (!assertion) {
            return false;
          }
        }
        break;
      }
      case "FunctionTypeAnnotation": {
        const returnTypeAnnotation = assetType.returnType;
        const assertion = assertType(path, returnTypeAnnotation, hasOneOf, state, ...types);

        if (hasOneOf) {
          if (assertion) {
            return true;
          }
        } else if (!assertion) {
          return false;
        }
        break;
      }
      default:
        invariant(false, "TODO");
    }
    return !hasOneOf;
  }
  return false;
}

export function isArrayTypeAnnotation(path, annotation, state) {
  if (t.isGenericTypeAnnotation(annotation)) {
    const typeAlias = getTypeAlias(path, annotation, state);

    if (typeAlias !== null) {
      annotation = typeAlias.right;
    }
    if (t.isIdentifier(annotation.id) && annotation.id.name === "Array") {
      return true;
    }
  }
  return false;
}

export function isReactNodeTypeAnnotation(path, annotation, state) {
  if (t.isGenericTypeAnnotation(annotation)) {
    const typeAlias = getTypeAlias(path, annotation, state);

    if (typeAlias !== null) {
      annotation = typeAlias.right;
    }
    if (
      t.isQualifiedTypeIdentifier(annotation.id) &&
      t.isIdentifier(annotation.id.qualification) &&
      t.isIdentifier(annotation.id.id) &&
      annotation.id.qualification.name === "React" &&
      annotation.id.id.name === "Node"
    ) {
      return true;
    }
  }
  return false;
}
