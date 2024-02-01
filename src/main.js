/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store.js' //vuex
import router from './router/index.js' //router
import '@/assets/main.css'; //global my_css
//python
import { usePython } from 'usepython';
const py = usePython();
async function init() {
    await py.load();
}
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

//Quill
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


//PrimeVue
import "primeflex/primeflex.css";
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css'
import ConfirmationService from 'primevue/confirmationservice'; //confirm
import ToastService from 'primevue/toastservice'; //toast

// https://primevue.org/theming/#builtinthemes
//ezek jók:
//import 'primevue/resources/themes/lara-light-teal/theme.css'
//import 'primevue/resources/themes/soho-light/theme.css'
import 'primevue/resources/themes/soho-dark/theme.css';
//import 'primevue/resources/themes/viva-dark/theme.css';

// import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
// import 'primevue/resources/themes/bootstrap4-light-purple/theme.css';
// import 'primevue/resources/themes/md-light-indigo/theme.css';
// import 'primevue/resources/themes/md-light-deeppurple/theme.css';
// import 'primevue/resources/themes/md-dark-indigo/theme.css';
//  import 'primevue/resources/themes/md-dark-deeppurple/theme.css';
// import 'primevue/resources/themes/mdc-light-indigo/theme.css';
//  import 'primevue/resources/themes/mdc-light-deeppurple/theme.css';
// import 'primevue/resources/themes/mdc-dark-indigo/theme.css';
// import 'primevue/resources/themes/mdc-dark-deeppurple/theme.css';
// import 'primevue/resources/themes/fluent-light/theme.css';
// import 'primevue/resources/themes/lara-light-blue/theme.css';
// import 'primevue/resources/themes/lara-light-indigo/theme.css';
// import 'primevue/resources/themes/lara-light-purple/theme.css';
// import 'primevue/resources/themes/lara-light-teal/theme.css';
// import 'primevue/resources/themes/lara-light-green/theme.css';
// import 'primevue/resources/themes/lara-light-amber/theme.css';
// import 'primevue/resources/themes/lara-light-cyan/theme.css';
// import 'primevue/resources/themes/lara-light-pink/theme.css';
// import 'primevue/resources/themes/lara-dark-blue/theme.css';
// import 'primevue/resources/themes/lara-dark-indigo/theme.css';
// import 'primevue/resources/themes/lara-dark-purple/theme.css';
// import 'primevue/resources/themes/lara-dark-teal/theme.css';
// import 'primevue/resources/themes/soho-light/theme.css';
// import 'primevue/resources/themes/soho-dark/theme.css';
// import 'primevue/resources/themes/viva-light/theme.css';
// import 'primevue/resources/themes/mira/theme.css';
// import 'primevue/resources/themes/nano/theme.css';
// import 'primevue/resources/themes/saga-blue/theme.css';
// import 'primevue/resources/themes/saga-green/theme.css';
// import 'primevue/resources/themes/saga-orange/theme.css';
// import 'primevue/resources/themes/saga-purple/theme.css';
// import 'primevue/resources/themes/vela-blue/theme.css';
// import 'primevue/resources/themes/vela-green/theme.css';
// import 'primevue/resources/themes/vela-orange/theme.css';
//import 'primevue/resources/themes/vela-purple/theme.css';
// import 'primevue/resources/themes/arya-blue/theme.css';
// import 'primevue/resources/themes/arya-green/theme.css';
// import 'primevue/resources/themes/arya-orange/theme.css';
// import 'primevue/resources/themes/arya-purple/theme.css';



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
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import Checkbox from 'primevue/checkbox';
import SplitButton from 'primevue/splitbutton';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import ConfirmDialog from 'primevue/confirmdialog';
import Steps from 'primevue/steps';
import Inplace from 'primevue/inplace';
import ToggleButton from 'primevue/togglebutton';
import BlockUI from 'primevue/blockui';



const app = createApp(App)
app.component('QuillEditor', QuillEditor)//Quill
app.provide('py', py); //python
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
app.component('DataTable', DataTable); // table
app.component('Column', Column); // table
app.component('ColumnGroup', ColumnGroup); // optional
app.component('Row', Row); // optional
app.component('Checkbox', Checkbox);
app.component('SplitButton', SplitButton);
app.component('Dropdown', Dropdown);
app.component('Textarea', Textarea);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Steps', Steps);
app.component('Inplace', Inplace);
app.component('ToggleButton', ToggleButton);
app.component('BlockUI', BlockUI);



app.mount('#app')


init(); //python compiler


