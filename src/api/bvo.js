//本文件内实现 借卖方 的所有操作
import production from "./production";
import order from "./order"
import user from "./user";

//查看自己的信息
function findInfo(id) {
//return obj
}

//修改自己的信息
function editInfo(id, data) {
    //return bool
}

//查看所有订单（直接调用订单模块）
function findAllOrder(id) {
    return order.findAllOrder(id);
}

//提交订单（直接调用订单模块）
function submitOrder(list) {
    return order.submitOrder(list);
}

//查看余额（直接调用用户通用模块）
function checkBalance(id) {
    return user.checkBalance(id);
}

//预览所有商品
function findAllProduction() {
    return production.findAllProduction();
}

//通过关键词搜索商品
function searchProduction(text) {
    return production.searchProduction(text);
}

//在购物车中，要存储商品id以及对应的数量
//将商品添加进购物车
function addToCart(id, amount) {
//return bool
}

//将商品从购物车删除
function deleteFromCart(id) {
//return bool
}

//编辑在购物车中的商品数量
function editInCart(id, amount) {
//return bool
}

export default {
    findInfo,
    editInfo,
    findAllOrder,
    submitOrder,
    findAllProduction,
    checkBalance,
    searchProduction,
    addToCart,
    deleteFromCart,
    editInCart
}