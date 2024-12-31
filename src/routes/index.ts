import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useTransactionStore } from '../store/useStore'
import FormView from '../views/FormView.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import SearchView from '../views/SearchView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/transaction',
    name: 'FormTransaction',
    component: FormView,
    beforeEnter: (
      _to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      const { transactions } = useTransactionStore()

      if (transactions && transactions.length > 0) {
        next()
      }
      else {
        next('/')
      }
    },
  },
  {
    path: '/all',
    name: 'SearchTransactions',
    component: SearchView,
    beforeEnter: (
      _to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext,
    ) => {
      const { transactions } = useTransactionStore()

      if (transactions && transactions.length > 0) {
        next()
      }
      else {
        next('/')
      }
    },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
