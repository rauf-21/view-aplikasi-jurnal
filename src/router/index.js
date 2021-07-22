import { createWebHistory, createRouter } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import Signin from '@/pages/Signin.vue';
import Signup from '@/pages/Signup.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { 
      name: 'journal'  
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/journal',
    name: 'journal',
    component: () => import('@/pages/Journal.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;