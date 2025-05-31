const globalState = {};
const listeners = new Set();

export function setGlobalState(state) {
  Object.assign(globalState, state);
  listeners.forEach(fn => fn(globalState));
}

export function onGlobalStateChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export { globalState };
