import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Search from "./components/Search.vue";
import Profile from "./components/Profile.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/search/:gamertag",
      name: "search",
      component: Search
    },
    {
      path: "/profile/:membershipId",
      name: "profile",
      component: Profile
    }
  ]
});