import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import SearchList from '@/views/SearchList.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'SearchList',
    component: SearchList,
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: () => import(/* webpackChunkName: "about" */ '../views/MovieDetails.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
