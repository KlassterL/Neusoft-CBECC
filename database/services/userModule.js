//导入mongoose模块
const mongoose=require('mongoose');
//用户信息schema对象
let userSchema = new mongoose.Schema({
    user_id:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    //0:管理员，1:品牌商,2:借卖方
    type:{type:Number,require:true}
})
let userModule = mongoose.model('user',userSchema)
module.exports=userSchema