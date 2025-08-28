import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    allowedHosts: [
      'localhost',
      'da773ee34763.ngrok-free.app' // 👈 adiciona o host do ngrok aqui
    ]
  }
})
