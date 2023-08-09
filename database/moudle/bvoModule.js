//导入mongoose模块
const mongoose = require('mongoose');
//借卖方schema对象
let bvoSchema = new mongoose.Schema({
    id: { type: String, require: true, unique: true },
    bvo_id: { type: String },
    name: { type: String },
    description: { type: String }
})
let bvoModule = mongoose.model('bvo_info', bvoSchema)
module.exports = bvoSchema