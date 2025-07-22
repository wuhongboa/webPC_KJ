const dataScreenNewRouter = [
  {
    path: '/dataScreenNew',
    name: 'DataScreenNew',
    meta: {
      title: '可视化大屏dom',
      icon: 'Histogram',
    },
    component: () => import('@/views/dataScreenNew/index.vue'),
  },
]
export default dataScreenNewRouter
