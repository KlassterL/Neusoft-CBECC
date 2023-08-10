//本文件内实现 管理员 的所有操作
import user from "./user";
import order from "./order";

//查看所有品牌商（独立一张表）
function findAllMVO() {
//return []
}

//查看所有借卖方（独立一张表）
function findAllBVO() {
//return []
}

//修改用户密码（调用user模块）
function editPassword(id, password) {
    return user.editPassword(id,password);
}

//修改用户余额
function editBalance(id, newAmount) {
//return bool
}

//查看所有订单
function findAllOrders() {
    return order.findAllOrders();
}

//完成订单（直接调用订单模块）
function finishOrder(orderId) {
    return order.finishOrder(orderId);
}

export default {
    findAllMVO,
    findAllBVO,
    editPassword,
    editBalance,
    findAllOrders,
    finishOrder
}