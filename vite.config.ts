import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          fakerjs: ['@faker-js/faker']
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math"; @import "./src/styles/variables.scss"; @import "./src/styles/colors.scss"; @import "./src/styles/responsive.scss"; `
      }
    }
  }
})
