import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory("/asana-to-jira/"),
  routes,
});

export default router;
