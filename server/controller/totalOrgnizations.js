const jwt = require('jsonwebtoken')
const md5 = require('MD5')
const uuid = require('node-uuid')
const enviroments = require("../config/enviroments")
const constants = require("../config/constants")
const utils = require('../util/utils')
const validUtils = require('../util/valid-utils')
const models  = require('../model');
import chainService from '../service/chain-service.js'

module.exports = async (ctx, next) => {
    const params = ctx.query;
    var statusCode = validUtils.statusCodes.success
    var data = {}
    var debug = params.debug? params.debug : "false";
    try{
        let totalCount = 0
        if(enviroments.CHAIN.is_use || debug==="true") {
            totalCount = await chainService.totalOrgnizations()
        }else{
            totalCount = await models.orgnization.count()
        }
        data = {
            totalCount: totalCount,
        }
    }catch(error){
        statusCode = validUtils.statusCodes.serverQueryError;
        console.error('error__', error)
    }
    ctx.body = {
        statusCode: statusCode,
        data: data
    };
    console.info(data);
}
