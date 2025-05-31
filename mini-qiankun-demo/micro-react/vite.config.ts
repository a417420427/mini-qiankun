import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: 'http://localhost:5175/',
  server: {
    port: 5175
  },
  build: {
    rollupOptions: {
      output: {
        format: 'umd',        // UMD格式适合微前端加载
        globals: {},
      }
    }
  },
  plugins: [react()],
  
})
