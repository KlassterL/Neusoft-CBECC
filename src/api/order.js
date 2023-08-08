//本文件实现 订单相关操作 的代码
//先规定订单状态：0进行中，1已完成，2已取消

//查看所有订单（根据用户id查）
function findAllOrder(id) {
//return []
}

//查看数据库里所有订单
function findAllOrders() {
//return []
}

//完成订单（根据订单id，把状态置为完成，同时要完成借卖方和品牌商的余额变化、更新金额变化记录表）
function finishOrder(orderId) {
//return bool
}

//取消订单（根据订单id，把状态置为取消）
function cancelOrder(orderId) {
//return bool
}

//提交订单（传入商品数组，每种商品有一个需求数量，生成订单id写入数据库，并设置状态为0）
//同时要将给对应品牌商的订单中添加记录
function submitOrder(list) {
//return bool
}

export default {
    findAllOrder,
    findAllOrders,
    finishOrder,
    cancelOrder,
    submitOrder
}