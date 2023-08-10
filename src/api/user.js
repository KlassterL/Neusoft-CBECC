//本文件内实现 用户通用操作 相关代码

//查看账户余额
async function checkBalance(user_id) {
//return number
}

//查找用户信息
async function findInfo(user_id) {
//return obj
}

//修改账号信息
async function editInfo(user_id, data) {
//return bool
}

//修改账号密码
async function editPassword(user_id, password) {
//return bool
}

//查看余额变动记录（返回所有余额记录）
async function findAllBalanceRecord(user_id) {
//return []
}

export default {
    checkBalance,
    findInfo,
    editInfo,
    editPassword,
    findAllBalanceRecord
}