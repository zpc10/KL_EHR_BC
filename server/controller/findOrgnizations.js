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
    var statusCode = validUtils.statusCodes.success
    var data = {}
    var debug = params.debug? params.debug : "false";
    try{
        var offset = params.offset? parseInt(params.offset) : 0;
        var limit = params.limit? parseInt(params.limit) : 10;
        var name = params.name? params.name : '';
        var status = params.status? params.status : '';

        let result = {
            count: 0,
            rows: null
        }
        if(enviroments.CHAIN.is_use || debug==="true") {
            let params = { ////链码提供的查询参数 CODE: "",NAME: "",BUSI_CODE: "",STATUS: ""
                offset : offset,
                limit : limit
            }
            if(name != ''){
                params.NAME = name
            }
            if(status != ''){
                params.BUSI_CODE = status
            }
            result = await chainService.findOrgnizations(params)
            //console.error(utils.upperJsonObjKeys(result))
            //console.error(utils.lowerJsonObjKeys(result))
        }else{
            result = await models.orgnization.findAndCountAll({
                where: {
                    name: {$like: '%' + name + '%'},
                    status: {$like: '%' + status + '%'}
                },
                order: 'create_time desc',
                offset: offset,
                limit: limit
            })
        }
        data = {
            count: result.count,
            rows: result.rows
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
