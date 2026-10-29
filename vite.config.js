import { defineConfig } from 'vite'
import svgr from "vite-plugin-svgr";
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const certPath = path.join(
  process.env.USERPROFILE,
  '.aspnet',
  'https',
  'localhost.pfx'
)


// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    port: 3000,
      https: {
        pfx: fs.readFileSync(certPath),
        passphrase: '123456'
      }
  }
})
