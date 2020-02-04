import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: Home
  // },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/pages/login/Login.vue'),
    meta: {
      middleware: { guest: true }
    }
  },
  {
    path: '/',
    component: () => import('../views/layouts/Main.vue'),
    meta: {
      middleware: { guest: true }
    },
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('../views/pages/dashboard/Dashboard.vue'),
        meta: {
          middleware: { auth: true },
        }
      },
      {
        path: '/achievement',
        name: 'achievement',
        component: () => import('../views/pages/achievement/Achievement.vue'),
        meta: {
          middleware: { auth: true },
        }
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
