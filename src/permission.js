import { useAuthStore } from './stores/Auth'
import userAPI from '@/api/user'
import router from './router';


const whiteList = ['/login', '/register', '/accessDenied', '/notfound'] //无需访问权限的页面

//全局守卫，权限检测
router.beforeEach(async (to, from, next) => {
    if (whiteList.includes(to.path)) {
        return next();
    }
    const isLogin = localStorage.getItem('isLogin');
    const authStore = useAuthStore();
    if (isLogin) {
        if(authStore.user_id === null) {
            const user_id = localStorage.getItem('user_id');
            //同步操作：等待数据返回
            let data = await userAPI.findInfo(user_id);
            authStore.setInfo(data);
        }
        //console.log(authStore);
        // 检查有无访问权限
        const hasPermission = (to.meta.roles && to.meta.roles.includes(authStore.type));
        if (hasPermission) {
            return next();
        }
        else {
            return next({name:'accessDenied'});
        }
        // return next();
    }
    else {
        //没登录的先去登录
        return next({ name: 'login' });
    }
})