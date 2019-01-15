import { currentDispatcher } from "./index";

let firstWorkInProgressHook = null;
let currentlyRenderingComponent = null;
let isReRender = false;
let workInProgressHook = null;

function resolveCurrentlyRenderingComponent() {
  if (currentlyRenderingComponent === null) {
    throw new Error("Hooks can only be called inside the body of a function component.");
  }
  return currentlyRenderingComponent;
}

function createHook() {
  return {
    memoizedState: null,
    queue: null,
    next: null,
  };
}

function createWorkInProgressHook() {
  if (workInProgressHook === null) {
    // This is the first hook in the list
    if (firstWorkInProgressHook === null) {
      isReRender = false;
      firstWorkInProgressHook = workInProgressHook = createHook();
    } else {
      // There's already a work-in-progress. Reuse it.
      isReRender = true;
      workInProgressHook = firstWorkInProgressHook;
    }
  } else {
    if (workInProgressHook.next === null) {
      isReRender = false;
      // Append to the end of the list
      workInProgressHook = workInProgressHook.next = createHook();
    } else {
      // There's already a work-in-progress. Reuse it.
      isReRender = true;
      workInProgressHook = workInProgressHook.next;
    }
  }
  return workInProgressHook;
}

function basicStateReducer(state, action) {
  return typeof action === "function" ? action(state) : action;
}

function useReducer(reducer, initialState, initialAction) {
  currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
  workInProgressHook = createWorkInProgressHook();
  if (isReRender) {
    throw new Error("TODO");
  } else {
    if (reducer === basicStateReducer) {
      // Special case for `useState`.
      if (typeof initialState === "function") {
        initialState = initialState();
      }
    } else if (initialAction !== undefined && initialAction !== null) {
      initialState = reducer(initialState, initialAction);
    }
    workInProgressHook.memoizedState = initialState;
    const dispatch = () => {
      throw new Error("TODO");
    };
    return [workInProgressHook.memoizedState, dispatch];
  }
}

function useState(initialState) {
  return useReducer(basicStateReducer, initialState);
}

export function prepareToUseHooks(componentIdentity) {
  currentlyRenderingComponent = componentIdentity;
}

export function finishHooks() {
  firstWorkInProgressHook = null;
  currentlyRenderingComponent = null;
  isReRender = false;
  workInProgressHook = null;
}

const dispatcher = {
  useReducer,
  useState,
};

currentDispatcher.current = dispatcher;
