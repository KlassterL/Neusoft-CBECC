//导入mongoose模块
const mongoose = require('mongoose');
//购物车schema对象
let cartSchema = new mongoose.Schema({
    bvo_id: { type: String, require: true, unique: true },
    product_id: { type: String },
    amount: { type: Num }
})
let cartModule = mongoose.model('cart_info', cartSchema)
module.exports = cartSchema