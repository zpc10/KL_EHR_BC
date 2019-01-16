<template>
  <div class="page">
    <h2>Hi，杭州科录区块链公司</h2>
    <el-row>
      <el-col :span="24">
        <div class="home-patchs">
          <div class="patch-item">
            <p>{{usersTotal}}</p><p>链上人才数据</p>
          </div>
          <div class="patch-item">
            <p>{{orgnizationsTotal}}</p><p>链上企业数据</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="block">
          <h2 class="block-title">最新人才数据<router-link to="/admin/users">查看更多</router-link></h2>
            <table class="table  is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                 <tr><th>昵称</th><th>姓名</th><th>身份证号</th><th>手机号</th><th>QQ号</th></tr>
              </thead>
              <tbody>
              <tr v-for="user in users">
                <th>{{user.nick_name}}</th><th>{{user.name}}</th><th>{{user.card_id}}</th><th>{{user.mobile}}</th><th>{{user.qq}}</th>
              </tr>
              </tbody>
            </table>
        </div>
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
    data() {
      return {
        usersTotal: 0,
        orgnizationsTotal: 0,
        commentsTotal: 0,
        users:[]
      };
    },
    computed: {
      ...mapState(['app'])
    },
    methods: {
      loadDatas() {
          let x = this;
          axios.get(api.totalOrgnizationsUrl,{})
          .then(function (response) {
            if(response.data.statusCode === "success"){
              x.orgnizationsTotal = response.data.data.totalCount
            }else{
              x.$message.error( "服务器内部错误，请稍后重试");
            }
          }).catch(function (error) {
            console.log(error);
          });
        axios.get(api.totalUsersUrl,{})
          .then(function (response) {
            if(response.data.statusCode === "success"){
              x.usersTotal = response.data.data.totalCount
            }else{
              x.$message.error( "服务器内部错误，请稍后重试");
            }
          }).catch(function (error) {
          console.log(error);
        });
        axios.get(api.findUsersUrl,{offset:0,limit:5})
          .then(function (response) {
            if(response.data.statusCode === "success"){
              x.users = response.data.data.rows
            }else{
              x.$message.error( "服务器内部错误，请稍后重试");
            }
          }).catch(function (error) {
          console.log(error);
        });
      },
      loadUsers() {
        let x = this;
        setTimeout(function() {
          axios.get(api.findUsersUrl,{offset:0,limit:5})
            .then(function (response) {
              if(response.data.statusCode === "success"){
                x.users = response.data.data.rows
              }else{
                x.$message.error( "服务器内部错误，请稍后重试");
              }
            }).catch(function (error) {
              console.log(error);
          });
        },30000)
      }
    },
    created() {
      if (!this.app.isLogin) {
        this.$router.push('/login');
      }else{
        this.loadDatas();
        this.loadUsers();
      }
    }
  }
</script>
