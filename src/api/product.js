//本文件实现 商品信息操作 的相关代码

const products = [
    { product_id: 'pid1234', mvo_id:'mid123', name: '华为手机', price: 2588, description:'华为手机描述', category: '手机', image_url: 'https://imgservice.suning.cn/uimg1/b2c/image/CqZ1wZaOlEiS-PMCtIqTAQ.png_800w_800h_4e', stock: 4000, rating: 3 },
    { product_id: 'pid1235', mvo_id:'mid123', name: 'iphone 12', price: 2588, description:'苹果手机描述', category: '手机', image_url: 'https://img1.baidu.com/it/u=3935720528,3068057906&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500', stock: 400, rating: 4  },
    { product_id: 'pid1236', mvo_id:'mid123', name: 'oppo', price: 2588, description:'oppo手机描述', category: '手机', image_url: 'https://img1.baidu.com/it/u=1714225072,1796674006&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500', stock: 100, rating: 5  },
    { product_id: 'pid1237', mvo_id:'mid123', name: '摩托罗拉', price: 2588, description:'手机描述', category: '手机', image_url: 'https://img0.baidu.com/it/u=3904421310,976978923&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667', stock: 20, rating: 4  },

]

//添加新商品(包括名称、库存、价格、图片，以及其他信息...) 自动生成id
function addProduct(data) {
    //rating 随机生成
    //data {name, mvo_id, price, description, category, image_url, stock, rating}
    //return 新商品的随机id
    data.rating = Math.floor(Math.random()*(4))+2;
    console.log(data);
    return 'pid123123';
}

//删除商品
function deleteProduct(product_id) {
    //找到对应的product将其valid改为false
    return true;
}

//修改商品信息
function editProduct(product_id, data) {
    return true;
    //return bool
}

//查看品牌商旗下所有商品
function findAllBrandProduct(mvo_id) {
    //只查找mvo的valid为ture的商品
    return products;
//return []
}

//预览所有商品
function findAllProduct() {
    //只查找valid为ture的商品
    return products;
}

export default {
    addProduct,
    editProduct,
    deleteProduct,
    findAllBrandProduct,
    findAllProduct
}