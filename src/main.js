import { createApp } from 'vue'
import App from './App.vue'
import { basicSetup } from 'codemirror'
import VueCodemirror from 'vue-codemirror'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import store from './store' //Vuex

const app = createApp(App)




app.use(store) //Vuex

app.mount('#app')

app.use(VueCodemirror, {
    // optional default global options
    autofocus: true,
    disabled: false,
    indentWithTab: true,
    tabSize: 2,
    placeholder: 'Code goes here...',
    extensions: [basicSetup]
    // ...
})



