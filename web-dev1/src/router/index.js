import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Checkout from '../components/Checkout.vue';
import Details from '../components/Details.vue';
import Success from '../components/Success.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/details/:id',
    path: '/',
    name: 'Details',
    component: Details
  },
  {
      path: '/Success',
      name: 'Success',
      component: Success
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
