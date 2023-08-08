//本文件下实现所有 账号相关 的代码

function login(id, password) {
//return bool
}

//type 0：管理员 1：品牌商 2：借卖方
function register(id, password, type) {
    //注册要检查是否id重复等。。
    //根据type同步写入不同的表
    //用户可以设置一些初始金额
//return bool
}

function getInfo(id) {
    // const obj = {
    //     id: ,
    //     name: ,
    //     type: ,
    //     brand_id: , 如果是品牌商，就填上，否则留空
    //     buyer_id:   如果是借卖方，就填上，否则留空
    // }
    // return obj;
}

export default {
    login, register, getInfo
}