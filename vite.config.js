import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [react(), imagetools()],
  base: '/Serendib-Explorer/',
  server: { port: 5173 },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // This helps with routing
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    }
  }
})
