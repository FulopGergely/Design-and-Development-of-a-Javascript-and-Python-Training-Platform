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
import "primeflex/primeflex.css";
//import '@/assets/styles.scss'; egyelőre nem használom
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css'

import 'primevue/resources/themes/lara-light-teal/theme.css'
//import 'primevue/resources/themes/mdc-light-indigo/theme.css'
//import 'primevue/resources/themes/soho-light/theme.css'

import Button from "primevue/button"
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import Ripple from 'primevue/ripple';
import ProgressSpinner from 'primevue/progressspinner';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Toast from 'primevue/toast';
import Skeleton from 'primevue/skeleton';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import Toolbar from 'primevue/toolbar';
import Panel from 'primevue/panel';
import SelectButton from 'primevue/selectbutton';




const app = createApp(App)
app.use(PrimeVue, { ripple: true }); //PrimeVue
app.directive('ripple', Ripple);
app.component('Button', Button);
app.component('Menubar', Menubar);
app.component('Avatar', Avatar);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('Toast', Toast);
app.component('Skeleton', Skeleton);
app.component('InputGroup', InputGroup);
app.component('InputGroupAddon', InputGroupAddon);
app.component('Divider', Divider);
app.component('Card', Card);
app.component('Toolbar', Toolbar);
app.component('Panel', Panel);
app.component('SelectButton', SelectButton);
app.use(store) //Vuex
app.use(router) //router
app.mount('#app')





