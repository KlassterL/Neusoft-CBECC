//本文件内实现 借卖方 的所有操作
import product from "./product";
import order from "./order"
import user from "./user";

//查看自己的信息
async function findInfo(user_id) {
    return user.findInfo(user_id);
}

//修改自己的信息
async function editInfo(user_id, data) {
    return user.editInfo(user_id, data);
}

//查看所有订单（直接调用订单模块）
async function findAllBVOOrder(bvo_id) {
    return order.findAllBVOOrder(bvo_id);
}

//提交订单（直接调用订单模块）
async function submitOrder(bvo_id, product_id, amount) {
    return order.submitOrder(bvo_id, product_id, amount);
}

//完成订单（直接调用订单模块）
async function finishOrder(order_id) {
    return order.finishOrder(order_id);
}

//查看余额（直接调用用户通用模块）
async function checkBalance(user_id) {
    return user.checkBalance(user_id);
}

//查看余额变动记录（返回所有余额记录）
async function findAllBalanceRecord(user_id) {
    return user.findAllBalanceRecord(user_id);
}

//预览所有商品
async function findAllProduct() {
    return product.findAllProduct();
}

//bvo将商品添加进购物车
async function addToCart(bvo_id, product_id, amount) {
//return bool
}

//将商品从购物车删除
async function deleteFromCart(bvo_id, product_id) {
//return bool
}

//编辑在购物车中的商品数量
async function editInCart(bvo_id, product_id, amount) {
//return bool
}

export default {
    findInfo,
    editInfo,
    findAllBVOOrder,
    submitOrder,
    finishOrder,
    findAllProduct,
    checkBalance,
    findAllBalanceRecord,
    addToCart,
    deleteFromCart,
    editInCart
}