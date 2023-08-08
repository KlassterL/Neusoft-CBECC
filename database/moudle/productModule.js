//导入mongoose模块
const mongoose=require('mongoose');
//商品schema对象
let productSchema = new mongoose.Schema({
    id:{type:String,require:true,unique:true},
    brand_id:{type:String},
    name:{type:String},
    price:{type:Num},
    category:{type:String},
    stock:{type:Num}
})
let productModule = mongoose.model('product_info',productSchema)
module.exports=productSchema