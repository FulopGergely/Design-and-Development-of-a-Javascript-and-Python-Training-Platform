import { createApp } from 'vue'
import App from './App.vue'
//bootstrap 5
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
//vuex
import store from './store'
//router
import router from './router/index.js'


const app = createApp(App)
app.use(store) //Vuex
app.use(router) //router
app.mount('#app')





