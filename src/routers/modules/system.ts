/*
 * @Author: wuhongboa 1679462735@qq.com
 * @Date: 2025-06-19 13:59:14
 * @LastEditors: wuhongboa 1679462735@qq.com
 * @LastEditTime: 2025-07-01 10:09:19
 * @FilePath: \newGit\src\routers\modules\functionPage.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout/index.vue'

const systemRouter = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'Setting',
    },
    children: [
      {
        path: '/system/user',
        component: () => import('@/views/system/user/index.vue'),
        name: 'user',
        meta: { title: '用户管理', icon: 'MenuIcon' },
      },
    ],
  },
]

export default systemRouter
