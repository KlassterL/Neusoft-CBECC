//本文件实现 商品信息操作 的相关代码

//添加新商品(包括名称、库存、价格、图片，以及其他信息...) 自动生成id
function addProduct(data) {
//return bool
}

//删除商品
function deleteProduct(productId, brandId) {
    //要先检查是不是品牌商所拥有的商品
    //return bool
}

//修改商品信息
function editProduct(productId, brandId, data) {
    //要先检查是不是品牌商所拥有的商品
    //return bool
}

//查看品牌商旗下所有商品
function findAllBrandProduct(brandId) {
//return []
}

//预览所有商品
function findAllProduct() {
    //return []
}

//通过关键词搜索商品
function searchProduct(text) {
    //return []

}

export default {
    addProduct,
    editProduct,
    deleteProduct,
    findAllBrandProduct,
    findAllProduct,
    searchProduct
}