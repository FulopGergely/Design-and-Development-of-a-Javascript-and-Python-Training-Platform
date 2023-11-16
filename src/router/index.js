import { createRouter, createWebHistory } from 'vue-router'


import HomePage from '@/view/pages/HomePage.vue'
import myTest from '@/view/pages/myTest.vue'

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/myTest',
        name: 'myTest',
        component: myTest
    },
    ] // short for `routes: routes`
})


export default router