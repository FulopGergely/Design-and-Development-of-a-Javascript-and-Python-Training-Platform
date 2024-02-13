import { createRouter, createWebHistory } from 'vue-router'



//views: async import
const routes = [
    { path: '/', component: () => import('@/view/pages/HomePage.vue') },
    { path: '/Admin/Teszt', component: () => import('@/view/pages/writeTest.vue') },
    { path: '/Admin/Tesztjeim', component: () => import('@/view/pages/myTest.vue') },
    { path: '/Admin/Eredmenyek', component: () => import('@/view/pages/scoreTest.vue') },
    { path: '/Admin/Tesztletrehozasa', component: () => import('@/view/pages/testMaker.vue') },
    { path: '/Admin/Profil', component: () => import('@/view/pages/profil.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router