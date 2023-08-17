import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('Auth', () => {
    //用户对象
    //用户类型（0：管理员、1：品牌商、2：借卖方）
    const type = ref(null);
    //用户id
    const user_id = ref(null);
    //用户名称
    const name = ref(null);
    //品牌商（店铺）id
    const mvo_id = ref(null);
    //借卖方（店铺）id
    const bvo_id = ref(null);

    const description = ref(null);

    const avatar_url = ref(null);

    function editInfo(data) {
        // console.log(data);
        name.value = data.name;
        description.value = data.description;
        avatar_url.value = data.avatar_url;
    }

    function setInfo(data) {
        // console.log(data);
        user_id.value = data.user_id;
        type.value = data.type;
        name.value = data.name;
        description.value = data.description;
        avatar_url.value = data.avatar_url;
        mvo_id.value = data.mvo_id;
        bvo_id.value = data.bvo_id;
    }

    return {type, user_id, name, mvo_id, bvo_id, description, avatar_url, editInfo, setInfo };
});
