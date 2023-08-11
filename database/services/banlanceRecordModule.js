//导入mongoose模块
const mongoose=require('mongoose');
//金额变化记录表schema对象
let amountSchema = new mongoose.Schema({
    id:{type:String,require:true,unique:true},
    user_id:{type:String,require:true},
    balance:{type:Number,min:0,require:true},
    time:{type:Date,require:true}
})
let amountModule = mongoose.model('balance_record',amountSchema)
module.exports=amountSchema