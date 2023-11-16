import { createApp } from 'vue'
import App from './App.vue'
//vuex
import store from './store'
//router
import router from './router/index.js'
//global my_css
import '@/assets/main.css';
//PrimeVue
import PrimeVue from 'primevue/config';
import "primeicons/primeicons.css";
import 'primevue/resources/themes/lara-light-teal/theme.css'
import Button from "primevue/button"
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import Ripple from 'primevue/ripple';






const app = createApp(App)
app.use(PrimeVue, { ripple: true }); //PrimeVue
app.directive('ripple', Ripple);
app.component('Button', Button);
app.component('Menubar', Menubar);
app.component('Avatar', Avatar);
app.use(store) //Vuex
app.use(router) //router
app.mount('#app')





