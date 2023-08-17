//本文件下实现所有 账号相关 的代码
import request from '@/util/request';

function login(user_id, password) {
//return bool
    return request({
        url: '/login',
        method: 'post',
        data: {
            user_id,
            password
        }
    })
}

//type 0：管理员 1：品牌商 2：借卖方
function register(user_id, password, type, name, avatar_url) {
    //注册要检查是否id重复等。。
    //根据type同步写入不同的表，admin_id、bvo_id、mvo_id自动生成
    //品牌商、借卖方用户可以设置一些初始金额
    //return bool
    console.log(user_id, password, type, name, avatar_url);
    return request({
        url: '/register',
        method: 'post',
        data: {
            user_id,
            password,
            type,
            name,
            avatar_url,
            balance: 5000
        }
    });
}

export default {
    login, register
}