import { createApp } from "vue";
import { createPinia } from "pinia";
const pinia = createPinia();
import "./style.css";
import App from "./App.vue";
import { createWebHistory, createRouter } from "vue-router";
import responsive from "./plugins/responsive";
import { lockScroll } from "./utils/helper";
import { initFirebase } from "./firebase";

const routes = [
  { path: "/", component: () => import("./pages/HomePage.vue"), name: "home" },
  {
    path: "/phim-bo",
    component: () => import("./pages/CategoryPage.vue"),
    name: "phim-bo",
  },
  {
    path: "/tv-shows",
    component: () => import("./pages/CategoryPage.vue"),
    name: "tv-shows",
  },
  {
    path: "/phim-le",
    component: () => import("./pages/CategoryPage.vue"),
    name: "phim-le",
  },
  {
    path: "/hoat-hinh",
    component: () => import("./pages/CategoryPage.vue"),
    name: "hoat-hinh",
  },
  {
    path: "/phim/:slug/:ep?",
    component: () => import("./pages/MoviePage.vue"),
    name: "phim",
    props: true,
  },
  {
    path: "/tim-kiem",
    component: () => import("./pages/SearchPage.vue"),
    name: "tim-kiem",
    query: { k: "" },
    props: true,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(() => {
  lockScroll(false);
});

initFirebase();
const app = createApp(App);
app.use(pinia).use(router).use(responsive).mount("#app");
