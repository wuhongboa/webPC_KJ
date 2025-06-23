import { defineStore, createPinia } from 'pinia'
// 引入持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// id: 必须的，在所有 Store 中唯一
export const Store = defineStore('globalState', {
  // state: 返回对象的函数
  state: () => ({}),
  getters: {},
  actions: {},
  persist: {
    // 本地存储的名称
    key: 'globalState',
    //保存的位置
    storage: window.sessionStorage, //localstorage
  },
})

const pinia = createPinia()
//pinia使用
pinia.use(piniaPluginPersistedstate)
export default pinia
