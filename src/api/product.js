//本文件实现 商品信息操作 的相关代码
import request from "@/util/request";
// const products = [
//     { product_id: 'pid1234', mvo_id:'mid123', name: '华为手机', price: 2588, description:'华为手机描述', category: '手机', image_url: 'https://imgservice.suning.cn/uimg1/b2c/image/CqZ1wZaOlEiS-PMCtIqTAQ.png_800w_800h_4e', stock: 4000, rating: 3 },
//     { product_id: 'pid1235', mvo_id:'mid123', name: 'iphone 12', price: 2588, description:'苹果手机描述', category: '手机', image_url: 'https://img1.baidu.com/it/u=3935720528,3068057906&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500', stock: 400, rating: 4  },
//     { product_id: 'pid1236', mvo_id:'mid123', name: 'oppo', price: 2588, description:'oppo手机描述', category: '手机', image_url: 'https://img1.baidu.com/it/u=1714225072,1796674006&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500', stock: 100, rating: 5  },
//     { product_id: 'pid1237', mvo_id:'mid123', name: '摩托罗拉', price: 2588, description:'手机描述', category: '手机', image_url: 'https://img0.baidu.com/it/u=3904421310,976978923&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667', stock: 20, rating: 4  },

// ]

//添加新商品(包括名称、库存、价格、图片，以及其他信息...) 自动生成id
function addProduct(data) {
    //data {name, mvo_id, price, description, category, image_url, stock, rating}
    data.rating = Math.floor(Math.random()*(4))+2;
    //return 新商品的自动生成id
    return request({
        url: '/addProduct',
        method: 'post',
        data
    });
}

//删除商品
//找到对应的product将其valid改为false
function deleteProduct(product_id) {
    //return bool;
    return request({
        url: '/deleteProduct',
        method: 'post',
        data: {
            product_id
        }
    });
}

//找到id为product_id的商品并修改商品信息为data
function editProduct(product_id, data) {
    //return bool;
    data.product_id = product_id;
    return request({
        url: '/editProduct',
        method: 'post',
        data
    });
}

//查看品牌商旗下所有商品
function findAllBrandProduct(mvo_id) {
    //只查找mvo的valid为ture的商品
    //return [{product_id, name, mvo_id, price, description, category, image_url, stock, rating}];
    return request({
        url: '/findAllBrandProduct',
        method: 'post',
        data: {
            mvo_id
        }
    });
}

//预览所有商品
function findAllProduct() {
    //只查找valid为ture的商品
    //return [{product_id, name, mvo_id, price, description, category, image_url, stock, rating}];
    return request({
        url: '/findAllProduct',
        method: 'get'
    });
}

export default {
    addProduct,
    editProduct,
    deleteProduct,
    findAllBrandProduct,
    findAllProduct
}