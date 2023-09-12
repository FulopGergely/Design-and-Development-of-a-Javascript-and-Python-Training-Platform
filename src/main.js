import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { basicSetup } from 'codemirror'
import VueCodemirror from 'vue-codemirror'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createStore } from 'vuex'

// Vuex
const index = createStore({
    state () {
        return {
            count: 0
        }
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})

const app = createApp(App)

app.use(index) //Vuex

app.use(router)

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



