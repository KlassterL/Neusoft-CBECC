//本文件内实现 品牌商 的所有操作

import product from "./product"
import order from "./order";
import user from "./user";

//查看自己的信息
function findInfo(user_id) {
    return user.findInfo(user_id);
}

//修改自己的信息
function editInfo(user_id, data) {
    return user.editInfo(user_id, data);
}

//添加新商品(包括名称、库存、价格、图片，以及其他信息...) 自动生成product_id
function addProduct(data) {
    return product.addProduct(data);
}

//删除商品
function deleteProduct(product_id) {
    return product.deleteProduct(product_id);
}

//修改商品信息
function editProduct(product_id, data) {
    return product.editProduct(product_id, data);
}

//查看品牌商旗下所有商品
function findAllBrandProduct(mvo_id) {
    return product.findAllBrandProduct(mvo_id);
}

//根据自己所有订单情况，生成近期售卖情况（选做）
function getRecentDetail(mvo_id) {
//return []
}


//查看自己的所有订单（根据mvo_id检索）
function findAllMVOOrder(mvo_id) {
    return order.findAllMVOOrder(mvo_id);
}

//品牌商发货，将对应订单状态设置为已发货（直接调用订单模块）
function startOrder(order_id) {
    return order.startOrder(order_id);
}

//查看余额（直接调用用户通用模块）
function checkBalance(user_id) {
    return user.checkBalance(user_id);
}

//查看余额变动记录（返回所有余额记录）
function findAllBalanceRecord(user_id) {
    return user.findAllBalanceRecord(user_id);
}

//修改账号密码
function editPassword(user_id, password) {
    return user.editPassword(user_id, password);
}

export default {
    findInfo,
    editInfo,
    addProduct,
    editProduct,
    findAllBrandProduct,
    deleteProduct,
    getRecentDetail,
    findAllMVOOrder,
    startOrder,
    checkBalance,
    findAllBalanceRecord,
    editPassword
}