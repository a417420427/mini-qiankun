import { globalState, setGlobalState, onGlobalStateChange } from './global-state';
import { createSandbox } from './sandbox';

async function fetchHTML(url) {
  const res = await fetch(url);
  return res.text();
}

function parseHTML(html, entry) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const body = doc.body.innerHTML;
  const scripts = [...doc.querySelectorAll('script')];
  const inlineScripts = scripts.filter(s => !s.src).map(s => s.textContent);
  let externalScripts = scripts.filter(s => s.src).map(s => s.src);

  if (entry) {
    // 解析 entry URL
    const entryUrl = new URL(entry);
    externalScripts = externalScripts.map(src => {
      try {
        const url = new URL(src, entry);
        // 替换端口为 entry 的端口
        url.port = entryUrl.port;
        return url.href;
      } catch {
        // 不是合法 URL，保持原样
        return src;
      }
    });
  }

  return { body, inlineScripts, externalScripts };
}


async function loadExternalScripts(urls, sandbox, entry) {
  console.log('loadExternalScripts', urls, sandbox, entry);
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

  console.log(entry, container, useSandbox);
  const html = await fetchHTML(entry);
  const { body, inlineScripts, externalScripts } = parseHTML(html, entry);
  console.log(body, inlineScripts, externalScripts)
  container.innerHTML = body;

  const sandbox = useSandbox ? createSandbox() : window;

  await loadExternalScripts(externalScripts, sandbox, entry);
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
