import { createRouter, createWebHistory } from 'vue-router'
import FormView from '../views/FormView.vue'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/transaction',
    name: 'FormTransaction',
    component: FormView,
  },
  {
    path: '/all',
    name: 'SearchTransactions',
    component: SearchView,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
