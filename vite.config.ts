import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

function _resolve(dir: string) {
  return path.resolve(__dirname, dir)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    VueJsx(),
    UnoCSS(),
    VueRouter({
      extensions: ['.vue', '.md'],
      routesFolder: 'pages',
    }),
    Markdown({
      headEnabled: true,
    }),
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        '@vueuse/core',
      ],
    }),
    // https://github.com/unplugin/unplugin-vue-components
    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),
    // https://github.com/unplugin/unplugin-icons/blob/main/examples/vite-vue3/vite.config.ts
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      customCollections: {
        custom: FileSystemIconLoader(
          './src/assets/icons/text',
          (svg) => {
            // svg 是文件内容
            // 你可以在这里处理 svg 内容
            return svg.replace(/<svg /, '<svg fill="currentColor" ')
          },
        ),
      },
    }),
  ],
  resolve: {
    alias: {
      '@': _resolve('./src'),
    },
  },
})
