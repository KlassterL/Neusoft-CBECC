//本文件内实现 品牌商 的所有操作

import product from "./product"

//查看品牌商自己的信息
function findInfo(brandId) {
//return bool
}

//修改品牌商自己的信息
function editInfo(brandId) {
//return bool
}

//添加新商品(包括名称、库存、价格、图片，以及其他信息...) 自动生成id
function addProduct(data) {
    return product.addProduct(data);
}

//删除商品
function deleteProduct(productId, brandId) {
    return product.deleteProduct(productId, brandId);
}

//修改商品信息
function editProduct(productId, brandId, data) {
    return product.editProduct(productId, brandId);
}

//查看品牌商旗下所有商品
function findAllBrandProduct(brandId) {
    return product.findAllBrandProduct(brandId);
}

//根据自己所有订单情况，生成近期售卖情况（选做）
function getRecentDetail(id) {
//return []
}


export default {
    findInfo,
    editInfo,
    addProduct,
    editProduct,
    findAllBrandProduct,
    deleteProduct,
    getRecentDetail
}