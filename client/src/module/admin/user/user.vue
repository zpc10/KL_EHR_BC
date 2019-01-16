<template>
  <div class="page">
    <h2 class="page-title">人才数据详情</h2>
    <div  v-if="user">
      <div class="block">
        <h2 class="block-title">基本信息</h2>
        <div>
          <span>姓名：{{user.name}}</span>&nbsp;&nbsp;
          <span v-show="false">昵称：{{user.nick_name}}</span>&nbsp;&nbsp;
          <span v-show="false">性别：{{genderFormat(user.gender)}}</span>&nbsp;&nbsp;
          <span v-show="false">头像：<img v-if="user.avatar_url" :src="user.avatar_url" style="width:60px;height:60px;"></span>&nbsp;&nbsp;
          <span>身份证号：{{user.card_id}}</span>&nbsp;&nbsp;
          <span v-show="false">生日：{{user.birthday}}</span>&nbsp;&nbsp;
          <span>手机号：{{user.mobile}}</span>&nbsp;&nbsp;
          <span>QQ号：{{user.qq}}</span>&nbsp;&nbsp;
          <span v-show="false">邮箱：{{user.email}}</span>&nbsp;&nbsp;
          <span v-show="false">所在省份：{{user.province}}</span>&nbsp;&nbsp;
          <span v-show="false">所在城市：{{user.city}}</span>&nbsp;&nbsp;
          <span v-show="false">个人简介：{{user.brief}}</span>&nbsp;&nbsp;
          <span v-show="false">原力值：{{user.force}}</span>&nbsp;&nbsp;
          <span v-show="false">积分值：{{user.coin}}</span>&nbsp;&nbsp;
          <span v-show="false">邀请人数：{{user.invite}}</span>&nbsp;&nbsp;
          <span v-show="false">备注：{{user.mark}}</span>&nbsp;&nbsp;
          <span v-show="false">创建时间：{{user.create_time}}</span>&nbsp;&nbsp;
          <span v-show="false">最后访问时间：{{user.last_visit_time}}</span>&nbsp;&nbsp;
        </div>
      </div>
      <div class="block">
        <h2 class="block-title">职业意向</h2>
        <div v-if="career_intents">
          <span>期望工作地点:{{career_intents[0].place}}</span>&nbsp;&nbsp;
          <span>期望从事行业:{{career_intents[0].industry}}</span>&nbsp;&nbsp;
          <span>期望从事岗位:{{career_intents[0].occupation}}</span>&nbsp;&nbsp;
          <span>期望薪资待遇:{{career_intents[0].salary}}</span>&nbsp;&nbsp;
        </div>
      </div>
      <div class="block">
        <h2 class="block-title">工作经验</h2>
        <div v-if="work_experiences">
          <el-row>
            <el-col :span="24">
              <table class="table  is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                <tr><th width="16%">工作单位</th><th width="16%">所属行业</th><th width="16%">职位名称</th><th width="16%">税前薪资</th><th width="16%">在职时间</th><th width="20%">工作描述</th></tr>
                </thead>
                <tbody>
                <tr v-for="experience in work_experiences">
                  <td>{{experience.company}}</td><td>{{experience.industry}}</td><td>{{experience.occupation}}</td><td>{{experience.salary}}</td><td>{{experience.start_day}}-{{experience.end_day}}</td><td>{{experience.experience}}</td>
                </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="block">
        <h2 class="block-title">教育经历</h2>
        <div v-if="education_experiences">
          <el-row>
            <el-col :span="24">
              <table class="table  is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                <tr><th width="16%">学历</th><th width="16%">学校</th><th width="32%">专业</th><th width="16%">在校时间</th><th width="20%">在校经验</th></tr>
                </thead>
                <tbody>
                <tr v-for="experience in education_experiences">
                  <td>{{experience.qualification}}</td><td>{{experience.college}}</td><td>{{experience.major}}</td><td>{{experience.start_day}}-{{experience.end_day}}</td><td>{{experience.experience}}</td>
                </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="block">
        <h2 class="block-title">实习经历</h2>
        <div v-if="practice_experiences">
          <el-row>
            <el-col :span="24">
              <table class="table  is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                <tr><th width="32%">实习单位</th><th width="32%">截止时间</th><th width="36%">获得经验</th></tr>
                </thead>
                <tbody>
                <tr v-for="experience in practice_experiences">
                  <td>{{experience.company}}</td><td>{{experience.start_day}}-{{experience.end_day}}</td><td>{{experience.experience}}</td>
                </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="block">
        <h2 class="block-title">他人评价</h2>
        <div v-if="comments">
          <el-row>
            <el-col :span="24">
              <table class="table  is-narrow is-hoverable is-fullwidth">
                <thead>
                <tr><th width="16%">星级</th><th width="64%">评论内容</th><th width="20%">评论时间</th></tr>
                </thead>
                <tbody>
                <tr v-for="comment in comments">
                  <td>{{comment.star_level}}</td><td>{{comment.content}}</td><td>{{comment.create_time}}</td>
                </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="text-center">
        <el-button type="info" @click="$router.back(-1)"><i class="icon-arrow-left2"></i>返回</el-button>
        <el-button type="primary" @click.native="dialogVisible = true"><i class="icon-file3"></i>评论</el-button>
      </div>
    </div>
    <el-dialog title="评论人才" :visible.sync="dialogVisible" width="45%">
        <span>
          <el-form label-position="left" label-width="100px":model="formComment":rules="rules" ref="formComment">
              <el-form-item label="评价星级" prop="star_level">
                <el-rate v-model="formComment.star_level"></el-rate>
              </el-form-item>
              <el-form-item label="评价内容" prop="content">
                <el-input v-model="formComment.content"  type="textarea"></el-input>
              </el-form-item>
            </el-form>
        </span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="commentUser">提 交</el-button>
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
        userId: '',
        user: null,
        career_intents: null,
        work_experiences: null,
        education_experiences: null,
        practice_experiences: null,
        comments: null,
        dialogVisible: false,
        formComment:{
          star_level: 4,
          content: ''
        },
        rules:{
          star_level:[
            {required: true, message: "请选择评价星级", trigger: 'blur'}
          ],
          content:[
            {required: true, message: "请输入评价内容", trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      ...mapState(['app'])
    },
    methods: {
      genderFormat(gender) {
        if (gender === '1') {
          return '男'
        } else if (gender === '2') {
          return '女'
        }
      },
      loadUser() {
        let x = this;
        axios.get(api.getUserUrl.format(x.userId))
          .then(function (response) {
            if(response.data.statusCode === "success"){
              x.user = response.data.data.user
              x.career_intents = response.data.data.career_intents
              x.work_experiences = response.data.data.work_experiences
              x.education_experiences = response.data.data.education_experiences
              x.practice_experiences = response.data.data.practice_experiences
              x.comments = response.data.data.comments
              console.info(x.user)
              console.info(x.career_intents)
              console.info(x.work_experiences)
              console.info(x.education_experiences)
              console.info(x.practice_experiences)
              console.info(x.comments)
            }else{
              x.$message.error( "服务器内部错误，请稍后重试");
            }
          }).catch(function (error) {
          console.log(error);
        });
      },
      commentUser() {
        let x = this;
        this.$refs['formComment'].validate((valid) => {
          if (valid) {
            axios({
              method: 'post',
              url: api.saveCommentUrl,
              data: {
                user_id: x.user.id,
                ref_busi_type: 'orgnization',
                ref_busi_id: x.app.manager.orgnization_id,
                star_level: x.formComment.star_level,
                content:x.formComment.content,
              }
            })
              .then(function (response) {
                if(response.data.statusCode === "success"){
                  x.$message.success( "人才评论成功！");
                  x.formComment.star_level = 4
                  x.formComment.content = ''
                  x.dialogVisible = false
                  x.loadUref_busi_id
                }else {
                  x.$message.error("服务器内部错误，请稍后重试!");
                }
              })
              .catch(function (error) {
                console.log(error);
                x.$message.error( "服务器内部错误，请稍后重试");
              });
          }
        });
      }
    },
    created() {
      if (!this.app.isLogin) {
        this.$router.push('/login');
      }else{
        this.userId = this.$route.params.userId
        this.loadUser( );
      }
    }
  }
</script>
