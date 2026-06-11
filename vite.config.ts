import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Listen on all network interfaces so the site is reachable over the LAN
  // (e.g. from a phone via http://<your-ip>:5173) — not just localhost.
  server: {
    host: true,
  },
  preview: {
    host: true,
  },
})
