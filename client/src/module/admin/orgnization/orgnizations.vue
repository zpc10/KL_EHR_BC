<template>
  <div class="page">
    <el-row>
      <el-col :span="24" class="search-block">
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item label="机构名称：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="机构状态：">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="buttons">
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="block">
        <el-table  :data="orgnizations" border>
          <el-table-column prop="code" label="机构编号"></el-table-column>
          <el-table-column prop="name" label="机构名称" width="200"></el-table-column>
          <el-table-column prop="address" label="机构地址"> </el-table-column>
          <el-table-column prop="corp_owner_name" label="法人姓名"> </el-table-column>
          <el-table-column prop="busi_code" label="营业执照编号"> </el-table-column>
          <el-table-column prop="busi_address" label="营业执照地址"> </el-table-column>
          <el-table-column prop="linkman_name" label="联系人姓名"> </el-table-column>
          <el-table-column prop="status" label="机构状态" :formatter = "statusFormat"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="handleShow(scope.$index, scope.row)">编辑状态</el-button>
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
        statusOptions: [
          {value: 'init', label: '未审核'}, {value: 'normal', label: '正常'},
          {value: 'fail', label: '审核失败'}, {value: 'disabled', label: '禁用'}],
        form:{
          name: '',
          status: 'init',
        },
        orgnizations: [],
        total: 0,
        currentPage: 1,
        pagesize: 10
      }
    },
    computed: {
      ...mapState(['app'])
    },
    methods: {
      statusFormat(row, column) {
        if (row.status === 'init') {
          return '未审核'
        } else if (row.status === 'normal') {
          return '正常'
        } else if (row.status === 'fail') {
          return '审核失败'
        }else if (row.status === 'disabled') {
          return '禁用'
        }
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
        this.loadDatas((this.currentPage-1) * this.pagesize, this.pagesize)
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.loadDatas((this.currentPage-1) * this.pagesize, this.pagesize)
      },
      handleShow: function(index, row) {
        let orgnizationId = row.id.toString();
        this.$router.push('/admin/orgnizations/' + orgnizationId);
      },
      search: function(){
        this.form.name = this.form.name.replace(/(^\s*)|(\s*$)/g, "")
        this.loadDatas((this.currentPage-1) * this.pagesize, this.pagesize)
      },
      loadDatas(offset,limit) {
        let x = this;
        let name = x.form.name;
        let status = x.form.status;
        axios.get(api.findOrgnizationsUrl,{params:{ offset:(!offset?0:offset),limit:(!limit?this.pagesize:limit),name:(!name?null:name),status:(!status?null:status)}})
          .then(function (response) {
            if(response.data.statusCode === "success"){
              x.orgnizations = response.data.data.rows
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
