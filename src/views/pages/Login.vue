<script setup>
import { ref, computed } from 'vue';
import router from '../../router';
import authAPI from '@/api/auth';
import userAPI from '@/api/user';
import toast from '@/util/toast';
import { useAuthStore } from '@/stores/Auth';

const authStore = useAuthStore();
const submitted = ref(false);
const user_id = ref('');
const password = ref('');
const checked = ref(false);

function validateLogin() {
    submitted.value = true;
    if (user_id.value && user_id.value.trim() && password.value && password.value.trim()) {
        login();
    }
}

function login() {
    if (authAPI.login(user_id.value, password.value)) {
        localStorage.setItem('user_id', user_id.value);
        localStorage.setItem('isLogin', true);
        authStore.setInfo(userAPI.findInfo(user_id.value));
        const { name } = authStore;
        toast.success('登录成功', '欢迎回来 ' + name + ' ~');
        router.push({ path: '/' });
    }
    else {
        toast.error('登录失败', '请检查账号密码是否正确');
    }
}

</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="layout/images/logo.svg" />
                        <div class="text-900 text-3xl font-medium mb-3">跨境电商借卖平台</div>
                        <span class="text-600 font-medium">Cross-Border E-commerce Consignment Platform</span>
                    </div>

                    <div class="md:w-30rem">
                        <div class="field">
                            <label for="username1" class="block text-900 text-xl font-medium mb-2">账号</label>
                            <InputText id="username1" v-model="user_id" type="text" placeholder="请输入账号..."
                                :class="{ 'p-invalid': submitted && !user_id }" class="w-full" style="padding: 1rem" />
                            <small class="p-error" v-if="submitted && !user_id">必须填写账号</small>
                        </div>

                        <div class="field">
                            <label for="password" class="block text-900 font-medium text-xl mb-2">密码</label>
                            <Password id="password" v-model="password" placeholder="请输入密码..." :toggleMask="true"
                                :class="{ 'p-invalid': submitted && !password }" class="w-full" inputClass="w-full"
                                :inputStyle="{ padding: '1rem' }"></Password>
                            <small class="p-error" v-if="submitted && !password">必须填写密码</small>
                        </div>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme" binary class="mr-2"></Checkbox>
                                <label for="rememberme">记住我</label>
                            </div>
                            <routerLink class="font-medium no-underline ml-2 text-right cursor-pointer"
                                style="color: var(--primary-color)" to="/register">没有账号？</routerLink>
                        </div>
                        <Button @click="validateLogin" label="登录" class="w-full p-3 text-xl"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <AppConfig simple /> -->
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
