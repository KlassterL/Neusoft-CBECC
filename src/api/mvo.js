//本文件内实现 品牌商 的所有操作

import production from "./production"

//查看品牌商自己的信息
function findInfo(brandId) {
//return bool
}

//修改品牌商自己的信息
function editInfo(brandId) {
//return bool
}

//添加新商品(包括名称、库存、价格、图片，以及其他信息...) 自动生成id
function addProduction(data) {
    return production.addProduction(data);
}

//删除商品
function deleteProduction(productionId, brandId) {
    return production.deleteProduction(productionId, brandId);
}

//修改商品信息
function editProduction(productionId, brandId, data) {
    return production.editProduction(productionId, brandId);
}

//查看品牌商旗下所有商品
function findAllBrandProduction(brandId) {
    return production.findAllBrandProduction(brandId);
}

//根据自己所有订单情况，生成近期售卖情况（选做）
function getRecentDetail(id) {
//return []
}


export default {
    findInfo,
    editInfo,
    addProduction,
    editProduction,
    findAllBrandProduction,
    deleteProduction,
    getRecentDetail
}