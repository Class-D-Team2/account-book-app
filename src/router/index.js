import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import TransactionList from '@/pages/TransactionList.vue';
import Create from '@/pages/Create.vue';
import Update from '@/pages/Update.vue';
import Calendar from '@/pages/Calendar.vue';
import NotFound from '@/pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/transactions',
      component: TransactionList,
    },
    {
      path: '/transactions/create',
      component: Create,
    },
    {
      path: '/transactions/update/:id',
      component: Update,
    },
    {
      path: '/calendar',
      component: Calendar,
    },
    {
      path: '/:paths(.*)*',
      component: NotFound,
    },
  ],
});

export default router;
