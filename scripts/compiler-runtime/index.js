"use strict";

export const currentDispatcher = {
  current: null,
};

function resolveDispatcher() {
  const dispatcher = currentDispatcher.current;
  if (dispatcher === null) {
    throw new Error("Hooks can only be called inside the body of a function component.");
  }
  return dispatcher;
}

export function useState(initialState) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

export function useReducer(reducer, initialState, initialAction) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialState, initialAction);
}

export function createReactNode(t, v) {
  return {
    t,
    v: v || null,
  };
}
