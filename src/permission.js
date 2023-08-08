import { useAuthStore } from './stores/Auth'
import router from './router';


const whiteList = ['/login', '/register', '/accessDenied', '/notfound'] //无需访问权限的页面

//全局守卫，权限检测
router.beforeEach(async (to, from, next) => {
    if (whiteList.includes(to.path)) {
        return next();
    }
    const use_authStore = useAuthStore();
    if (use_authStore.isLogin) {
        if (to.path === '/login') {
            return next({ path: '/' });
        }
        else {
            //检查有无访问权限
            // const hasPermission = to.meta.roles && !to.meta.roles.includes(use_authStore.user.type);
            // if (hasPermission) {
            //     return next();
            // }
            // else {
            //     return next({name:'accessDenied'});
            // }
            return next();
        }
    }
    else {
        //没登录的先去登录
        return next({name:'login'});
    }
})