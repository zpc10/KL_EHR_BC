import chainService from "../service/chain-service";

const jwt = require('jsonwebtoken')
const md5 = require('MD5')
const enviroments = require("../config/enviroments")
const constants = require("../config/constants")
const utils = require('../util/utils')
const validUtils = require('../util/valid-utils')
const models  = require('../model');

module.exports = async (ctx, next) => {
    const params = ctx.request.body;
    var statusCode = validUtils.statusCodes.success
    var data = {}
    if (!params.code || !params.password || !params.newPassword) {
        statusCode = validUtils.statusCodes.paramInvalid;
    } else {
        try{
            let manager = await models.orgnization_manager.findOne({ where: {code: params.code, password:  params.password} })
            if (manager) {
                try{
                    let result = await models.orgnization_manager.update({ password: params.newPassword}, {where: {id: manager.id}})
                    data = {
                        result: result
                    }
                }catch(error){
                    statusCode = validUtils.statusCodes.serverUpdateError;
                    console.error('error__', error)
                }
            }else{
                statusCode = validUtils.statusCodes.oldPasswordError;
            }
        }catch(error){
            statusCode = validUtils.statusCodes.serverError;
            console.error('error__', error)
        }
    }
    ctx.body = {
        statusCode: statusCode,
        data: data
    };
    console.info(data)
}
