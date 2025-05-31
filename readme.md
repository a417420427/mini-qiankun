# @a417420427/mini-qiankun

📖 Available languages: [简体中文](./README.zh.md)

🧩 A minimal micro frontend loader inspired by [qiankun](https://qiankun.umijs.org/), built with TypeScript and designed for educational and lightweight use cases.

## ✨ Features

- 📦 Load HTML-based micro frontends
- 🧰 JavaScript sandbox via `Function('sandbox', code)`
- 💥 Supports mounting/unmounting lifecycle
- ⚡ No external dependencies
- 🎯 Designed for use with Vite, React, Vue, etc.


## 📦 Installation

```bash
npm install @a417420427/mini-qiankun
```

## Usage
1. Import and use
```ts
import { loadMicroApp } from '@a417420427/mini-qiankun';

loadMicroApp({
  name: 'react-subapp',
  entry: 'http://localhost:3001',
  container: '#subapp-container'
});

```

2. Example
see 👉 mini-qiankun-demo/

## 📁 Project Structure

```bash
mini-qiankun/
├── src/
│   ├── global-state.ts  # global-state
│   ├── loader.ts        # Core: loadMicroApp implementation
│   ├── sandbox.ts       # Simple JS sandbox (Function-based)
│   └── index.js         # Public API export
├── dist/                # Built output (UMD + ESM)
├── package.json
├── vite.config.ts       # For building the library
├── tsconfig.json
└── README.md

```
