const utils =  {
    getClientIP : function(ctx) {//公用：获取客户端IP
        let req = ctx.request;
        let ip = ctx.ip ||
            req.headers['x-forwarded-for'] ||
            req.ip ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress || '';
        let arr = ip.match(/(\d{1,3}\.){3}\d{1,3}/);
        return arr ? arr[0] : '';
    },
    getCurrentTime: function() {
        var date = new Date();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentDate = date.getFullYear() + "-" + month + "-" + strDate + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        return currentDate;
    },
    lowerJsonObjKeys: function (jsonObj){
        for (var key in jsonObj){
            if(typeof jsonObj[key] == "object") {
                jsonObj[key.toLowerCase()] = this.lowerJsonObjKeys(jsonObj[key]);
            }else{
                jsonObj[key.toLowerCase()] = jsonObj[key];
            }
            delete(jsonObj[key]);
        }
        return jsonObj;
    },
    upperJsonObjKeys: function (jsonObj){
        for (var key in jsonObj){
            if(typeof jsonObj[key] == "object") {
                jsonObj[key.toUpperCase()] = this.upperJsonObjKeys(jsonObj[key]);
            }else{
                jsonObj[key.toUpperCase()] = jsonObj[key];
            }
            delete(jsonObj[key]);
        }
        return jsonObj;
    }
}
module.exports = utils
