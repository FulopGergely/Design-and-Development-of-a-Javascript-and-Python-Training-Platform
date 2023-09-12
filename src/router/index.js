import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import PagesJS from "@/components/PagesJS.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/python',
      name: 'python',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PythonView.vue')
    },
    {
      path: '/javascript',
      name: 'javascript',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/JavascriptView.vue')
    },
    {
      path: '/javascript/:pages',
      component: PagesJS,
      props: true
    },
  ]
})

export default router
