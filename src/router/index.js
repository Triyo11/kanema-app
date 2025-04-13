import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home/Home.vue"),
  },
  {
    path: "/catalog/:category",
    name: "Catalog",
    component: () => import("../views/Catalog/Catalog.vue"),
    props: true,
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: () => import("../views/Detail/Detail.vue"),
    props: true,
  },
  {
    path: "/search/:query",
    name: "Search",
    component: () => import("../views/Search/Search.vue"),
    props: true,
  },
  {
    path: "/search/ai",
    name: "SearchAi",
    component: () => import("../views/Search/SearchAI.vue"),
    props: true,
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile/Profile.vue"),
    props: true,
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: () => import("../views/Favorite/Favorite.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
    // return { top: 0, behavior: "smooth" };
  }
});

export default router;
