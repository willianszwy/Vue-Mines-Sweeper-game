import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  plugins: [vue()],
  base: '/vue-minesweeper/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 8080,
    open: true
  }
})