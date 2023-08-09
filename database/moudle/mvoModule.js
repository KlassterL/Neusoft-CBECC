//导入mongoose模块
const mongoose = require('mongoose');
//品牌商schema对象
let mvoSchema = new mongoose.Schema({
    id: { type: String, require: true, unique: true },
    mvo_id: { type: String },
    name: { type: String },
    description: { type: String }
})
let mvoModule = mongoose.model('mvo_info', mvoSchema)
module.exports = mvoSchema