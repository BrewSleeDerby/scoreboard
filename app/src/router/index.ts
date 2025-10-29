import { createRouter, createWebHistory } from 'vue-router'
import ControlView from '../views/ControlView.vue'
import ScoreView from '../views/ScoreView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'control',
      component: ControlView,
      meta: {
        title: 'ARD Control Panel',
      }
    },
    {
      path: '/board',
      name: 'board',
      component: ScoreView,
      meta: {
        title: 'ARD Scoreboard',
      },
    },
  ],
})

const DEFAULT_TITLE = 'ARD Scoreboard';
router.beforeEach((to) => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

export default router
