import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';

export const useAuthStore = defineStore('Auth', () => {
    //是否已登录
    const isLogin = ref(true);
    //用户对象
    //用户类型（0：管理员、1：品牌商、2：借卖方）
    const type = ref(1);
    //用户id
    const user_id = ref();
    //用户名称
    const name = ref('用户名');
    //品牌商（店铺）id
    const mvo_id = ref();
    //借卖方（店铺）id
    const bvo_id = ref();

    const description = ref('用户描述信息');

    const avatar_url = ref('https://www.neusoft.com/cn/upload/img/logo.svg');

    function editInfo(data) {
        console.log(data);
        name.value = data.name;
        description.value = data.description;
        avatar_url.value = data.avatar_url;
    }

    function setIsLogin(isLogin) {
        this.isLogin = isLogin;
    }

    return { isLogin, type, user_id, name, mvo_id, bvo_id, description, avatar_url, editInfo, setIsLogin };
});
