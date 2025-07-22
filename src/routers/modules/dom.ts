import Layout from '@/layout/index.vue'

const domRouter = [
  {
    path: '/dom',
    component: Layout,
    redirect: '/dom/svgLine',
    name: 'dom',
    meta: {
      title: '系统管理',
      icon: 'Setting',
    },
    children: [
      {
        path: '/dom/svgLine',
        component: () => import('@/views/dom/svgDom/svgLine.vue'),
        name: 'SvgLine',
        meta: { title: 'svg动画', icon: 'MenuIcon' },
      },
    ],
  },
]

export default domRouter
