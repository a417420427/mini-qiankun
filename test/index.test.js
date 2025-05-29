import { loadMicroApp, setGlobalState, onGlobalStateChange, unloadMicroApp } from '../dist/index.js';

(async () => {
  console.log('开始测试 mini-qiankun');

  // 假设你有一个运行的子应用html文件，测试时请修改 entry 路径
  const container = document.createElement('div');
  container.id = 'test-container';
  document.body.appendChild(container);

  const unload = await loadMicroApp({
    name: 'testapp',
    entry: 'http://localhost:8080/testapp.html', // 修改为你的测试子应用路径
    container
  });

  setGlobalState({ user: 'Bob' });
  onGlobalStateChange(state => {
    console.log('测试接收到全局状态:', state);
  });

  // 模拟卸载
  setTimeout(() => {
    unload();
    console.log('测试结束');
  }, 3000);
})();
