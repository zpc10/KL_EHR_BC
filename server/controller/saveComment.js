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
    if (!params.ref_busi_id || !params.ref_busi_type || !params.user_id || !params.star_level || !params.content) {
        statusCode = validUtils.statusCodes.paramInvalid;
    } else {
        try{
            let comment = {
                id: uuid.v1(),
                ref_busi_type: params.ref_busi_type,
                ref_busi_id: params.ref_busi_id,
                user_id: params.user_id,
                star_level: params.star_level,
                content: params.content,
                status: 'normal',
                create_time: utils.getCurrentTime()
            }
            if(enviroments.CHAIN.is_use) {
                comment.dataKey = comment.id
                await chainService.createOrUpdate('comment',comment)
            }
            let result = await models.comment.create(comment)
            data = {
                result: result,
            }
        }catch(error){
            statusCode = validUtils.statusCodes.serverSaveError;
            console.error('error__', error)
        }
    }
    ctx.body = {
        statusCode: statusCode,
        data: data
    };
    console.info(data);
}
