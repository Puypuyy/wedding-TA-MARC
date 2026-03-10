import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/wedding-TA-MARC/',
  plugins: [react()],
  assetsInclude: ['**/*.heic', '**/*.HEIC']
})
