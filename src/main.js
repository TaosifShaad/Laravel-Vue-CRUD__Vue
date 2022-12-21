import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App).use(router);
app.config.globalProperties.globalVar = localStorage.getItem('user')? true : false;
app.mount('#app');
