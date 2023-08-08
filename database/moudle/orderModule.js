//导入mongoose模块
const mongoose=require('mongoose');
//订单信息schema对象
let orderSchema = new mongoose.Schema({
    id:{type:String,require:true,unique:true},
    buyer_id:{type:String},
    time:{type:Date},
    status:{type:String}
})
let orderModule = mongoose.model('order_info',orderSchema)
module.exports=orderSchema