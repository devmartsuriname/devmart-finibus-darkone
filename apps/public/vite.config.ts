import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  },
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer()
      ]
    },
    preprocessorOptions: {
      scss: {
        // Ensure SCSS compiles only within this app
        includePaths: [path.resolve(__dirname, './src/assets/sass')]
      }
    }
  }
})
