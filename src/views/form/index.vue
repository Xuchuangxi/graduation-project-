<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6">
        <div class="block">
          <el-avatar shape="square" :size="150" :src="squareUrl" />
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="1"
          >
            <el-button type="primary">编辑头像</el-button>
          </el-upload>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="user">
          <el-form ref="form" label-width="100px" style="font-size:20px">
            <el-form-item label="用户名:">
              徐创玺
            </el-form-item>
            <el-form-item label="班级:">
              班级
            </el-form-item>
            <el-form-item label="学号:">
              学号
            </el-form-item>
            <el-form-item label="电话号码:">
              电话号码
            </el-form-item>
            <el-form-item label="性别:">
              <el-radio value="0" disabled label="0">男</el-radio>
              <el-radio value="0" disabled label="1">女</el-radio>
            </el-form-item>
            <el-form-item label="电子邮箱:">
              电子邮箱
            </el-form-item>
            <el-form-item label="个人介绍:">
              个人介绍
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
      <el-form ref="form" :model="editUser" label-width="100px">
        <el-form-item label="用户名:">
          <el-input v-model="editUser.userName" class="input" />
        </el-form-item>
        <el-form-item label="班级:">
          <el-input v-model="editUser.userName" class="input" />
        </el-form-item>
        <el-form-item label="学号:">
          <el-input v-model="editUser.userName" class="input" />
        </el-form-item>
        <el-form-item label="电话号码:">
          <el-input v-model="editUser.userName" class="input" />
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio value="0" disabled label="0">男</el-radio>
          <el-radio value="0" disabled label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="电子邮箱:">
          <el-input v-model="editUser.userName" class="input" />
        </el-form-item>
        <el-form-item label="个人介绍:">
          <el-input v-model="editUser.userName" type="textarea" class="input" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editMessageWindow = false">取 消</el-button>
        <el-button type="primary" @click="editMessageWindow = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="editPasswordWindow" width="30%">
      <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
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
export default {
  data() {
    return {
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      editMessageWindow: false,
      editPasswordWindow: false,
      editUser: {},
      ruleForm: {}
    }
  },
  methods: {
    // 编辑信息弹窗按钮
    editMessage() {
      this.editMessageWindow = true
    },
    // 编辑密码弹窗按钮
    editPassword() {
      this.editPasswordWindow = true
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

</style>

