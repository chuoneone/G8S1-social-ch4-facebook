import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // 讓部署在 GitHub Pages 或子資料夾能正確運作
})
