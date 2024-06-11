import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Create from '../pages/Create.vue';
import Update from '../pages/Update.vue';
import NotFound from '../pages/NotFound.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/create', component: Create, name: 'Create' },
  { path: '/update/:id', component: Update, name: 'Update' },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
