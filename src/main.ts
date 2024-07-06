import { createApp } from "vue";
import { createPinia } from "pinia";
const pinia = createPinia();
import "./style.css";
import App from "./App.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: ()=> import('./pages/HomePage.vue'), name: "home" },
  {
    path: "/phim-bo",
    component: ()=> import('./pages/CategoryPage.vue'), 
    name: "phim-bo",
  },
  {
    path: "/tv-shows",
    component: ()=> import('./pages/CategoryPage.vue'),
    name: "tv-shows",
  },
  {
    path: "/phim-le",
    component: ()=> import('./pages/CategoryPage.vue'),
    name: "phim-le",
  },
  {
    path: "/phim/:slug/:ep?",
    component: ()=> import('./pages/MoviePage.vue'),
    name: "phim",
    props: true,
  },
  {
    path: "/tim-kiem",
    component: ()=> import('./pages/SearchPage.vue'),
    name: "tim-kiem",
    query: { k : ""},
    props: true,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(pinia).use(router).mount("#app");
