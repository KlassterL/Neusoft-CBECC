import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';

export const useAuthStore = defineStore('Auth', () => {
    //是否已登录
    let isLogin = ref(true);
    //用户对象
    const user = reactive({
        //用户类型（0：管理员、1：品牌商、2：借卖方）
        type: 0,
        //用户id
        id: undefined,
        //用户名称（管理员名、品牌商名、借卖方用户名）
        name: undefined,
    });
    //用户国家（品牌商、借卖方）
    let country = ref();
    //品牌商（店铺）id
    let brand_id = ref();
    //借卖方（店铺）id
    let buyer_id = ref();

    let role = computed(() => {
        if (user.type === 0) {
            return 'admin';
        }
        else if (user.type === 1) {
            return 'mvo';
        }
        else if (user.type === 2) {
            return 'bvo';
        }
    })

    function setIsLogin(isLogin) {
        this.isLogin = isLogin;
    }

    return { isLogin, user, country, brand_id, buyer_id, role, setIsLogin };
});
