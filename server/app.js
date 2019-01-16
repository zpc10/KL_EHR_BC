const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const logger = require('koa-logger')

const enviroments = require('./config/enviroments.js')
const models = require("./model");

// 实例化 Koa
const app = new Koa()
// 解析请求体
app.use(bodyParser())
app.use(json());
app.use(logger());

// 引入路由分发
const router = require('./config/routers.js')
app.use(router.routes())

//Sync Database
models.sequelize.sync().then(function(){
    console.log('Nice! Database looks fine')

}).catch(function(err){
    console.log(err,"Something went wrong with the Database Update!")
});

app.on('error', function (err, ctx) {
    ctx.body = {
        success: false,
        data:ctx,
        message: err
    };
    console.log('server error', err);
});

app.listen(3004, () => {
    console.log('Koa is listening');
});

export default app