import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import login from '../views/login.vue';
import register from '../views/register.vue';
import storage from '@/services/storage';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/empview',
    name: 'EmployeeView',
    meta: {
      hasAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/components/EmployeeView.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.hasAuth) {
    if (storage.getItem('token')) {
      next()
    } else {
      next('/login');
    }
  } else {
    next();
  }
})

export default router
