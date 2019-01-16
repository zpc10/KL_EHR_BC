const validUtils =  {
    codeReg:/^[a-z\u4e00-\u9fa5]{3,10}$/i, //帐号验证
    passwordReg:/^(?=.*[a-z])(?=.*\d)[a-z\d]{6,12}$/i, //密码验证
    statusCodes : {
        fail:'fail',
        success:'success',
        paramInvalid: 'paramInvalid',
        codeOrPasswordError: 'codeOrPasswordError',
        oldPasswordError: 'oldPasswordError',
        serverDataError: 'serverDataError',
        codeExistedError: 'codeExistedError',
        serverError: 'serverError',
        serverSaveError: 'serverSaveError',
        serverQueryError: 'serverQueryError',
        serverUpdateError: 'serverUpdateError',
        statusUnNormalError: 'statusUnNormalError',
        orgnizationUnAuditError: 'orgnizationUnAuditError'
    }
}
module.exports = validUtils