<script setup>
import { computed } from 'vue';

const logoUrl = computed(() => {
    return `layout/images/logo.svg`;
});
</script>

<template>
    <div class="layout-footer">
        <img :src="logoUrl" alt="Logo" height="20" class="mr-2" />
        <span class="font-medium mr-2">CBECC</span>
        by
        <span class="font-medium ml-2">SCAUer</span>
    </div>
</template>
<style lang="scss" scoped></style>
