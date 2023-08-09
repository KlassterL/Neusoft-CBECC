//导入mongoose模块
const mongoose=require('mongoose');
//商品schema对象
let productSchema = new mongoose.Schema({
    id:{type:String,require:true,unique:true},
    mvo_id:{type:String},
    name:{type:String},
    price:{type:Num},
    category:{type:String},
    stock:{type:Num},
    url:{type:String}
})
let productModule = mongoose.model('product_info',productSchema)
module.exports=productSchema