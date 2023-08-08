//导入mongoose模块
const mongoose=require('mongoose');
//用户信息schema对象
let userSchema = new mongoose.Schema({
    id:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    type:{type:String,require:true}
})
let userModule = mongoose.model('user_info',userSchema)
module.exports=userSchema