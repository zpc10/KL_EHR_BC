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
    if (!params.code || !params.password) {
        statusCode = validUtils.statusCodes.paramInvalid;
    } else {
        try{
            let manager = await models.orgnization_manager.findOne({ where: {code: params.code, password:  params.password} })
            if (manager) {
                let orgnization = null
                if(enviroments.CHAIN.is_use) {
                    orgnization = await chainService.findTableByKey("orgnization", manager.orgnization_id, null)
                }else{
                    orgnization = await models.orgnization.findOne({ where: {id: manager.orgnization_id} })
                }
                if(orgnization) {
                    if(orgnization.status === 'init'){
                        statusCode = validUtils.statusCodes.orgnizationUnAuditError;
                    }else {
                        if(orgnization.status != 'normal' || manager.status != 'normal' ){
                            statusCode = validUtils.statusCodes.statusUnNormalError;
                        }else{
                            manager.password = null;
                            var is_super = false;
                            if (orgnization.code === constants.OPERATING_ORGNIZATION_CODE) {
                                is_super = true;
                            }
                            data = {
                                manager: manager,
                                orgnization: orgnization,
                                is_super: is_super
                            }
                        }
                    }
                }else{
                    statusCode = validUtils.statusCodes.serverDataError;
                }
            }else{
                statusCode = validUtils.statusCodes.codeOrPasswordError;
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
