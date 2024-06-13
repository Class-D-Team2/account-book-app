import { createApp } from 'vue';

import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';

import Vuetify from './plugins/vuetify';

const app = createApp(App);
const pinia = createPinia();
const pinia = createPinia();

app.use(pinia);
app.use(Vuetify);
app.use(router);
app.use(pinia);
app.mount('#app');
