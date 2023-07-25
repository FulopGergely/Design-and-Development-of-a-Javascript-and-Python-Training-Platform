import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { onBeforeMount } from 'vue';
import { usePython } from "usepython";

const py = usePython()

async function init() {
    await py.load();
}

onBeforeMount(() => init())

const app = createApp(App)

app.use(router)

app.mount('#app')
