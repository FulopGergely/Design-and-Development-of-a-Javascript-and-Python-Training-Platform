/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
//vuex
import store from './store/store.js'
//router
import router from './router/index.js'
//global my_css
import '@/assets/main.css';
//PrimeVue
//import '@/assets/styles.scss'; egyelőre nem használom
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css'
//import 'primevue/resources/themes/lara-light-teal/theme.css'
//import 'primevue/resources/themes/mdc-light-indigo/theme.css'
import 'primevue/resources/themes/soho-light/theme.css'
import Button from "primevue/button"
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import Ripple from 'primevue/ripple';
import Menu from 'primevue/menu';
import ProgressSpinner from 'primevue/progressspinner';




const app = createApp(App)
app.use(PrimeVue, { ripple: true }); //PrimeVue
app.directive('ripple', Ripple);
app.component('Button', Button);
app.component('Menubar', Menubar);
app.component('Avatar', Avatar);
app.component('Menu', Menu);
app.component('ProgressSpinner', ProgressSpinner);
app.use(store) //Vuex
app.use(router) //router
app.mount('#app')





