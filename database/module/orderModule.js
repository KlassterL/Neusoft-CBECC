//导入mongoose模块
const mongoose=require('mongoose');
//订单信息schema对象
let orderSchema = new mongoose.Schema({
    order_id:{type:String,require:true,unique:true},
    bvo_id:{type:String,require:true},
    mvo_id:{type:String,require:true},
    product_id:{type:String,require:true},
    amount:{type:Number,require:true,min:0},
    time:{type:Date,require:true},
    //0:待发货,1:已发货,2:完成,3:取消
    status:{type:Number,require:true}
})
let orderModule = mongoose.model('order',orderSchema)
module.exports=orderSchema