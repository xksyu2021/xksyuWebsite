import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import csp from 'vite-plugin-csp'
// @ts-ignore
import sri from 'vite-plugin-sri'

export default defineConfig({
  plugins: [vue(), sri(),
    csp(
      {
        'default-src': ["self"],
        'script-src': ["self", "unsafe-inline"],
        'style-src': ["self", "unsafe-inline"],
        'img-src': ["self", "data:", "https:"],
        'connect-src': ["self", "https://api.example.com"],
        'font-src': ["self", "https://fonts.gstatic.com"],
        'object-src': ["none"],
        'frame-ancestors': ["none"],
      },
      {
        enabled: true,
        onDev: "skip",
        hashingMethod: 'sha256',
        nonceEnabled: {
          'script-src': true,
          'style-src': true
        }
      }
    )
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})