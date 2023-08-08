//本文件内实现 用户通用操作 相关代码

//查看账户余额
function checkBalance(id) {
//return number
}

//修改账号信息，要根据用户类型修改（type 0：管理员 1：品牌商 2：借卖方）
function editAccount(id, type, newData) {
//return bool
}

//修改账号密码
function editPassword(id, password) {
//return bool
}

//查看余额变动记录
function findAllBalanceRecord(id) {
//return []
}

export default {
    checkBalance,
    editAccount,
    editPassword,
    findAllBalanceRecord
}