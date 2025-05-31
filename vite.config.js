// vite.config.js
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    {
      name: 'copy-types',
      apply: 'build',
      closeBundle() {
        const src = path.resolve(__dirname, 'src/index.d.ts');
        const dest = path.resolve(__dirname, 'dist', 'index.d.ts');
        fs.copyFileSync(src, dest);
      }
    }
  ],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'MiniQiankun',
      formats: ['es', 'cjs'],  // 只生成这两种
      fileName: (format) => `mini-qiankun.${format}.js`
    }
  }
});
