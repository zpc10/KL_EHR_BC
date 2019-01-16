module.exports = {
    // API 服务器
    SERVER : {
        port: '3003'
    },
    //数据库配置
    DB : {
        database: 'rcb-admin',
        username: 'root',
        password:'root',
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
        charset:'utf8',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    //token配置
    CHAIN: {
       is_use:false,
       api_url:"http://192.168.20.136:3000",
       jwt:{
           userOrg  : 'org1', // token 指定密钥
           userName : 'latte_zxq', // token 指定密钥
           userSecret : 'latte_zxq_20181', // token 指定密钥
       }
    }
};
