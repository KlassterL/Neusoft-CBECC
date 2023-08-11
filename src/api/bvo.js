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

//获取bvo的购物车中所有的商品信息
function getFromCart(bvo_id) {
    //附带数量amount
    return [
        { amount: 10, product_id: 'pid1234', mvo_id:'mid123', name: '华为手机', price: 2588, description:'华为手机描述', category: '手机', image_url: 'https://imgservice.suning.cn/uimg1/b2c/image/CqZ1wZaOlEiS-PMCtIqTAQ.png_800w_800h_4e', stock: 20, rating: 3 },
        { amount: 30, product_id: 'pid1235', mvo_id:'mid123', name: 'iphone 12', price: 2588, description:'苹果手机描述', category: '手机', image_url: 'https://img1.baidu.com/it/u=3935720528,3068057906&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500', stock: 20, rating: 4  },
        { amount: 40, product_id: 'pid1237', mvo_id:'mid123', name: '摩托罗拉', price: 2588, description:'手机描述', category: '手机', image_url: 'https://img0.baidu.com/it/u=3904421310,976978923&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667', stock: 20, rating: 4  },
    
    ]
    //return []
}

//bvo将商品添加进购物车
function addToCart(bvo_id, product_id, amount) {
//return bool
    return true;
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
    getFromCart,
    addToCart,
    deleteFromCart,
    editInCart
}