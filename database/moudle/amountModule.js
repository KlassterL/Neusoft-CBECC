//导入mongoose模块
const mongoose=require('mongoose');
//用户余额schema对象
let amountSchema = new mongoose.Schema({
    id:{type:String,require:true,unique:true},
    user_id:{type:String},
    amount:{type:Number,min:0},
    time:{type:Date}
})
let amountModule = mongoose.model('user_amount',amountSchema)
module.exports=amountSchema