//导入mongoose模块
const mongoose=require('mongoose');
//购物车schema对象
let shopCarSchema = new mongoose.Schema({
    bvo_id:{type:String,require:true,unique:true},
    product_id:{type:String,require:true},
    amount:{type:Number,require:true,min:0}
})
let shopCarModule = mongoose.model('cart',shopCarSchema)
module.exports=shopCarSchema