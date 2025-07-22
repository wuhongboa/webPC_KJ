import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import pinia from './store'
import '@/styles/index.scss' // 全局样式

//rem相关
import { registerElIcons } from '@/plugins/ElIcons'
// 引入全局组件布局
import PageWrapLayout from '@/components/PageWrapLayout/index.vue'
// 权限路由
import './permission'
// svg-icons注册导入
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg component
// UI框架 element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入暗黑模式 element-plus 2.2 内置暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 自定义暗黑模式
import '@/styles/element-dark.scss'
// 引入阿里图标库
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'

const app = createApp(App)
registerElIcons(app)

app.component('SvgIcon', SvgIcon)
app.component('PageWrapLayout', PageWrapLayout)

app.use(pinia)
app.use(router)
app.use(ElementPlus).mount('#app')

// 设置根字体大小
function setRem() {
  // 设计稿宽度（根据你的设计稿尺寸调整）
  const designWidth = 1920
  // 最大宽度限制（可选）
  const maxWidth = 2560

  // 获取视口宽度
  let clientWidth = document.documentElement.clientWidth

  // 限制最大宽度
  if (clientWidth > maxWidth) {
    clientWidth = maxWidth
  }

  // 计算 rem 基准值（这里设置为设计稿宽度的 1/10，即 1rem = 192px @ 1920px）
  const rem = (clientWidth * 10) / designWidth

  // 设置根字体大小
  document.documentElement.style.fontSize = rem + 'px'
}

// 初始化
setRem()

// 监听窗口变化
window.addEventListener('resize', setRem)
