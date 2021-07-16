import { createApp } from 'vue';
import App from './App.vue';
import Toast from 'vue-toastification';
import router from './router';
import 'vue-toastification/dist/index.css';
import '@/styles/css/main.css';
import '@sweetalert2/theme-dark/dark.css';

const app = createApp(App);

app.use(Toast);
app.use(router);
app.mount('#app');
