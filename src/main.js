import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import { createPinia } from 'pinia';
import '@/assets/styles/main.scss';

const app = createApp(App)

app.use(createPinia())
app.use(router) // Use the router

app.mount('#app')
