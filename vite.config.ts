/*
 * @Author: wuhongboa 1679462735@qq.com
 * @Date: 2025-06-19 13:59:15
 * @LastEditors: wuhongboa 1679462735@qq.com
 * @LastEditTime: 2025-06-20 11:23:47
 * @FilePath: \newGit\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig, ConfigEnv, UserConfig } from 'vite'
import path from 'path'
// vite.config.ts中无法使用import.meta.env 所以需要引入
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 增加 vue文件 script name值
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// 生产gz文件
import viteCompression from 'vite-plugin-compression'
// 按需加载
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
//import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            whitespace: 'preserve',
            // 开启完整源码映射
            sourceMap: true,
          },
        },
      }),
      vueSetupExtend(),
      // AutoImport({
      //   resolvers: [ElementPlusResolver()],
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      // }),
      // * 使用 svg 图标
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      // gzip压缩 生产环境生成 .gz 文件
      mode === 'production' &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: 'gzip',
          ext: '.gz',
        }),
    ],
    build: {
      sourcemap: true, // 必须开启
      minify: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/index.scss" as *;`,
        },
      },
    },
    // 配置别名
    resolve: {
      alias: {
        '@': resolve('src'),
        static: resolve('public/static'),
      },
      // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    //启动服务配置
    server: {
      // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0" 也可设置成你的ip地址
      host: '0.0.0.0',
      port: 8080,
      open: true,
      https: false,
      cors: true,
      // hmr: true,
      // fs: {
      //   strict: true,
      // },
      // 代理跨域（模拟示例）
      proxy: {
        // "/api": {
        //   target: "", // easymock
        //   changeOrigin: true,
        //   rewrite: path => path.replace(/^\/api/, "")
        // }
      },
    },
    // 生产环境打包配置
    //去除 console debugger
    // esbuild: {
    //   pure:mode==='production' ? ["console.log", "debugger"] : []
    // },
  }
})
