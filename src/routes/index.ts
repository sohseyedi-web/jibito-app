import HomeView from "../views/HomeView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
