//导入mongoose模块
const mongoose=require('mongoose');
//订单-商品关系schema对象
let orderProductSchema = new mongoose.Schema({
    order_id:{type:String,require:true,unique:true},
    product_id:{type:String},
    brand_id:{type:String},
    amount:{type:Num}
})
let orderProductModule = mongoose.model('orderProduct_relationship',orderProductSchema)
module.exports=orderProductSchema