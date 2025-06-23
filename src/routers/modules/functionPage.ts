/*
 * @Author: wuhongboa 1679462735@qq.com
 * @Date: 2025-06-19 13:59:14
 * @LastEditors: wuhongboa 1679462735@qq.com
 * @LastEditTime: 2025-06-23 09:06:39
 * @FilePath: \newGit\src\routers\modules\functionPage.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const functionPageRouter = [
  {
    path: '/function-page',
    component: Layout,
    redirect: '/function-page/404',
    name: 'function-page',
    meta: {
      title: '功能页面',
      icon: 'ElementPlus',
    },
    children: [
      {
        path: '/function-page/404',
        component: () => import('@/views/errorPages/404.vue'),
        name: 'function-404',
        meta: { title: '404 页面', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: '/function-page/403',
        component: () => import('@/views/errorPages/403.vue'),
        name: 'function-403',
        meta: { title: '403 页面', keepAlive: true, icon: 'MenuIcon' },
      },
      {
        path: '/function-page/fullscreen',
        component: () => import('@/views/functionPage/fullscreen/index.vue'),
        name: 'fullscreen',
        meta: { title: '元素 全屏', keepAlive: true, icon: 'MenuIcon' },
      },
    ],
  },
]

export default functionPageRouter
