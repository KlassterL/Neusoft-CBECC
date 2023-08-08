//导入mongoose模块
const mongoose=require('mongoose');
//管理员信息schema对象
let adminSchema = new mongoose.Schema({
    id:{type:String,require:true,unique:true},
    name:{type:String}
})
let adminModule = mongoose.model('admin_info',adminSchema)
module.exports=adminSchema