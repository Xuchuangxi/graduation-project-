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
          <el-form ref="form" label-width="100px" style="font-size:20px">
            <el-form-item label="用户名:">
              {{ userInfo.username }}
            </el-form-item>
            <el-form-item label="班级:">
              {{ userInfo.class }}
            </el-form-item>
            <el-form-item label="学号:">
              {{ userInfo.studentID }}
            </el-form-item>
            <el-form-item label="电话号码:">
              {{ userInfo.phoneNumber }}
            </el-form-item>
            <el-form-item label="性别:">
              {{ userInfo.sex === 0?'男':'女' }}
            </el-form-item>
            <el-form-item label="电子邮箱:">
              {{ userInfo.email }}
            </el-form-item>
            <el-form-item label="个人介绍:">
              {{ userInfo.introduce }}
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="editMessage">修改信息</el-button>
              <el-button type="primary" @click="editPassword">修改密码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="修改信息" :visible.sync="editMessageWindow" width="30%">
      <el-form ref="form" :model="userInfo" label-width="100px">
        <el-form-item label="用户名:">
          <el-input v-model="userInfo.username" class="input" />
        </el-form-item>
        <el-form-item label="班级:">
          <el-input v-model="userInfo.class" class="input" />
        </el-form-item>
        <el-form-item label="学号:">
          <el-input v-model="userInfo.studentID" class="input" />
        </el-form-item>
        <el-form-item label="电话号码:">
          <el-input v-model="userInfo.phoneNumber" class="input" />
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio-group v-model="userInfo.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电子邮箱:">
          <el-input v-model="userInfo.email" class="input" />
        </el-form-item>
        <el-form-item label="个人介绍:">
          <el-input v-model="userInfo.introduce" type="textarea" class="input" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editMessageWindow = false">取 消</el-button>
        <el-button type="primary" @click="onSubbmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="editPasswordWindow" width="30%">
      <el-form ref="ruleForm" :model="ruleForm" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldpass">
          <el-input v-model="ruleForm.oldpass" type="password" autocomplete="off" class="input" />
        </el-form-item>
        <el-form-item label="新密码" prop="newpass">
          <el-input v-model="ruleForm.newpass" type="password" autocomplete="off" class="input" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" class="input" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPasswordWindow = false">取 消</el-button>
        <el-button type="primary" @click="editPasswordWindow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getInfo, updateUser } from '@/api/user'
import { getToken } from '@/utils/auth'
export default {

  data() {
    return {
      editMessageWindow: false,
      editPasswordWindow: false,
      userInfo: {},
      editUser: {},
      ruleForm: {},
      token: {
        Authorization: getToken()
      }
    }
  },
  created() {
    this.getUserinfo()
  },
  methods: {
    // 获取用户信息
    getUserinfo() {
      getInfo().then(res => {
        this.userInfo = res.data
      })
    },
    // 编辑信息弹窗按钮
    editMessage() {
      this.editMessageWindow = true
    },
    // 编辑信息确认按钮
    onSubbmit() {
      updateUser(this.userInfo).then(res => {
        this.editMessageWindow = false
        this.getUserinfo()
        this.$message({
          showClose: true,
          message: '信息修改成功',
          type: 'success'
        })
      })
    },

    // 编辑密码弹窗按钮
    editPassword() {
      this.editPasswordWindow = true
    },
    uplodeSuccess(data) {
      console.log(data.code)
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

