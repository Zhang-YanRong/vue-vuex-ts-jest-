import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home.vue';

Vue.use(Router);

export default new Router(
  ({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/heroes',
        name: 'heroes',
        component: () => import(/* webpackChunkName: "heroes" */ './views/heroes.vue'),
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ './views/dashboard.vue'),
      },
      {
        path: '/heroDetail/:id',
        name: 'heroDetail',
        component: () => import(/* webpackChunkName: "heroDetail" */ './views/heroDetail.vue'),
      }
    ]
  } as any)
);
