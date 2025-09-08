import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/my-ml-guide/",   // 👈 important for GitHub Pages
  plugins: [react()],
})
