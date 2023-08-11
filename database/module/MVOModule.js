//导入mongoose模块
const mongoose=require('mongoose');
//品牌商schema对象
let mvoSchema = new mongoose.Schema({
    user_id:{type:String,require:true,unique:true},
    mvo_id:{type:String,require:true}
})
let mvoModule = mongoose.model('mvo',mvoSchema)
module.exports = mvoSchema