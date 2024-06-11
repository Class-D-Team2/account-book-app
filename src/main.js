
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/main.css'; // Ensure this path is correct
import './assets/base.css'; // This is likely the reference causing the issue
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
