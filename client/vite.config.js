import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import sass from 'sass';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
        additionalData: `@import "@/sass/styles.scss";`,
      },
    },
  },
})
