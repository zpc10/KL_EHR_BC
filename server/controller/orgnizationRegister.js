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
    var statusCode = validUtils.statusCodes.success
    var data = {}
    if (!params.code || !params.name || !params.password) {
        statusCode = validUtils.statusCodes.paramInvalid;
    } else {
        try{
            let orgnization = null
            if(enviroments.CHAIN.is_use) {
                //还未提供
            }else{
                orgnization = await models.orgnization.findOne({ where: {code: params.code} })
            }
            if(orgnization){
                statusCode = validUtils.statusCodes.codeExistedError;
            }else{
                orgnization = {}
                orgnization.id = uuid.v1()
                orgnization.code = params.code
                orgnization.name = params.name
                orgnization.status = 'init'
                orgnization.create_time = utils.getCurrentTime()
                if(params.phone) orgnization.phone = params.phone
                if(params.post_code) orgnization.post_code = params.post_code
                if(params.address) orgnization.address = params.address
                if(params.corp_owner_name) orgnization.corp_owner_name = params.corp_owner_name
                if(params.busi_code) orgnization.busi_code = params.busi_code
                if(params.busi_address) orgnization.busi_address = params.busi_address
                if(params.instu_code) orgnization.instu_code = params.instu_code
                if(params.tax_code) orgnization.tax_code = params.tax_code
                if(params.summary) orgnization.summary = params.summary
                if(params.linkman_name) orgnization.linkman_name = params.linkman_name
                if(params.linkman_phone) orgnization.linkman_phone = params.linkman_phone
                if(params.remark) orgnization.remark = params.remark

                let orgnization_manager = {
                    id: uuid.v1(),
                    orgnization_id: orgnization.id,
                    code: orgnization.code,
                    name: orgnization.name,
                    password: params.password,//constants.OPERATING_MANAGER_DEFAULT_PASSWORD,
                    status: 'normal',
                    create_time: utils.getCurrentTime()
                }

                if(enviroments.CHAIN.is_use) {
                    orgnization.dataKey = orgnization.id
                    await chainService.createOrUpdate('orgnization',orgnization)
                }
                let result = await models.orgnization.create(orgnization)
                let result2 = await models.orgnization_manager.create(orgnization_manager)
                data = {
                    result: result,
                    result2: result2
                }
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
    console.info(data);
}
