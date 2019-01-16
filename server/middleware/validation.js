const jwt = require('jsonwebtoken')
const enviroments = require('../config/enviroments.js')

module.exports = async function (ctx, next) {
    try {
        var profile = jwt.verify(ctx.request.header.token || ctx.request.body.token, enviroments.JWT.secret);
        if (Date().now() - profile.original_iat  >  enviroments.JWT.expiresIn) { // iat == issued at
            ctx.status = 401
            ctx.body = {
                code: -1,
                error: { message: 'Access Forbidden'}
            }
        }else{
            // 调用下一个 middleware
            await next()
        }
    } catch (e) {
        // 设置状态码为 200 - 服务端错误
        ctx.status = 500
        // 输出详细的错误信息
        ctx.body = {
            code: -1,
            error: e && e.message ? e.message : e.toString()
        }
    }
}
