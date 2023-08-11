//导入mongoose模块
const mongoose=require('mongoose');
//借卖方schema对象
let bvoSchema = new mongoose.Schema({
    user_id:{type:String,require:true,unique:true},
    bvo_id:{type:String,require:true}
})
let bvoModule = mongoose.model('bvo',bvoSchema)
module.exports=bvoSchema