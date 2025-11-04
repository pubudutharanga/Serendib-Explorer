import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  // Use the exact repo name for GitHub project pages so assets resolve to:
  // https://<user>.github.io/Serendib-Explorer/...
  base: '/Serendib-Explorer/',

  plugins: [
    react(),
    imagetools()
  ],

  // Local dev server
  server: { port: 5173 },
})

