import { createRouter, createWebHistory } from 'vue-router'
import ControlView from '../views/ControlView.vue'
import BoardView from '../views/BoardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'control',
      component: ControlView,
    },
    {
      path: '/board',
      name: 'board',
      component: BoardView,
    },
  ],
})

export default router
