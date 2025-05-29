import { globalState, setGlobalState, onGlobalStateChange } from './global-state';
import { createSandbox } from './sandbox';

async function fetchHTML(url) {
  const res = await fetch(url);
  return res.text();
}

function parseHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const body = doc.body.innerHTML;
  const scripts = [...doc.querySelectorAll('script')];
  const inlineScripts = scripts.filter(s => !s.src).map(s => s.textContent);
  const externalScripts = scripts.filter(s => s.src).map(s => s.src);
  return { body, inlineScripts, externalScripts };
}

async function loadExternalScripts(urls, sandbox) {
  for (const src of urls) {
    const code = await fetch(src).then(res => res.text());
    new Function('sandbox', `with(sandbox){${code}}`)(sandbox);
  }
}

function runInlineScripts(scripts, sandbox) {
  scripts.forEach(code => {
    new Function('sandbox', `with(sandbox){${code}}`)(sandbox);
  });
}

export async function loadMicroApp({ entry, container, sandbox: useSandbox = true }) {
  const html = await fetchHTML(entry);
  const { body, inlineScripts, externalScripts } = parseHTML(html);

  container.innerHTML = body;

  const sandbox = useSandbox ? createSandbox() : window;

  await loadExternalScripts(externalScripts, sandbox);
  runInlineScripts(inlineScripts, sandbox);

  if (typeof sandbox.mount === 'function') {
    sandbox.mount({
      container,
      globalState,
      setGlobalState,
      onGlobalStateChange
    });
  }

  return () => {
    if (typeof sandbox.unmount === 'function') {
      sandbox.unmount();
    }
    container.innerHTML = '';
  };
}
