//导入mongoose模块
const mongoose=require('mongoose');
//品牌商schema对象
let brandSchema = new mongoose.Schema({
    id:{type:String,require:true,unique:true},
    brand_id:{type:String},
    name:{type:String},
    description:{type:String}
})
let brandModule = mongoose.model('brand_info',brandSchema)
module.exports=brandSchema