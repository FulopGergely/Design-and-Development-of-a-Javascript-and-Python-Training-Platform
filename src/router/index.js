import { createRouter, createWebHistory } from 'vue-router'

const testID = 'asd'

//views: async import
const routes = [
    { path: '/', component: () => import('@/view/pages/homePage.vue') },
    { path: '/Admin', component: () => import('@/view/pages/myTest.vue') },
    { path: '/Admin/Megosztas', component: () => import('@/view/pages/shareTest.vue') },
    { path: '/Admin/Tesztjeim', component: () => import('@/view/pages/myTest.vue') },
    { path: '/Admin/Eredmenyek', component: () => import('@/view/pages/scoreTest.vue') },
    { path: '/Admin/Tesztletrehozasa', component: () => import('@/view/pages/testMaker.vue') },
    { path: '/Admin/Profil', component: () => import('@/view/pages/profil.vue') },
    { path: '/:testID', component: () => import('@/view/pages/testID.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})


export default router