<script setup>
import { ref, computed } from 'vue';
import router from '../../router';
import authAPI from '@/api/auth';
import toast from '@/util/toast';

const submitted = ref(false);
const user_id = ref();
const password1 = ref();
const password2 = ref();
const type = ref();
const name = ref();
const description = ref();
const avatar_url = ref();

function validateRegister() {
    submitted.value = true;
    if (user_id.value && password1.value && password2.value && password1.value === password2.value && type.value && name.value) {
        register();
    }
}

function register() {
    authAPI.register(user_id.value, password1.value, type.value, name.value, description.value, avatar_url.value).then(res => {
        if(res) {
            toast.success('注册成功', '请前往登录页面进行登录');
            router.push({ path: '/login' });
        }
        else {
            toast.error('注册失败', '请检查输入内容是否正确');

        }
    })
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
                            <label for="type" class="block text-900 text-xl font-medium mb-3">用户类型</label>
                            <div class="flex justify-content-between ml-5 w-25rem">
                                <div class="flex align-items-center">
                                    <RadioButton v-model="type" inputId="mvo" name="type" value=1 />
                                    <label for="mvo" class="ml-2">品牌商(mvo)</label>
                                </div>
                                <div class="flex align-items-center">
                                    <RadioButton v-model="type" inputId="bvo" name="type" value=2 />
                                    <label for="bvo" class="ml-2">借卖方(bvo)</label>
                                </div>
                            </div>
                            <small class="p-error" v-if="submitted && !type">必须选择用户类型</small>
                        </div>

                        <div class="field">
                            <label for="user_id" class="block text-900 text-xl font-medium mb-2">账号</label>
                            <InputText id="user_id" v-model.trim="user_id" type="text" placeholder="请输入账号..."
                                required="true" :class="{ 'p-invalid': submitted && !user_id }" class="w-full"
                                style="padding: 1rem" />
                            <small class="p-error" v-if="submitted && !user_id">必须填写账号</small>
                        </div>

                        <div class="field">
                            <label for="password1" class="block text-900 font-medium text-xl mb-2">密码</label>
                            <Password id="password1" v-model="password1" placeholder="请输入密码..." :toggleMask="true"
                                :class="{ 'p-invalid': submitted && !password1 }" class="w-full"
                                inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                            <small class="p-error" v-if="submitted && !password1">必须填写密码</small>
                        </div>

                        <div class="field">
                            <label for="password2" class="block text-900 font-medium text-xl mb-2">重复密码</label>
                            <Password id="password2" v-model="password2" placeholder="请重复输入密码..." :toggleMask="true"
                                :class="{ 'p-invalid': submitted && !password2 }" class="w-full"
                                inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                            <small class="p-error" v-if="submitted && !password2">必须重复输入密码</small>
                            <small class="p-error" v-if="submitted && password2 && password1 !== password2">两次密码不一致</small>

                        </div>
                        <div class="field">
                            <label for="name" class="block text-900 font-medium text-xl mb-2">用户名</label>
                            <InputText id="name" v-model.trim="name" type="text" placeholder="请输入用户名..." class="w-full"
                                required="true" :class="{ 'p-invalid': submitted && !name }"
                                :inputStyle="{ padding: '1rem' }"></InputText>
                            <small class="p-error" v-if="submitted && !name">必须输入用户名</small>

                        </div>
                        <div class="field">
                            <label for="avatar_url" class="block text-900 font-medium text-xl mb-2">头像</label>
                            <InputText id="avatar_url" v-model.trim="avatar_url" type="text" placeholder="请输入头像URL地址..."
                                class="w-full" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></InputText>

                        </div>

                        <div class="flex align-items-center justify-content-end mb-5 gap-5">
                            <routerLink class="font-medium no-underline ml-2 text-right cursor-pointer"
                                style="color: var(--primary-color)" to="/login">已有账号？</routerLink>
                        </div>
                        <Button @click="validateRegister" label="注册" class="w-full p-3 text-xl"></Button>
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
