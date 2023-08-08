//导入mongoose模块
const mongoose=require('mongoose');
//购物车schema对象
let shopCarSchema = new mongoose.Schema({
    buyer_id:{type:String,require:true,unique:true},
    product_id:{type:String},
    amount:{type:Num}
})
let shopCarModule = mongoose.model('shopCar_info',shopCarSchema)
module.exports=shopCarSchema