const router  = require('koa-router')()
const controllers = require('../controller')
//const validationMiddleware = require('../middleware/validation')

// 登录接口
//router .get('/login', validationMiddleware, controllers.login)
router.get('/api/orgnizations', controllers.findOrgnizations)
router.post('/api/orgnizations/register', controllers.orgnizationRegister)
router.get('/api/orgnizations/total', controllers.totalOrgnizations)
router.get('/api/orgnizations/:id', controllers.getOrgnization)
router.post('/api/orgnizations/:id/audit', controllers.auditOrgnization)
router.post('/api/login', controllers.login)
router.get('/api/users', controllers.findUsers)
router.get('/api/users/total', controllers.totalUsers)
router.get('/api/users/:id', controllers.getUser)
router.post('/api/comments/save', controllers.saveComment)
router.post('/api/change-password', controllers.changePassword)


module.exports = router
