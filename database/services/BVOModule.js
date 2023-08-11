//导入mongoose模块
const mongoose=require('mongoose');
//借卖方schema对象
let buyerSchema = new mongoose.Schema({
    user_id:{type:String,require:true,unique:true},
    bvo_id:{type:String,require:true}
})
let buyerModule = mongoose.model('bvo',buyerSchema)
module.exports=buyerSchema