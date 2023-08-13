<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useAuthStore } from '@/stores/Auth';
import toast from '@/util/toast';
import router from '@/router';

const authStore = useAuthStore();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const topbar_menu = ref();
const { onMenuToggle } = useLayout();

const items = ref([
    {
        label: '登出',
        icon: 'pi pi-sign-out',
        command: () => {
            logout();
        }
    }
])

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});


function logout() {
    toast.success('登出成功','已成功登出账号~');
    localStorage.clear();
    router.push('/login');
}

const logoUrl = computed(() => {
    // return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
    return `layout/images/logo.svg`;
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const topBarMenu = (event) => {
    topbar_menu.value.toggle(event);
}

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <div>跨境电商借卖平台</div>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <!-- <button @click="onTopBarMenuButton()" class="layout-topbar-menu-button layout-topbar-button border-2 border-primary "
            style="width: 4rem; height: 4rem;">
            <i v-if="!authStore.avatar_url" class="pi pi-user"></i>
            <img v-if="authStore.avatar_url" :src="authStore.avatar_url">
        </button> -->

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <button @click="topBarMenu" class="layout-topbar-button border-2 border-primary"
                style="width: 4rem; height: 4rem;" aria-haspopup="true" aria-controls="topbar_menu">
                <i v-if="!authStore.avatar_url" class="pi pi-user"></i>
                <img v-if="authStore.avatar_url" :src="authStore.avatar_url">
            </button>
            <Menu ref="topbar_menu" id="topbar_menu" :model="items" :popup="true" class="w-7rem" />
        </div>

    </div>
</template>

<style lang="scss" scoped></style>
