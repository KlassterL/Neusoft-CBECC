<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/Auth';
import userAPI from '@/api/user';
import toast from '@/util/toast';

const authStore = useAuthStore();

const info = ref({});

onMounted(() => {
    info.value = { ...authStore };
});

const editInfo = () => {
    if(userAPI.editInfo(authStore.user_id, info.value)) {
        toast.success('更新成功','已更新账号信息');
        authStore.editInfo(info.value);
    }
    else {
        toast.error('更新失败','请稍后重试...');
    }
}

let icon = computed(() => {
    return info.value.avatar_url ? '' : 'pi pi-user';
})


</script>

<template>
    <div class="card p-fluid">
        <div class="flex flex-column align-items-center">
            <h2 class="text-center font-bold">我 的 信 息</h2>
            <div class="flex flex-column align-items-center w-30rem">
                <Avatar class="border-3 border-primary" :image="info.avatar_url" :icon="icon" shape="circle" />
                <div class="field -mb-2 col-10">
                    <label for="name">名称</label>
                    <InputText id="name" v-model="info.name" type="text" />
                </div>
                <div class="field -mb-2 col-10 ">
                    <label for="description">描述</label>
                    <Textarea id="description" v-model="info.description" autoResize rows="4" cols="30" />
                </div>
                <div class="field col-10">
                    <label for="avatar_url">头像URL</label>
                    <InputText id="avatar_url" v-model="info.avatar_url" type="text" />
                </div>
                <Button class="w-10rem" label="更新" @click="editInfo"></Button>
            </div>
        </div>
    </div>
</template>

<style>
.p-avatar.p-avatar-circle  {
    width: 10rem;
    height: 10rem;
}

.p-avatar.p-avatar-circle  .p-avatar-icon {
    font-size: 5rem;
}
</style>
