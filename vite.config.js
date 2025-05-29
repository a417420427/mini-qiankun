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
      entry: './src/index.js',
      name: 'MiniQiankun',
      fileName: 'mini-qiankun',
      formats: ['es', 'umd']
    }
  }
});
