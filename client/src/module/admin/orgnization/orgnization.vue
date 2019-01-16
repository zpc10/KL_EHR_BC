<template>
  <div class="page">
    <h2 class="page-title">组织机构详情</h2>
    <div  v-if="orgnization">
      <p>机构编号：{{orgnization.code}}</p>
      <p>机构名称：{{orgnization.name}}</p>
      <p>机构电话：{{orgnization.phone}}</p>
      <p>邮政编码：{{orgnization.post_code}}</p>
      <p>机构地址：{{orgnization.address}}</p>
      <p>法人姓名：{{orgnization.corp_owner_name}}</p>
      <p>营业执照编号：{{orgnization.busi_code}}</p>
      <p>营业执照地址：{{orgnization.busi_address}}</p>
      <p>组织机构编号：{{orgnization.instu_code}}</p>
      <p>税务登记号：{{orgnization.tax_code}}</p>
      <p>机构情况介绍：{{orgnization.summary}}</p>
      <p>联系人姓名：{{orgnization.linkman_name}}</p>
      <p>联系人电话：{{orgnization.linkman_phone}}</p>
      <p>机构状态：
        <el-select v-model="orgnization.status" placeholder="请选择">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button size="small" @click="saveStatus()">保存状态</el-button>
      </p>
      <p>创建时间：{{orgnization.create_time}}</p>
    </div>
    <div class="text-center">
      <el-button type="info" @click="$router.back(-1)"><i class="icon-arrow-left2"></i>返回</el-button>
    </div>
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
        statusOptions: [
          {value: 'init', label: '未审核'}, {value: 'normal', label: '正常'},
          {value: 'fail', label: '审核失败'}, {value: 'disabled', label: '禁用'}],
        orgnizationId: '',
        orgnization: null
      };
    },
    computed: {
      ...mapState(['app'])
    },
    methods: {
      saveStatus(){
        let x = this
        axios({
          method: 'post',
          url: api.auditOrgnizationUrl.format(x.orgnizationId),
          data: {
            status: x.orgnization.status
          }
        })
        .then(function (response) {
          if(response.data.statusCode === "success"){
            x.$message.success( "机构状态修改成功");
          }else{
            x.$message.error( "服务器内部错误，请稍后重试");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      loadOrgnization() {
        let x = this;
        axios.get(api.getOrgnizationUrl.format(x.orgnizationId))
          .then(function (response) {
            if(response.data.statusCode === "success"){
              x.orgnization = response.data.data.orgnization
            }else{
              x.$message.error( "服务器内部错误，请稍后重试");
            }
          }).catch(function (error) {
          console.log(error);
        });
      }
    },
    created() {
      if (!this.app.isLogin) {
        this.$router.push('/login');
      }else{
        this.orgnizationId = this.$route.params.orgnizationId
        this.loadOrgnization( );
      }
    }
  }
</script>
