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
        var offset = params.offset? parseInt(params.offset) : 0;
        var limit = params.limit? parseInt(params.limit) : 10;
        var card_id = params.card_id? params.card_id : '';
        var name = params.name? params.name : '';

        let result = {
            count: 0,
            rows: null
        }
        if(enviroments.CHAIN.is_use || debug==="true") {
            let params = { //链码提供的查询参数 NAME: "",CARD_ID: "",PROVINCE: "",CITY: ""
                offset : offset,
                limit : limit
            }
            if(name != ''){
                params.NAME = name
            }
            if(card_id != ''){
                params.CARD_ID = card_id
            }
            result = await chainService.findUsers(params)
        }else {
            result = await models.user_info.findAndCountAll({
                where: {
                    name: {$like: '%' + name + '%'},
                    card_id: {$like: '%' + card_id + '%'},
                },
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
