//本文件内实现 管理员 的所有操作
import request from '@/util/request';
import user from "./user";
import order from "./order";
import product from './product';

//查看所有品牌商（独立一张表）
function findAllMVO() {
    //return [{user_id,mvo_id,name,balance,avatar_url}]
    return request({
        url: '/findAllMVO',
        method: 'post'
    })
}

//查看所有借卖方（独立一张表）
function findAllBVO() {
//return [{user_id,bvo_id,name,balance,avatar_url}]
    return request({
        url: '/findAllBVO',
        method: 'post'
    })
}

//修改用户密码（调用user模块）
function editPassword(id, password) {
    return user.editPassword(id,password);
}

//查看所有订单
function findAllOrders() {
    return order.findAllOrders();
}

function findAllProduct() {
    return product.findAllProduct();
}

export default {
    findAllMVO,
    findAllBVO,
    editPassword,
    findAllOrders,
    findAllProduct
}