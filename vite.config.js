import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})


// module.exports = {
//   chainWebpack: config => {
//     const svgRule = config.module.rule('svg');

//     // 清除已有的所有 loader。
//     // 如果你只想使用 vue-svg-loader，這一步可以省略
//     svgRule.uses.clear();

//     // 添加 vue-svg-loader
//     svgRule
//       .use('vue-svg-loader')
//       .loader('vue-svg-loader');
//   }
// };
// vue.config.js
export function chainWebpack(config) {
  const svgRule = config.module.rule('svg');

  // 清除已有的所有 loader。
  // 如果你只想使用 vue-svg-loader，这一步可以省略
  svgRule.uses.clear();

  // 添加 vue-svg-loader
  svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
}
