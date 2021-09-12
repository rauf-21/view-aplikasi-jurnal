import { createWebHistory, createRouter } from 'vue-router';

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
    component: () => import('@/pages/Signin.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/pages/Signup.vue')
  },
  {
    path: '/journal',
    name: 'journal',
    component: () => import('@/pages/Journal.vue')
  },
  {
    path: '/evaluation',
    name: 'evaluation',
    component: () => import('@/pages/Evaluation.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;