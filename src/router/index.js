import { createRouter, createWebHistory } from 'vue-router';
import todoList from "../views/todoList.vue";
import homePage from "../views/homePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage
    },
    {
      path: '/todo',
      name: 'todoList',
      component: todoList
    }
  ]
})

export default router
