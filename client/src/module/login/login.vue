<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10" :offset="7">
        <el-card class="box-card m-t-100">
          <div class="page">
            <h2 class="page-title">机构账户登陆</h2>
            <div class="clearfix">
              <el-form label-position="left" label-width="80px":model="formLogin":rules="rules" ref="formLogin">
                <!-- $refs 只在组件渲染完成后才填充，并且它是非响应式的。它仅仅作为一个直接访问子组件的应急方案——应当避免在模版或计算属性中使用 $refs 。 -->
                <el-form-item label="账号" prop="code">
                  <el-input v-model="formLogin.code"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="formLogin.password" type="password"></el-input>
                </el-form-item>
                <el-form-item class="center">
                  <el-button type="primary" @click="login">登录</el-button>
                  <router-link to="/register">&nbsp;&nbsp;没有账号? 立即注册</router-link>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import types from '@/store/types'
  import api from '@/config/api'
  import axios from 'axios'


  export default {
    data(){
      return{
        formLogin:{
          code: '',
          password: '',
        },
        rules:{
          code:[
            {required: true, message: "请输入账号", trigger: 'blur'}
          ],
          password:[
            {required: true, message: "请输入账号密码", trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapState(['app'])
    },
    methods:{
      login(){
        let x = this;
        this.$refs['formLogin'].validate((valid) => {
          if (valid) {
            const crypto = require('crypto');
            let xpassword = crypto.createHash('md5').update(x.formLogin.password).digest('hex')
            axios({
              method: 'post',
              url: api.loginUrl,
              data: {
                code: x.formLogin.code,
                password: xpassword
              }
            })
            .then(function (response) {
              if(response.data.statusCode === "codeOrPasswordError"){
                x.$message.error( "账号密码错误，请重试");
                x.formLogin.password ='';
              }else if(response.data.statusCode === "orgnizationUnAuditError"){
                x.$message.error( "账号所属企业信息未审核，请稍后重试");
              }else if(response.data.statusCode === "statusUnNormalError"){
                x.$message.error( "账号或所属企业状态异常，请联系平台商");
              }else if(response.data.statusCode === "success"){
                response.data.data.manager.is_super = response.data.data.is_super;
                x.loginApp({manager: response.data.data.manager,orgnization: response.data.data.orgnization})
                console.info(x.app.manager)
                x.$router.push('/admin')
              }else{
                x.$message.error( "服务器内部错误，请稍后重试");
              }
            })
            .catch(function (error) {
              console.log(error);
            });
          }
        });
      },
      ...mapActions({
        loginApp: types.actions.LOGIN_APP
      }),
    }
  }
</script>
