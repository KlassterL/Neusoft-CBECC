import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';

export const useAuthStore = defineStore('Auth', () => {
    //是否已登录
    let isLogin = ref(true);
    //用户对象
    //用户类型（0：管理员、1：品牌商、2：借卖方）
    let type = ref(1);
    //用户id
    let user_id = ref();
    //用户名称
    let name = ref();
    //品牌商（店铺）id
    let mvo_id = ref();
    //借卖方（店铺）id
    let bvo_id = ref();

    function setIsLogin(isLogin) {
        this.isLogin = isLogin;
    }

    return { isLogin, type, user_id, name, mvo_id, bvo_id, setIsLogin };
});
