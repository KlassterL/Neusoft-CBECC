import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'home',
                    meta: {roles:[0,1,2]},
                    component: () => import('@/views/Home.vue')
                },
                {
                    path: '/manageproduct',
                    name: 'manageproduct',
                    meta: {roles:[0,1]},
                    component: () => import('@/views/ManageProduct.vue')
                },
                {
                    path: '/manageorder',
                    name: 'manageorder',
                    meta: {roles:[0,1,2]},
                    component: () => import('@/views/ManageOrder.vue')
                },
                {
                    path: '/manageuser',
                    name: 'manageuser',
                    meta: {roles:[0]},
                    component: () => import('@/views/ManageUser.vue')
                },
                {
                    path: '/browseproduct',
                    name: 'browseproduct',
                    meta: {roles:[0,2]},
                    component: () => import('@/views/BrowseProduct.vue')
                },
                {
                    path: '/cart',
                    name: 'cart',
                    meta: {roles:[2]},
                    component: () => import('@/views/Cart.vue')
                },
                {
                    path: '/info',
                    name: 'info',
                    meta: {roles:[0,1,2]},
                    component: () => import('@/views/Info.vue')
                },
                {
                    path: '/balance',
                    name: 'balance',
                    meta: {roles:[1,2]},
                    component: () => import('@/views/Balance.vue')
                },
                {
                    path: '/revenue',
                    name: 'revenue',
                    meta: {roles:[0]},
                    component: () => import('@/views/PlatformRevenue.vue')
                }
            ]
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/pages/Register.vue')
        },
        {
            path: '/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/pages/Login.vue')
        },
        {
            path: '/accessDenied',
            name: 'accessDenied',
            component: () => import('@/views/pages/Access.vue')
        },
        {
            path: '/error',
            name: 'error',
            component: () => import('@/views/pages/Error.vue')
        }
    ]
});

export default router;
