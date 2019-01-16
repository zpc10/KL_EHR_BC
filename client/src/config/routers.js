import Vue from 'vue'
import Router from 'vue-router'
import login from '../module/login/login'
import register from '../module/register/register'
import error404 from '../module/error/404'
import error500 from '../module/error/500'
import admin from '../module/admin/admin'
import dashboard from '../module/admin/dashboard/dashboard'
import users from '../module/admin/user/users'
import user from '../module/admin/user/user'
import orgnizations from '../module/admin/orgnization/orgnizations'
import orgnization from '../module/admin/orgnization/orgnization'


Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: login},
    { path: '/register', name: 'register', component: register},
    { path: '/error', name: 'error', component: error500},
    { path: '/error/404', name: 'error404', component: error404},
    { path: '/error/500', name: 'error500', component: error500},
    {
      path: '/admin',name: 'admin',component: admin,
      children: [
        { path: '/admin', redirect: '/admin/dashboard' },
        { path: '/admin/dashboard', name: 'dashboard', component: dashboard},
        { path: '/admin/users',name: 'users', component: users},
        { path: '/admin/users/:userId',name: 'user', component: user},
        { path: '/admin/orgnizations',name: 'orgnizations', component: orgnizations},
        { path: '/admin/orgnizations/:orgnizationId',name: 'orgnization', component: orgnization},
      ],

    }
  ]
})
