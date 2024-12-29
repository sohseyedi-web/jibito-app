import { createRouter, createWebHistory } from "vue-router";
import type {
  NavigationGuardNext,
  RouteRecordRaw,
  RouteLocationNormalized,
} from "vue-router";
import FormView from "../views/FormView.vue";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";
import { useTransactionStore } from "../store/useStore";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/transaction",
    name: "FormTransaction",
    component: FormView,
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const { transactions } = useTransactionStore();

      if (transactions && transactions.length > 0) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/all",
    name: "SearchTransactions",
    component: SearchView,
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const { transactions } = useTransactionStore();

      if (transactions && transactions.length > 0) {
        next();
      } else {
        next("/");
      }
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
