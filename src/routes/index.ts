import { createRouter, createWebHistory } from "vue-router";
// vue router types
import type {
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";
import { useTransactionStore } from "../store/useStore";
import FormView from "../views/FormView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import SearchView from "../views/SearchView.vue";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    beforeEnter: (
      _to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (isAuthenticated()) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    beforeEnter: (
      _to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (isAuthenticated()) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
    beforeEnter: (
      _to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      if (isAuthenticated()) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/transaction",
    name: "FormTransaction",
    component: FormView,
    beforeEnter: (
      _to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const { transactions } = useTransactionStore();
      if (isAuthenticated()) {
        if (transactions && transactions.length > 0) {
          next();
        } else {
          next({ name: "Home" });
        }
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/all",
    name: "SearchTransactions",
    component: SearchView,
    beforeEnter: (
      _to: RouteLocationNormalized,
      _from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const { transactions } = useTransactionStore();
      if (isAuthenticated()) {
        if (transactions && transactions.length > 0) {
          next();
        } else {
          next("/");
        }
      } else {
        next("/login");
      }
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
