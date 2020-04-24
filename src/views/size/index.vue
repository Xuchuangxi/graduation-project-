<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <div class="block">
          <el-avatar :size="150" :src="userInfo.avatar" class="avatar" />
          <el-upload
            action="http://192.168.1.108:5000/user/avatar"
            :limit="100"
            name="avatar"
            :headers="token"
            :on-success="uplodeSuccess"
            :show-file-list="false"
          >
            <el-button type="primary">编辑头像</el-button>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="user">
          <el-form ref="ruleForm" label-width="120px" style="font-size:20px" :model="userInfo" :rules="rules">
            <el-form-item label="班级:" prop="className">
              <el-input v-model="userInfo.className" class="input" />
            </el-form-item>
            <el-form-item label="学号:" prop="studentID">
              <el-input v-model="userInfo.studentID" class="input" />
            </el-form-item>
            <el-form-item label="电话号码:" prop="phoneNumber">
              <el-input v-model="userInfo.phoneNumber" class="input" />
            </el-form-item>
            <el-form-item label="性别:">
              <el-radio-group v-model="userInfo.sex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="个人介绍:">
              <el-input v-model="userInfo.introduce" type="textarea" class="input" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubbmit('ruleForm')">完成</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { updateUser, getInfo } from '@/api/user'
import { getToken } from '@/utils/auth'
import store from '@/store'
export default {
  data() {
    return {
      userInfo: {},
      rules: {
        className: { required: true, message: '请输入班级', trigger: 'blur' },
        studentID: { required: true, message: '请输入学号', trigger: 'blur' },
        phoneNumber: { required: true, message: '请输入电话号码', trigger: 'blur' }
      },
      token: {
        Authorization: getToken()
      }
    }
  },
  created() {
  },
  methods: {
    // 获取用户信息
    getUserinfo() {
      getInfo().then(res => {
        this.userInfo = res.data
      })
    },
    // 编辑信息确认按钮
    onSubbmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateUser(this.userInfo).then(res => {
            this.$message({
              showClose: true,
              message: '信息修改成功',
              type: 'success'
            })
            store.dispatch('user/getInfo').then(res => {
              this.$router.push({ path: '/' })
            })
          })
        }
      })
    },

    uplodeSuccess(data) {
      if (data.code === 1) {
        return this.$message.error(data.message)
      }
      this.$message({
        showClose: true,
        message: '头像上传成功',
        type: 'success'
      })
      this.getUserinfo()
    }

  }
}
</script>

<style lang='scss'>
.block{
  text-align: center;
  margin-top: 50px;
  .upload-demo{
    margin-top: 10px;
  }
}
.user{
  margin-top: 50px;
  .el-form-item__label{
  font-size: 18px;
}
  .el-form-item__content{
    font-size: 17px;
  }
}
.input{
  width: 70%;
}
.avatar{
  img{
    width: 100%;
  }
}
</style>

