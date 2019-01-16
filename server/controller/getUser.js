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
            let user_info = null
            let career_intents = null
            let work_experiences = null
            let education_experiences = null
            let practice_experiences = null
            let comments = null
            if(enviroments.CHAIN.is_use || debug==="true") {
                user_info = await chainService.findTableByKey("resume/userInfo", id, null)
                // if(user_info != null && user_info.card_id != null && user_info.card_id != ''){ 第一版
                //     career_intents = await chainService.findTableByKey("career_intent", user_info.card_id, null)
                //     work_experiences = await chainService.findTableByKey("work_experience", user_info.card_id, null)
                //     education_experiences = await chainService.findTableByKey("education_experience", user_info.card_id, null)
                //     practice_experiences = await chainService.findTableByKey("practice_experience", user_info.card_id, null)
                //     comments = await chainService.findTableByKey("comment", user_info.card_id, null)
                // }
                if(user_info != null){
                    career_intents = user_info.CareerIntents;
                    work_experiences = user_info.WorkExperiences;
                    education_experiences = user_info.EducationExperiences;
                    practice_experiences = user_info.PracticeExperiences;
                    career_intents = user_info.CareerIntents;
                    comments = await chainService.findTableByKey("comment/"+user_info.CARD_ID, null, null)
                }

            }else {
                user_info = await models.user_info.findOne({where: {id: id}})
                career_intents = await models.career_intent.findAll({where: {user_id: id}});
                work_experiences = await models.work_experience.findAll({where: {user_id: id}});
                education_experiences = await models.education_experience.findAll({where: {user_id: id}});
                practice_experiences = await models.practice_experience.findAll({where: {user_id: id}});
                comments = await models.comment.findAll({where: {user_id: id}});
            }
            data = {
                user: user_info,
                career_intents: career_intents,
                work_experiences: work_experiences,
                education_experiences: education_experiences,
                practice_experiences: practice_experiences,
                comments: comments,
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
