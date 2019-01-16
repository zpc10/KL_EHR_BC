import axios from 'axios'
import enviroments from '../config/enviroments'
import utils from '../util/utils'

const API = {
    find_orgnizations: '/search/orgnization',
    total_orgnizations :'/search/orgnization',
    find_users: '/search/resume',
    total_users: '/search/resume',
    get_token: '/getToken'
}

let GLOBAL = {
    token_token : null,
    token_exp : 0
}

export default class ChainSevice {
     static async fechToken() {
        console.info("request chain server: fechToken")
        if (!GLOBAL.token_token || GLOBAL.token_exp * 1000 <= new Date() - 300) {
            let token = null
            let params = {
                userOrg : enviroments.CHAIN.jwt.userOrg,
                userName : enviroments.CHAIN.jwt.userName,
                userSecret : enviroments.CHAIN.jwt.userSecret
            }
            await axios({
                method: 'post',
                url: enviroments.CHAIN.api_url + API.get_token,
                data: params,
                json: true,
                headers: {
                    "content-type": "application/json",
                }
            })
            .then(function (response) {
                console.error(response)
                if(response.status == 200 && response.data.code == "1") {
                    token = response.data.data.token
                    GLOBAL.token_token = response.data.data.token
                    GLOBAL.token_exp = response.data.data.exp
                }else if(response.status == 200 && response.data.code === "0"){
                    throw new Error(response.data.message)
                }
            })
            .catch(function (error) {
                throw error
            });
            console.error("token:"+token)
            return token

        }else{
            console.error("gtoken:"+GLOBAL.token_token)
            return GLOBAL.token_token
        }
     }

    static async createOrUpdate(tablePath, params) {
        console.info("request chain server: createOrUpdate(tablePath:" + tablePath +")")
        let result = null
        let token = await ChainSevice.fechToken();
        await axios({
            method: 'post',
            url: enviroments.CHAIN.api_url + '/' + tablePath,
            json: true,
            headers: {
                "content-type": "application/json",
                "authorization": 'Bearer '+ token
            },
            data: params
        })
        .then(function (response) {
            if(response.status == 200 && response.data.code == "1") {
                result = response.data.data
            }else if(response.status == 200 && response.data.code == "0"){
                throw new Error(response.data.message)
            }
        })
        .catch(function (error) {
            throw error
        });
        return result
    }
    static async findTableByKey(tablePath, key, params) {
        console.info("request chain server: findTableByKey(tablePath:" + tablePath + " key:"+  key + " params:"+ params +")")
        let result = null
        let token = await ChainSevice.fechToken();
        var url = enviroments.CHAIN.api_url + '/' + tablePath
        if(key){
            url = url + "/"+ key
        }

        await axios({
            method: 'get',
            url: url,
            params: params,
            json: true,
            headers: {
                "content-type": "application/json",
                "authorization": 'Bearer '+ token
            }
        })
        .then(function (response) {
            if(response.status == 200 && response.data.code == "1") {
                result = response.data.data
            }else if(response.status == 200 && response.data.code == "0"){
                throw new Error(response.data.message)
            }
        })
        .catch(function (error) {
            throw error
        });
        return result
    }

    static async findOrgnizations(params) {
        console.info("request chain server: findOrgnizations(params:" + params +")")
        let result = null
        let token = await ChainSevice.fechToken();
        await axios({
            method: 'post',
            url: enviroments.CHAIN.api_url + API.find_orgnizations + "?limit=" + params.limit + "&skip=" + params.offset,
            json: true,
            headers: {
                "content-type": "application/json",
                "authorization": 'Bearer '+ token
            },
            data: params
        })
            .then(function (response) {
                if(response.status == 200 && response.data.code == "1") {
                    result = response.data.data
                }else if(response.status == 200 && response.data.code == "0"){
                    throw new Error(response.data.message)
                }
            })
            .catch(function (error) {
                throw error
            });
        return result
    }
    static async findOrgnizations(params) {
        console.info("request chain server: findOrgnizations(params:" + params +")")
        let result = null
        let token = await ChainSevice.fechToken();
        await axios({
            method: 'post',
            url: enviroments.CHAIN.api_url + API.find_orgnizations + "?limit=" + params.limit + "&skip=" + params.offset,
            json: true,
            headers: {
                "content-type": "application/json",
                "authorization": 'Bearer '+ token
            },
            data: params
        })
        .then(function (response) {
            if(response.status == 200 && response.data.code == "1") {
                result = response.data.data
            }else if(response.status == 200 && response.data.code == "0"){
                throw new Error(response.data.message)
            }
        })
        .catch(function (error) {
            throw error
        });
        return result
    }

    static async totalOrgnizations() {
        console.info("request chain server: totalOrgnizations")
        let result = 0
        let token = await ChainSevice.fechToken();
        await axios({
            method: 'get',
            url: enviroments.CHAIN.api_url + API.total_orgnizations,
            json: true,
            headers: {
                "content-type": "application/json",
                "authorization": 'Bearer '+ token
            }
        })
        .then(function (response) {
            if(response.status == 200 && response.data.code == "1") {
                result = response.data.data.totalCount
            }else if(response.status == 200 && response.data.code == "0"){
                throw new Error(response.data.message)
            }
        })
        .catch(function (error) {
            throw error
        });
        return result
    }

    static async findUsers(params) {
        console.info("request chain server: findUsers(params:" + params +")")
        let result = null
        let token = await ChainSevice.fechToken();
        await axios({
            method: 'post',
            url: enviroments.CHAIN.api_url + API.find_users + "?limit=" + params.limit + "&skip=" + params.offset,
            json: true,
            headers: {
                "content-type": "application/json",
                "authorization": 'Bearer '+ token
            },
            data: params
        })
        .then(function (response) {
            if(response.status == 200 && response.data.code == "1") {
                result = response.data.data
            }else if(response.status == 200 && response.data.code == "0"){
                throw new Error(response.data.message)
            }
        })
        .catch(function (error) {
            throw error
        });
        return result
    }
    static async totalUsers() {
        console.info("request chain server: totalUsers")
        let result = 0
        let token = await ChainSevice.fechToken();
        let req = await axios({
            method: 'get',
            url: enviroments.CHAIN.api_url + API.total_users,
            json: true,
            headers: {
                "content-type": "application/json",
                "authorization": 'Bearer '+ token
            }
        })
        .then(function (response) {
            if(response.status == 200 && response.data.code == "1") {
                result = response.data.data.totalCount
            }else if(response.status == 200 && response.data.code == "0"){
                throw new Error(response.data.message)
            }
        })
        .catch(function (error) {
            throw error
        });
        return result
    }

}
