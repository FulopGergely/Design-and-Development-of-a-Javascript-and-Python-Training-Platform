import { createRouter, createWebHistory } from 'vue-router'



//views: async import
const routes = [
    { path: '/', component: () => import('@/view/pages/HomePage.vue') },
    { path: '/Teszt', component: () => import('@/view/pages/writeTest.vue') },
    { path: '/Tesztjeim', component: () => import('@/view/pages/myTest.vue') },
    { path: '/Eredmenyek', component: () => import('@/view/pages/scoreTest.vue') },
    { path: '/Tesztletrehozasa', component: () => import('@/view/pages/testMaker.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router