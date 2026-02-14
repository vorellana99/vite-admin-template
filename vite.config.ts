import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function nonBlockingCssAndPreload() {
  return {
    name: 'non-blocking-css-and-preload',
    transformIndexHtml(html: string) {
      let out = html.replace(
        /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g,
        (_, href) =>
          `<link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'">` +
          `<noscript><link rel="stylesheet" href="${href}"></noscript>`
      )
      out = out.replace(
        /<script type="module"[^>]*src="([^"]+)"[^>]*>/,
        (match, src) => {
          const preload = `<link rel="modulepreload" href="${src}">`
          return preload + '\n    ' + match
        }
      )
      return out
    },
  }
}

export default defineConfig({
  plugins: [react(), nonBlockingCssAndPreload()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/')) return 'vendor-react'
            if (id.includes('@tanstack/react-query')) return 'vendor-query'
            if (id.includes('react-router')) return 'vendor-router'
            if (id.includes('radix-ui') || id.includes('@radix-ui')) return 'vendor-ui'
          }
        },
      },
    },
    chunkSizeWarningLimit: 400,
  },
})
