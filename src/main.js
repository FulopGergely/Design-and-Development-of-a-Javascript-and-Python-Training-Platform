/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
//highlight.js
import { CodeEditor } from "vuecodit";
import 'vuecodit/style.css';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
hljs.registerLanguage('python', python);
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
import "highlight.js/styles/atom-one-dark.css";

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
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Editor from 'primevue/editor';




const app = createApp(App)
app.component('CodeEditor', CodeEditor); //highlight.js
app.use(store) //Vuex
app.use(router) //router



//PrimeVue
app.use(PrimeVue, { ripple: true });
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
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('Editor', Editor);

app.mount('#app')




