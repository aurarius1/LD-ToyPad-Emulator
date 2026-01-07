// Plugins
import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Fonts from 'unplugin-fonts/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import Layouts from 'vite-plugin-vue-layouts-next'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {}
    }
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'LD Toypad Emulator',
        short_name: 'LD Toypad',
        description: 'A tutorial on building a resilient PWA with Vue and Vite',
        theme_color: '#49494b',
        icons: [
          {
            // 2. Updated to match your actual filenames
            src: 'manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      devOptions: {
        enabled: true // Required to test PWA features on localhost
      }
    }),
    VueRouter({
      dts: 'src/typed-router.d.ts'
    }),
    Layouts(),
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        {
          pinia: ['defineStore', 'storeToRefs']
        }
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true
      },
      vueTemplate: true
    }),
    Components({
      dts: 'src/components.d.ts'
    }),
    Vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss'
      }
    }),
    Fonts({
      fontsource: {
        families: [
          {
            name: 'Roboto',
            weights: [100, 300, 400, 500, 700, 900],
            styles: ['normal', 'italic']
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: [
      'vuetify',
      'vue-router',
      'unplugin-vue-router/runtime',
      'unplugin-vue-router/data-loaders',
      'unplugin-vue-router/data-loaders/basic'
    ]
  },
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
  },
  server: {
    port: 3000,
    proxy: {
      '/socket.io': {
        target: 'http://192.168.10.6:8080',
        ws: true
      },
      '/json': {
        target: 'http://192.168.10.6:8080',
        changeOrigin: true
      },
      '/images': {
        target: 'http://192.168.10.6:8080',
        changeOrigin: true
      },
      '/character': {
        target: 'http://192.168.10.6:8080',
        changeOrigin: true
      },
      '/vehicle': {
        target: 'http://192.168.10.6:8080',
        changeOrigin: true
      },
      '/place': {
        target: 'http://192.168.10.6:8080',
        changeOrigin: true
      },
      '/remove': {
        target: 'http://192.168.10.6:8080',
        changeOrigin: true
      }
    }
  }
})
