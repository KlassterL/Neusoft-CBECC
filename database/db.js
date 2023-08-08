module.exports = function (success, error) {
    const mongoose = require('mongoose');
    const config = require('./config');
    const { DBHOST, DBPORT, DBNAME } = config;
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

    mongoose.set('strictQuery', true);
    //db自己处理错误函数回调
    if (typeof error !== 'function') {
        error = () => {
            console.log('数据库连接失败');
            return;
        }
    }
    mongoose.connection.once('open', () => {
        success();
    });
    mongoose.connection.once('error', () => {
        error();
    });
    mongoose.connection.once('close', () => {
        console.log('数据库关闭');
    });
}
