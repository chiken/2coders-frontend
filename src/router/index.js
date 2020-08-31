import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import New from "../views/New.vue";
import ShowFruit from "../views/ShowFruit.vue";
import UpdateFruit from "../views/UpdateFruit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/new",
    name: "New",
    component: New
  },
  {
    path: "/view/:id",
    name: "View",
    component: ShowFruit
  },
  {
    path: "/update/:id",
    name: "Update",
    component: UpdateFruit
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
