import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/solomining/',  // Basispfad für GitHub Pages (Repository-Name)
  css: {
    preprocessorOptions: {
      scss: {
        // Optional: SASS-Optionen hier konfigurieren
      }
    }
  }
})
