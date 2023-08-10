//本文件实现 订单相关操作 的代码

//查看所有借卖方订单（根据借卖方id查）
function findAllBVOOrder(bvo_id) {
//return []
}


//查看所有品牌商订单（根据品牌商方id查）
function findAllMVOOrder(mvo_id) {
    //return []
}

//查看数据库里所有订单（管理员用）
function findAllOrders() {
//return []
}

//提交订单（生成订单id写入数据库，并设置状态为未发货0，要根据商品id查找对应品牌商id，一起写入表中）
function submitOrder(bvo_id, product_id, amount) {
//return bool
}

//订单发货（把订单状态置为已发货1）
function startOrder(order_id) {
//return bool
}

//完成订单（根据订单id，把状态置为完成2，同时要完成借卖方和品牌商的余额变化、更新金额变化记录表）
function finishOrder(order_id) {
//return bool
}

//取消订单（根据订单id，把状态置为取消-1）
function cancelOrder(order_id) {
//return bool
}

export default {
    findAllBVOOrder,
    findAllMVOOrder,
    findAllOrders,
    submitOrder,
    startOrder,
    finishOrder,
    cancelOrder
}