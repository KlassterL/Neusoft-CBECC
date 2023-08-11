//导入mongoose模块
const mongoose=require('mongoose');
//品牌商schema对象
let brandSchema = new mongoose.Schema({
    user_id:{type:String,require:true,unique:true},
    mvo_id:{type:String,require:true}
})
let brandModule = mongoose.model('mvo',brandSchema)
module.exports=brandSchema