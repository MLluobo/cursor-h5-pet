import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import UserPage from '../views/UserPage.vue'
import LoginPage from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/user',
      name: 'user',
      component: UserPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
})

export default router
