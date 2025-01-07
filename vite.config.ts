import fs from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: JSON.parse(fs.readFileSync('public/manifest.json', 'utf-8')),
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,vue,ts,css,html,png,svg,ico}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
    mainFields: ['browser', 'module', 'main', 'jsnext:main', 'jsnext'],
  },
})
