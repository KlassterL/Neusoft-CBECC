//本文件内实现 用户通用操作 相关代码

//查看账户余额
function checkBalance(user_id) {
    return 12345.00;
    //return number
}

//查找用户信息
function findInfo(user_id) {
    //返回对象：
    // return {user_id, name, description, avatar_url, type, admin_id/mvo_id/bvo_id}
    let type = 0;
    if(user_id === 'mvo123')
        type = 1;
    else if(user_id === 'bvo123')
        type = 2;
    return {
        user_id: user_id,
        name: '测试用户',
        description: '测试用户描述',
        avatar_url: 'https://www.neusoft.com/cn/upload/img/logo.svg',
        type: type,
        admin_id: 'testadmin1234',
        mvo_id: 'testmvo1234',
        bvo_id: 'testbvo1234'
    };
    //return obj
}

//修改账号信息
function editInfo(user_id, data) {
    console.log(user_id, data);
    return true;
    //return bool
}

//修改账号密码
function editPassword(user_id, password) {
    //return bool
}

//查看平台全部余额变动记录（返回所有余额记录）
function findAllBalanceRecord() {
    //return [{user_id, date,balance}]
    return [
        {
            user_id: 'user_id123',
            date: new Date(),
            balance: 123
        },
        {
            user_id: 'user_id124',
            date: new Date(),
            balance: 125
        },
        {
            user_id: 'user_id125',
            date: new Date(),
            balance: 102
        },
        {
            user_id: 'user_id126',
            date: new Date(),
            balance: 188
        }
    ]
}

//查看特定用户user_id余额变动记录（返回所有余额记录）
function findUserBalanceRecord(user_id) {
    //return [{date,balance}]
    return [
        {
            date: new Date(),
            balance: 123
        },
        {
            date: new Date(),
            balance: 125
        },
        {
            date: new Date(),
            balance: 102
        },
        {
            date: new Date(),
            balance: 188
        }
    ]
}

export default {
    checkBalance,
    findInfo,
    editInfo,
    editPassword,
    findUserBalanceRecord,
    findAllBalanceRecord
}