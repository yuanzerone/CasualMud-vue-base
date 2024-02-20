import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Base/Start.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/Game/Panel.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/Game/About.vue')
    },
  ]
})

export default router
