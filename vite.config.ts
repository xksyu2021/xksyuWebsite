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
              'script-src': [
                  "self",
                  "unsafe-inline",
                  "https://www.googletagmanager.com",
                  "https://www.google-analytics.com"
              ],
              'base-uri': ["self"],     // 限制 <base> 标签只能指向自己
              'form-action': ["self"],
              'style-src': ["self", "unsafe-inline"],
              'img-src': ["self", "data:", "https:", "https://www.google-analytics.com"],
              'connect-src': [
                  "self",
                  "https://www.google-analytics.com"
              ],
              'font-src': ["self", "https://fonts.gstatic.com"],
              'object-src': ["none"],
              'worker-src': ["self", "blob:"],
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