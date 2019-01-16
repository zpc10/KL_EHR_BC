import chainService from "../service/chain-service";

const jwt = require('jsonwebtoken')
const md5 = require('MD5')
const uuid = require('node-uuid')
const enviroments = require("../config/enviroments")
const constants = require("../config/constants")
const utils = require('../util/utils')
const validUtils = require('../util/valid-utils')
const models  = require('../model');

module.exports = async (ctx, next) => {
    const params = ctx.query;
    let id = ctx.params.id
    var statusCode = validUtils.statusCodes.success
    var data = {}
    var debug = params.debug? params.debug : "false";
    if (!id ) {
        statusCode = validUtils.statusCodes.paramInvalid;
    } else {
        try{
            let orgnization = null
            if(enviroments.CHAIN.is_use || debug==="true") {
                orgnization = await chainService.findTableByKey("orgnization", id, null)
            }else{
                orgnization = await models.orgnization.find({ where: {id: id} })
            }
            data = {
                orgnization: orgnization
            }
        }catch(error){
            statusCode = validUtils.statusCodes.serverQueryError;
            console.error('error__', error)
        }
    }
    ctx.body = {
        statusCode: statusCode,
        data: data
    };
    console.info(data)
}
