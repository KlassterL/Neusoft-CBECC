//导入mongoose模块
const mongoose=require('mongoose');
//管理员schema对象
let adminSchema = new mongoose.Schema({
    id:{type:String,require:true,unique:true},
    admin_id:{type:String,require:true}
})
let adminModule = mongoose.model('admin',adminSchema)
module.exports=adminSchema