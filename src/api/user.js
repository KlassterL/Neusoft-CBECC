//本文件内实现 用户通用操作 相关代码
import request from "@/util/request";
//查看账户余额
function checkBalance(user_id) {
    //return number
    return request({
        url: 'checkBalance',
        method: 'get',
        data: {
            user_id
        }
    });
}

//查找用户信息
function findInfo(user_id) {
    //返回对象：
    // return {user_id, name, description, avatar_url, type, admin_id/mvo_id/bvo_id}
    return request({
        url: 'findInfo',
        method: 'get',
        data: {
            user_id
        }
    });
}

//修改账号信息
function editInfo(user_id, data) {
    data.user_id = user_id;
    //return bool
    return request({
        url: 'editInfo',
        method: 'get',
        data
    });
}

//修改账号密码
function editPassword(user_id, password) {
    //return bool
}

//查看平台全部余额变动记录（返回所有余额记录）
function findAllBalanceRecord() {
    //return [{user_id, date, old_balance, balance}]
    return request({
        url: 'findAllBalanceRecord',
        method: 'get',
    });
}

//查看特定用户user_id余额变动记录（返回所有余额记录）
function findUserBalanceRecord(user_id) {
    //return [{date,old_balance, balance}]
    return request({
        url: 'findUserBalanceRecord',
        method: 'get',
        data: {
            user_id
        }
    });
}

export default {
    checkBalance,
    findInfo,
    editInfo,
    editPassword,
    findUserBalanceRecord,
    findAllBalanceRecord
}