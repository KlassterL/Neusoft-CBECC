//本文件实现 订单相关操作 的代码

const orders = [
    { order_id: 'oid1234', name: '华为手机', price: 2588, amount: 10, image_url: 'https://imgservice.suning.cn/uimg1/b2c/image/CqZ1wZaOlEiS-PMCtIqTAQ.png_800w_800h_4e', status: 0, time: new Date() },
    { order_id: 'oid1235', name: 'iphone 12', price: 2588, amount: 10, image_url: 'https://img1.baidu.com/it/u=3935720528,3068057906&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500', status: 0, time: new Date() },
    { order_id: 'oid1236', name: 'oppo', price: 2588, amount: 10, image_url: 'https://img1.baidu.com/it/u=1714225072,1796674006&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500', status: 0, time: new Date() },
    { order_id: 'oid1237', name: '摩托罗拉', price: 2588, amount: 10, image_url: 'https://img0.baidu.com/it/u=3904421310,976978923&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667', status: 0, time: new Date() },
];

//查看所有借卖方订单（根据借卖方id查）
function findAllBVOOrder(bvo_id) {
    //return []
}


//查看所有品牌商订单（根据品牌商方id查）
function findAllMVOOrder(mvo_id) {
    return orders;
    //return []
}

//查看数据库里所有订单（管理员用）
function findAllOrders() {
    //return []
}

//提交订单（生成订单id写入数据库，并设置状态为未发货0，要根据商品id查找对应品牌商id，一起写入表中）
function submitOrder(bvo_id, product_id, amount) {
    return true;
    //return bool
}

//订单发货（把订单状态置为已发货1）
function startOrder(order_id) {
    const order = orders.find(e => e.order_id === order_id);
    if(order) {
        return true;
    }
    return false;
    //return bool
}

//完成订单（根据订单id，把状态置为完成2，同时要完成借卖方和品牌商的余额变化、更新金额变化记录表）
function finishOrder(order_id) {
    return true;
    //return bool
}

//取消订单（根据订单id，把状态置为取消3）
function cancelOrder(order_id) {
    return true;
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