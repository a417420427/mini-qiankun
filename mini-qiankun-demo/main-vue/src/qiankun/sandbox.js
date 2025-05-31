export function createSandbox() {
  const fakeWindow = Object.create(null);
  return new Proxy(fakeWindow, {
    get(target, prop) {
      if (prop === 'window' || prop === 'self') return this;
      if (prop in target) return target[prop];
      return window[prop];
    },
    set(target, prop, val) {
      target[prop] = val;
      return true;
    },
    has(target, prop) {
      return prop in target || prop in window;
    }
  });
}
