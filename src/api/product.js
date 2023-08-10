//本文件实现 商品信息操作 的相关代码

//添加新商品(包括名称、库存、价格、图片，以及其他信息...) 自动生成id
async function addProduct(data) {
//return bool
}

//删除商品
async function deleteProduct(product_id) {
    //return bool
}

//修改商品信息
async function editProduct(product_id, data) {
    //return bool
}

//查看品牌商旗下所有商品
async function findAllBrandProduct(mvo_id) {
//return []
}

//预览所有商品
async function findAllProduct() {
    //return []
}

export default {
    addProduct,
    editProduct,
    deleteProduct,
    findAllBrandProduct,
    findAllProduct
}