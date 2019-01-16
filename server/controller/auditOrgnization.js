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
    const params = ctx.request.body;
    let id = ctx.params.id
    var statusCode = validUtils.statusCodes.success
    var data = {}
    if (!id || !params.status ) {
        statusCode = validUtils.statusCodes.paramInvalid;
    } else {
        try{
            if(enviroments.CHAIN.is_use) {
                let orgnization = await chainService.findTableByKey("orgnization", id, null)
                orgnization.status = params.status
                orgnization.dataKey = id
                await chainService.createOrUpdate('orgnization',orgnization)
            }
            let result = await models.orgnization.update({ status: params.status}, {where: {id: id}})
            data = {
                result: result
            }
        }catch(error){
            statusCode = validUtils.statusCodes.serverUpdateError;
            console.error('error__', error)
        }
    }
    ctx.body = {
        statusCode: statusCode,
        data: data
    };
    console.info(data)
}
