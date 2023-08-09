//导入mongoose模块
const mongoose = require('mongoose');
//用户余额schema对象
let balanceSchema = new mongoose.Schema({
    id: { type: String, require: true, unique: true },
    user_id: { type: String },
    balance: { type: Number, min: 0 },
    time: { type: Date }
})
let balanceModule = mongoose.model('user_balance', balanceSchema)
module.exports = balanceSchema