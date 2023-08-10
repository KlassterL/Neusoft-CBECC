//本文件内实现 借卖方 的所有操作
import product from "./product";
import order from "./order"
import user from "./user";

//查看自己的信息
function findInfo(user_id) {
    return user.findInfo(user_id);
}

//修改自己的信息
function editInfo(user_id, data) {
    return user.editInfo(user_id, data);
}

//查看所有订单（直接调用订单模块）
function findAllBVOOrder(bvo_id) {
    return order.findAllBVOOrder(bvo_id);
}

//提交订单（直接调用订单模块）
function submitOrder(bvo_id, product_id, amount) {
    return order.submitOrder(bvo_id, product_id, amount);
}

//完成订单（直接调用订单模块）
function finishOrder(order_id) {
    return order.finishOrder(order_id);
}


//完成订单（直接调用订单模块）
function cancelOrder(order_id) {
    return order.cancelOrder(order_id);
}

//查看余额（直接调用用户通用模块）
function checkBalance(user_id) {
    return user.checkBalance(user_id);
}

//查看余额变动记录（返回所有余额记录）
function findAllBalanceRecord(user_id) {
    return user.findAllBalanceRecord(user_id);
}

//预览所有商品
function findAllProduct() {
    return product.findAllProduct();
}

//bvo将商品添加进购物车
function addToCart(bvo_id, product_id, amount) {
//return bool
}

//将商品从购物车删除
function deleteFromCart(bvo_id, product_id) {
//return bool
}

//编辑在购物车中的商品数量
function editInCart(bvo_id, product_id, amount) {
//return bool
}

export default {
    findInfo,
    editInfo,
    findAllBVOOrder,
    submitOrder,
    finishOrder,
    cancelOrder,
    findAllProduct,
    checkBalance,
    findAllBalanceRecord,
    addToCart,
    deleteFromCart,
    editInCart
}