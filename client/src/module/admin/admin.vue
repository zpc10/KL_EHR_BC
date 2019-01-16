<template>
  <div>
    <div class="header">
      <el-row>
        <el-col :span="4">
          <div class="brand"><router-link to="/admin/dashboard"><img src="../../asset/img/logo.png"/></router-link></div>
        </el-col>
        <el-col :span="16">
          <el-menu :default-active="activeIndex" mode="horizontal">
            <el-menu-item index="1"><router-link to="/admin/dashboard"><i class="icon-home"></i>首页</router-link></el-menu-item>
            <el-menu-item index="2"><router-link to="/admin/users">人才数据</router-link></el-menu-item>
            <el-menu-item index="4"><router-link to="/admin/orgnizations">机构审核</router-link></el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="4" class="pull-left">
          <el-dropdown>
            <span class="el-dropdown-link">
              <i class="icon-user4"></i>{{app.isLogin?app.manager.name:''}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="dialogVisible = true">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logoff">安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
    <div class="main">
      <el-row>
        <el-col :span="24">
          <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
            <router-view></router-view>
          </transition>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="35%">
        <span>
          <el-form label-position="left" label-width="100px":model="formPassword":rules="rules" ref="formPassword">
              <el-form-item label="旧密码" prop="password">
                <el-input v-model="formPassword.password" type="password"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="formPassword.newPassword" type="password"></el-input>
              </el-form-item>
             <el-form-item label="确认新密码" prop="newCheckPassword">
                  <el-input v-model="formPassword.newCheckPassword" type="password"></el-input>
                </el-form-item>
            </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="changePassword">修 改</el-button>
       </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import types from '@/store/types'
  import api from '@/config/api'
  import axios from 'axios'

  export default {
    data() {
      return {
        activeIndex: '1',
        dialogVisible: false,
        formPassword:{
          password: '',
          newPassword: '',
          newCheckPassword: '',
        },
        rules:{
          password:[
            {required: true, message: "请输入旧密码", trigger: 'blur'}
          ],
          newPassword:[
            {required: true, message: "请输入新密码", trigger: 'blur'}
          ],
          newCheckPassword:[
            {required: true, message: "请输入确认新密码", trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      ...mapState(['app'])
    },
    methods: {
      checkPasswordAgain(){
        if(this.formPassword.newPassword != this.formPassword.newCheckPassword){
          return false;
        }
        return true;
      },
      changePassword() {
        let x = this;
        this.$refs['formPassword'].validate((valid) => {
          if (valid) {
            if(!x.checkPasswordAgain()){
              x.$message.error('两次输入新密码不一致!');
              return false;
            }
            const crypto = require('crypto');
            let xpassword = crypto.createHash('md5').update(x.formPassword.password).digest('hex')
            let xnewPassword = crypto.createHash('md5').update(x.formPassword.newPassword).digest('hex')
            axios({
              method: 'post',
              url: api.changePasswordUrl,
              data: {
                code: x.app.manager.code,
                password: xpassword,
                newPassword:xnewPassword
              }
            })
              .then(function (response) {
                if(response.data.statusCode === "oldPasswordError"){
                  x.$message.error( "旧密码不正确，请重试");
                  x.formPassword.password ='';
                }else if(response.data.statusCode === "success"){
                  x.$message.success( "密码修改成功！");
                  x.dialogVisible = false
                }else{
                  x.$message.error( "服务器内部错误，请稍后重试");
                }
              })
              .catch(function (error) {
                console.log(error);
                x.$message.error( "服务器内部错误，请稍后重试");
              });
          }
        });
      },
      logoff() {
        this.logoffApp({});
        this.$router.push('/login')
      },
      ...mapActions({
        logoffApp: types.actions.LOGOFF_APP
      }),
    },
    created() {
      if(!this.app.isLogin){
         this.$router.push('/login');
      }
    }
  }
</script>
