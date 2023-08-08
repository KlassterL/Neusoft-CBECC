//导入mongoose模块
const mongoose=require('mongoose');
//借卖方schema对象
let buyerSchema = new mongoose.Schema({
    id:{type:String,require:true,unique:true},
    buyer_id:{type:String},
    name:{type:String},
    description:{type:String}
})
let buyerModule = mongoose.model('buyer_info',buyerSchema)
module.exports=buyerSchema