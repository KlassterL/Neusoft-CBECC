<script setup>
import { ref, onBeforeMount } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import { useAuthStore } from '../stores/Auth';

// const admin = ref([
//     {
//         label: 'Home',
//         items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
//     },
//     {
//         label: 'UI Components',
//         items: [
//             { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
//             { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
//             { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
//             { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
//             { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
//             { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
//             { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
//             { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
//             { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
//             { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
//             { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
//             { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
//             { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
//             { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
//             { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
//             { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
//         ]
//     },
//     {
//         label: 'Prime Blocks',
//         items: [
//             { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
//             { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://www.primefaces.org/primeblocks-vue', target: '_blank' }
//         ]
//     },
//     {
//         label: 'Utilities',
//         items: [
//             { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
//             { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://www.primefaces.org/primeflex/', target: '_blank' }
//         ]
//     },
//     {
//         label: 'Pages',
//         icon: 'pi pi-fw pi-briefcase',
//         to: '/pages',
//         items: [
//             {
//                 label: 'Landing',
//                 icon: 'pi pi-fw pi-globe',
//                 to: '/landing'
//             },
//             {
//                 label: 'Auth',
//                 icon: 'pi pi-fw pi-user',
//                 items: [
//                     {
//                         label: 'Login',
//                         icon: 'pi pi-fw pi-sign-in',
//                         to: '/login'
//                     },
//                     {
//                         label: 'Error',
//                         icon: 'pi pi-fw pi-times-circle',
//                         to: '/error'
//                     },
//                     {
//                         label: 'Access Denied',
//                         icon: 'pi pi-fw pi-lock',
//                         to: '/accessDenied'
//                     }
//                 ]
//             },
//             {
//                 label: 'Crud',
//                 icon: 'pi pi-fw pi-pencil',
//                 to: '/pages/crud'
//             },
//             {
//                 label: 'Timeline',
//                 icon: 'pi pi-fw pi-calendar',
//                 to: '/pages/timeline'
//             },
//             {
//                 label: 'Not Found',
//                 icon: 'pi pi-fw pi-exclamation-circle',
//                 to: '/notfound'
//             },
//             {
//                 label: 'Empty',
//                 icon: 'pi pi-fw pi-circle-off',
//                 to: '/pages/empty'
//             }
//         ]
//     },
//     {
//         label: 'Hierarchy',
//         items: [
//             {
//                 label: 'Submenu 1',
//                 icon: 'pi pi-fw pi-bookmark',
//                 items: [
//                     {
//                         label: 'Submenu 1.1',
//                         icon: 'pi pi-fw pi-bookmark',
//                         items: [
//                             { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
//                             { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
//                             { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
//                         ]
//                     },
//                     {
//                         label: 'Submenu 1.2',
//                         icon: 'pi pi-fw pi-bookmark',
//                         items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
//                     }
//                 ]
//             },
//             {
//                 label: 'Submenu 2',
//                 icon: 'pi pi-fw pi-bookmark',
//                 items: [
//                     {
//                         label: 'Submenu 2.1',
//                         icon: 'pi pi-fw pi-bookmark',
//                         items: [
//                             { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
//                             { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
//                         ]
//                     },
//                     {
//                         label: 'Submenu 2.2',
//                         icon: 'pi pi-fw pi-bookmark',
//                         items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         label: 'Get Started',
//         items: [
//             {
//                 label: 'Documentation',
//                 icon: 'pi pi-fw pi-question',
//                 to: '/documentation'
//             },
//             {
//                 label: 'View Source',
//                 icon: 'pi pi-fw pi-search',
//                 url: 'https://github.com/primefaces/sakai-vue',
//                 target: '_blank'
//             },
//             {
//                 label: 'Nuxt Version',
//                 url: 'https://github.com/primefaces/sakai-nuxt',
//                 icon: 'pi pi-fw pi-star'
//             }
//         ]
//     }
// ]);

const mvo = ref([
    {
        label: '我的',
        items: [
            { label: '主页', icon: 'pi pi-home', to: '/' },
            { label: '信息设置', icon: 'pi pi-id-card', to: '/info'},
        ]
    },
    {
        label: '业务',
        items: [
            { label: '商品管理', icon: 'pi pi-table' , to: '/manageproduct'},
            { label: '订单管理', icon: 'pi pi-server', to: '/manageorder' }
        ]
    },
    {
        label: '账户',
        items: [
            { label: '查看余额', icon: 'pi pi-wallet', to: '/balance'  }
        ]
    }
]);

const bvo = ref([
    {
        label: '我的',
        items: [
            { label: '主页', icon: 'pi pi-home', to: '/' },
            { label: '信息设置', icon: 'pi pi-id-card', to: '/info'},
        ]
    },
    {
        label: '业务',
        items: [
            { label: '订单管理', icon: 'pi pi-server', to: '/manageorder' },
            { label: '借卖商城', icon: 'pi pi-cart-plus', to: '/browseproduct' },
            { label: '购物车', icon: 'pi pi-shopping-cart', to: '/cart' }
        ]
    },
    {
        label: '账户',
        items: [
            { label: '查看余额', icon: 'pi pi-wallet', to: '/balance'  }
        ]
    }
]);

const admin = ref([
    {
        label: '我的',
        items: [
            { label: '主页', icon: 'pi pi-home', to: '/' },
            { label: '信息设置', icon: 'pi pi-id-card', to: '/info'  },
        ]
    },
    {
        label: '业务',
        items: [
            { label: '借卖商城', icon: 'pi pi-cart-plus', to: '/browseproduct' },
            { label: '平台营收', icon: 'pi pi-chart-line', to: '/revenue'  }
        ]
    }
]);

const menu = ref();

function initMenu() {
    const authStore = useAuthStore();
    if(authStore.type === 0) {
        return admin;
    }
    else if(authStore.type === 1) {
        return mvo;
    }
    else {
        return bvo;
    }
}

onBeforeMount(() => {
    menu.value = initMenu();
});

</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in menu.value" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
