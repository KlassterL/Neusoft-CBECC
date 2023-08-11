//导入mongoose模块
const mongoose=require('mongoose');
//账号信息schema对象
let userInfoSchema = new mongoose.Schema({
    user_id:{type:String,require:true,unique:true},
    name:{type:String,require:true},
    balance:{type:Number,require:true,min:0},
    description:{type:String,require:true},
    avatar_url:{type:String,require:true}
})
let userInfoModule = mongoose.model('user_info',userInfoSchema)
module.exports=userInfoSchema