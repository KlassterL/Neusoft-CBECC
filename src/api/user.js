//本文件内实现 用户通用操作 相关代码

//查看账户余额
function checkBalance(user_id) {
//return number
}

//查找用户信息
function findInfo(user_id) {
//return obj
}

//修改账号信息
function editInfo(user_id, data) {
//return bool
}

//修改账号密码
function editPassword(user_id, password) {
//return bool
}

//查看余额变动记录（返回所有余额记录）
function findAllBalanceRecord(user_id) {
//return []
}

export default {
    checkBalance,
    findInfo,
    editInfo,
    editPassword,
    findAllBalanceRecord
}