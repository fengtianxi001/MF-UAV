import { createRouter, createWebHashHistory } from 'vue-router'
import { Layout } from '@/layout'

export const routes: any[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/home/index.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [...routes],
    },
  ],
})

export default router
