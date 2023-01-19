import Vue from 'vue'
import App from './App.vue'
import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import GoogleAuth from 'vue-google-authenticator'
Vue.use(GoogleAuth, {
  client_id: '846630149718-agedp64jpcais29j9de6p2n7csok20r5.apps.googleusercontent.com'
})
Vue.googleAuth().load()
Vue.config.productionTip = false
 
Vue.use(VueAxios, axios)
Vue.use(VueKatex, { globalOptions: {} })
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
