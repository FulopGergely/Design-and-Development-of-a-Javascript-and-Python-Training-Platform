/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store.js' //vuex
import router from './router/index.js' //router
import '@/assets/main.css'; //global my_css
//highlight.js
import { CodeEditor } from "vuecodit";
import 'vuecodit/style.css';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
hljs.registerLanguage('python', python);
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
//syntax color styles:
//import "highlight.js/styles/stackoverflow-light.css";
//import "highlight.js/styles/atom-one-dark-reasonable.css"; // https://highlightjs.org/demo#lang=python&v=1&theme=atom-one-dark-reasonable&code=ZGVmIG15X2Z1bmN0aW9uKCk6CiAgcHJpbnQoIkhlbGxvIGZyb20gYSDIIiIpCiNjb21tZW50Cs05
import "highlight.js/styles/vs.css";

//PrimeVue
import "primeflex/primeflex.css";
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css'
import ConfirmationService from 'primevue/confirmationservice'; //confirm
import ToastService from 'primevue/toastservice'; //toast

// https://primevue.org/theming/#builtinthemes
//import 'primevue/resources/themes/lara-light-teal/theme.css'
//import 'primevue/resources/themes/mdc-light-indigo/theme.css'
import 'primevue/resources/themes/soho-light/theme.css'

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
import Tooltip from 'primevue/tooltip';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
import SplitButton from 'primevue/splitbutton';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import ConfirmPopup from 'primevue/confirmpopup';
import Steps from 'primevue/steps';




const app = createApp(App)

app.component('CodeEditor', CodeEditor); //highlight.js
app.use(store) //Vuex
app.use(router) //router
app.use(ConfirmationService) //PrimeVue confirm
app.use(ToastService) //PrimeVue toast


//PrimeVue
app.use(PrimeVue, { ripple: true });
app.directive('ripple', Ripple);
app.directive('tooltip', Tooltip);
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
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Checkbox', Checkbox);
app.component('SplitButton', SplitButton);
app.component('Dropdown', Dropdown);
app.component('Textarea', Textarea);
app.component('ConfirmPopup', ConfirmPopup);
app.component('Steps', Steps);



app.mount('#app')




