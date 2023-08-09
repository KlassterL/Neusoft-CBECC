//本文件内实现 借卖方 的所有操作
import product from "./product";
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

//完成订单（直接调用订单模块）
function finishOrder(orderId) {
    return order.finishOrder(orderId);
}

//查看余额（直接调用用户通用模块）
function checkBalance(id) {
    return user.checkBalance(id);
}

//预览所有商品
function findAllProduct() {
    return product.findAllProduct();
}

//通过关键词搜索商品
function searchProduct(text) {
    return product.searchProduct(text);
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
    finishOrder,
    findAllProduct,
    checkBalance,
    searchProduct,
    addToCart,
    deleteFromCart,
    editInCart
}