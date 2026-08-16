import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: true, // <- permite todos los dominios de Railway, no hay que listar
  },
  preview: {
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: true, // <- lo mismo aquí
  },
})