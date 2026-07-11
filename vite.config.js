import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // PWA (v3.6.0): precached app shell so the tracker survives a browser that
    // clears site data on close — install it and everything (code, fonts, icons)
    // loads from the SW cache. `autoUpdate` swaps in new deploys on next visit.
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,webmanifest}'],
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: 'P5R — 100% Phantom Chart',
        short_name: 'Phantom Chart',
        description:
          'Personal Persona 5 Royal 100% companion — day-by-day spoiler-gated walkthrough and completion tracker.',
        display: 'standalone',
        background_color: '#08050a',
        theme_color: '#08050a',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
  base: '/P5Tracker/', // REQUIRED: Must match your GitHub repository name
  server: {
    host: true,
  },
})
