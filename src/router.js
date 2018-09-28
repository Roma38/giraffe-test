import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import AdForm from "./views/AdForm.vue";
import ReadAd from "./views/ReadAd.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/edit",
      name: "edit",
      component: AdForm
    },
    {
      path: "/:id",
      name: "readAd",
      component: ReadAd
    },
    {
      path: "/edit/:id",
      component: AdForm
    }
  ]
});
