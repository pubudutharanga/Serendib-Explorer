import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Serendib-Explorer/',   // ✅ important for GitHub Pages
  plugins: [react(), imagetools()],
  server: { port: 5173 },
})


