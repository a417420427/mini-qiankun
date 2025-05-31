# @a417420427/mini-qiankun

## 📖 语言版本： [English](./README.md)
🧩 一个极简版的微前端加载器， 方便开发者更好的理解[qiankun](https://qiankun.umijs.org/zh)，使用 TypeScript 构建，适用于学习、实验或轻量级场景。

## ✨ 特性

- 📦 支持基于 HTML 的子应用加载
- 🧰 通过 `Function('sandbox', code)` 实现 JavaScript 沙箱隔离
- 💥 支持 `bootstrap` / `mount` / `unmount` 生命周期
- ⚡ 无额外依赖，轻量快速
- 🎯 可配合 Vite、React、Vue 等任意前端框架使用

## 📦 安装

```bash
npm install @a417420427/mini-qiankun
```

##  🚀 使用方法
1. 引入并加载子应用

```ts
import { loadMicroApp } from '@a417420427/mini-qiankun';

loadMicroApp({
  name: 'react-subapp',
  entry: 'http://localhost:3001',
  container: '#subapp-container'
});


```

2. 示例项目
完整用例请查看 👉 mini-qiankun-demo/
该示例包含：
- 主应用：Vue + Vite
- 子应用 1：HTML + JS
- 子应用 2：React + Vite

📁 项目结构

```bash

mini-qiankun/
├── src/
│   ├── global-state.ts  # 全局状态管理模块
│   ├── loader.ts        # 核心逻辑：loadMicroApp 实现
│   ├── sandbox.ts       # JS 沙箱：Function 封装
│   └── index.ts         # 对外导出的 API
├── dist/                # 构建产物（UMD + ESM）
├── package.json
├── vite.config.ts       # Vite 构建配置
├── tsconfig.json
└── README.md

```