<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="10" :offset="7">
        <el-card class="box-card m-t-100">
          <div class="page">
            <h2 class="page-title">机构申请注册</h2>
            <div class="clearfix">
              <el-form label-position="left" label-width="140px" :model="formRegister" :rules="rules" ref="formRegister">
                <el-form-item label="机构账号" prop="code">
                  <el-input v-model="formRegister.code"></el-input>
                </el-form-item>
                <el-form-item label="机构名称" prop="name">
                  <el-input v-model="formRegister.name"></el-input>
                </el-form-item>
                <el-form-item label="机构电话" prop="phone">
                  <el-input v-model="formRegister.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码" prop="post_code">
                  <el-input v-model="formRegister.post_code"></el-input>
                </el-form-item>
                <el-form-item label="机构地址" prop="address">
                  <el-input v-model="formRegister.address"></el-input>
                </el-form-item>
                <el-form-item label="机构法人姓名" prop="corp_owner_name">
                  <el-input v-model="formRegister.corp_owner_name"></el-input>
                </el-form-item>
                <el-form-item label="机构营业执照编号" prop="busi_code">
                  <el-input v-model="formRegister.busi_code"></el-input>
                </el-form-item>
                <el-form-item label="机构营业执照地址" prop="busi_address">
                  <el-input v-model="formRegister.busi_address"></el-input>
                </el-form-item>
                <el-form-item label="机构组织机构编号" prop="instu_code">
                  <el-input v-model="formRegister.instu_code"></el-input>
                </el-form-item>
                <el-form-item label="机构组织机构编号" prop="tax_code">
                  <el-input v-model="formRegister.tax_code"></el-input>
                </el-form-item>
                <el-form-item label="联系人姓名" prop="linkman_name">
                  <el-input v-model="formRegister.linkman_name"></el-input>
                </el-form-item>
                <el-form-item label="联系人电话" prop="linkman_phone">
                  <el-input v-model="formRegister.linkman_phone"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="formRegister.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword">
                  <el-input v-model="formRegister.checkPassword"></el-input>
                </el-form-item>
                <el-form-item class="center">
                  <el-button type="primary" @click="addOrgnization">注册</el-button>
                  <router-link to="/login">&nbsp;&nbsp;有账号? 登陆</router-link>
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
        formRegister:{
          code: '',
          name: '',
          phone: '',
          post_code: '',
          address: '',
          corp_owner_name: '',
          busi_code: '',
          busi_address: '',
          instu_code: '',
          tax_code: '',
          linkman_name: '',
          linkman_phone: '',
          password: '',
          checkPassword: '',
        },
        rules:{
          code:[
            {required: true, message: "请输入账号", trigger: 'blur'},
            { min: 1, max: 50, message: '长度在 1 到50个字符', trigger: 'blur' }
          ],
          name:[
            {required: true, message: "请输入机构名称", trigger: 'blur'},
            { min: 1, max: 100, message: '长度在 1 到100个字符', trigger: 'blur' }
          ],
          phone:[
            {required: true, message: "请输入机构电话", trigger: 'blur'},
            { min: 1, max: 50, message: '长度在 1 到50个字符', trigger: 'blur' }
          ],
          post_code:[
            {required: true, message: "请输入邮政编码", trigger: 'blur'},
            { min: 1, max: 20, message: '长度在 1 到20个字符', trigger: 'blur' }
          ],
          address:[
            {required: true, message: "请输入机构地址", trigger: 'blur'},
            { min: 1, max: 200, message: '长度在 1 到200个字符', trigger: 'blur' }
          ],
          corp_owner_name:[
            {required: true, message: "请输入机构法人姓名", trigger: 'blur'},
            { min: 1, max: 20, message: '长度在 1 到20个字符', trigger: 'blur' }
          ],
          busi_code:[
            {required: true, message: "请输入机构营业执照编号", trigger: 'blur'},
            { min: 1, max: 100, message: '长度在 1 到100个字符', trigger: 'blur' }
          ],
          busi_address:[
            {required: true, message: "请输入机构营业执照地址", trigger: 'blur'},
            { min: 1, max: 300, message: '长度在 1 到300个字符', trigger: 'blur' }
          ],
          instu_code:[
            {required: true, message: "请输入机构组织机构编号", trigger: 'blur'},
            { min: 1, max: 100, message: '长度在 1 到100个字符', trigger: 'blur' }
          ],
          tax_code:[
            {required: true, message: "请输入机构税务登记号", trigger: 'blur'},
            { min: 1, max: 100, message: '长度在 1 到100个字符', trigger: 'blur' }
          ],
          linkman_name:[
            {required: true, message: "请输入联系人姓名", trigger: 'blur'},
            { min: 1, max: 20, message: '长度在 1 到20个字符', trigger: 'blur' }
          ],
          linkman_phone:[
            {required: true, message: "请输入联系人电话", trigger: 'blur'},
            { min: 1, max: 100, message: '长度在 1 到100个字符', trigger: 'blur' }
          ],
          password:[
            {required: true, message: "请输入密码", trigger: 'blur'},
            { min: 1, max: 20, message: '长度在 1 到20个字符', trigger: 'blur' }
          ],
          checkPassword:[
            {required: true, message: "请输入确认密码", trigger: 'blur'},
            { min: 1, max: 20, message: '长度在 1 到20个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      checkPasswordAgain(){
        if(this.formRegister.checkPassword != this.formRegister.password){
          return false;
        }
        return true;
      },
      addOrgnization(){
        let x = this;
        x.$refs['formRegister'].validate((valid) => {
          if (valid) {
            if(!x.checkPasswordAgain()){
              x.$message.error('两次输入密码不一致!');
              return false;
            }
            const crypto = require('crypto');
            let xpassword = crypto.createHash('md5').update(x.formRegister.password).digest('hex')
            axios({
              method: 'post',
              url: api.orgnizationRegisterUrl,
              data: {
                code: x.formRegister.code,
                name: x.formRegister.name,
                phone: x.formRegister.phone,
                post_code: x.formRegister.post_code,
                address: x.formRegister.address,
                corp_owner_name: x.formRegister.corp_owner_name,
                busi_code: x.formRegister.busi_code,
                busi_address: x.formRegister.busi_address,
                instu_code: x.formRegister.instu_code,
                tax_code: x.formRegister.tax_code,
                linkman_name: x.formRegister.linkman_name,
                linkman_phone: x.formRegister.linkman_phone,
                password:  xpassword
              }
            })
              .then(function (response) {
                if(response.data.statusCode === "codeExistedError"){
                  x.$message.error( "机构账号已存在，请重新输入");
                  x.formRegister.code ='';
                }else if(response.data.statusCode === "success"){
                  x.$message.success('机构申请信息已提交成功，我们会尽快进行审核，请稍候进行访问');
                  x.$router.push('/login')
                }else if(response.data.statusCode === "paramInvalid"){
                  x.$message.error( "录入参数无效，请稍后重试");
                }else{
                  x.$message.error( "服务器内部错误，请稍后重试");
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        });
      }
    }
  }
</script>
