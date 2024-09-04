import { defineConfig } from 'vite'
import postcss from './postcss.config.cjs'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/web/",
  define: {
    'process.env': process.env
  },
  css: {
    postcss,
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    outDir: 'dist', // The output directory for the build
    assetsDir: 'assets', // Directory where assets are stored
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  }
})
