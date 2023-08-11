//导入mongoose模块
const mongoose=require('mongoose');
//商品schema对象
let productSchema = new mongoose.Schema({
    product_id:{type:String,require:true,unique:true},
    mvo_id:{type:String,require:true},
    name:{type:String,require:true},
    price:{type:Number,require:true,min:0},
    category:{type:String,require:true},
    stock:{type:String,require:true,min:0},
    image_url:{type:String,require:true}
})
let productModule = mongoose.model('product',productSchema)
module.exports=productSchema