import { createRouter, createWebHistory } from 'vue-router'

//views: async import
const routes = [
    { path: '/', component: () => import('@/view/pages/homePage.vue') },
    { path: '/Tesztiras', component: () => import('@/view/pages/writePage.vue') },
    { path: '/Megosztas', component: () => import('@/view/pages/shareTest.vue') },
    { path: '/Tesztjeim', component: () => import('@/view/pages/myTest.vue') },
    { path: '/Eredmenyek', component: () => import('@/view/pages/scoreTest.vue') },
    { path: '/Tesztletrehozasa', component: () => import('@/view/pages/testMaker.vue') },
    { path: '/Profil', component: () => import('@/view/pages/profil.vue') },
    { path: '/:testID', component: () => import('@/view/pages/testID.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router