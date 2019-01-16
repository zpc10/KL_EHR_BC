<template>
  <div class="page">
    <el-row>
      <el-col :span="24" class="search-block">
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item label="身份证号：">
            <el-input v-model="form.card_id"></el-input>
          </el-form-item>
        </el-form>
        <div class="buttons">
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="block">
        <el-table  :data="users" border>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="card_id" label="身份证号" width="200"></el-table-column>
          <el-table-column prop="mobile" label="手机号"> </el-table-column>
          <el-table-column prop="qq" label="QQ号"> </el-table-column>
          <el-table-column prop="birthday" label="生日"> </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column prop="province" label="所在省份"> </el-table-column>
          <el-table-column prop="city" label="所在城市"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="handleShow(scope.$index, scope.row)"> 查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
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
    data () {
      return {
        form:{
          card_id: '',
        },
        users: [],
        total: 0,
        currentPage: 1,
        pagesize: 10
      }
    },
    computed: {
    ...mapState(['app'])
    },
    methods: {
      handleSizeChange: function (size) {
        this.pagesize = size;
        this.loadDatas((this.currentPage-1) * this.pagesize, this.pagesize)
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.loadDatas((this.currentPage-1) * this.pagesize, this.pagesize)
      },
      handleShow: function(index, row) {
        let userId = row.id.toString();
        this.$router.push('/admin/users/' + userId);
      },
      search: function(){
        this.form.card_id = this.form.card_id.replace(/(^\s*)|(\s*$)/g, "")
        this.loadDatas((this.currentPage-1) * this.pagesize, this.pagesize,this.form.card_id)
      },
      loadDatas(offset,limit,card_id) {
        let x = this;
        axios.get(api.findUsersUrl,{params:{ offset:(!offset?0:offset),limit:(!limit?this.pagesize:limit),card_id:(!card_id?null:card_id)}})
          .then(function (response) {
            if(response.data.statusCode === "success"){
              x.users = response.data.data.rows
              x.total = response.data.data.count
            }else{
              x.$message.error( "服务器内部错误，请稍后重试");
            }
          }).catch(function (error) {
          console.log(error);
        });
      },
    },
    created() {
      if (!this.app.isLogin) {
        this.$router.push('/login');
      }else{
        this.loadDatas(0,this.pagesize);
      }
    }
  }
</script>
