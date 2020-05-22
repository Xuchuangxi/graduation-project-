
<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="listQuery.username" placeholder="姓名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getPage">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="学号">
        <template slot-scope="scope">
          <span>{{ scope.row.studentID }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="班级">
        <template slot-scope="scope">
          <span>{{ scope.row.className }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="角色">
        <template slot-scope="scope">
          <span>{{ scope.row.roles | roles }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="open(scope.row)">
            分配权限
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPage" />
    <el-dialog :title="`${clickMessage.username}的权限`" :visible.sync="drawer" width="30%">
      <el-checkbox-group v-model="newRole" :min="1">
        <el-checkbox label="user">学生</el-checkbox>
        <el-checkbox label="admin">教师</el-checkbox>
        <el-checkbox label="super-admin">超级管理员</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getUserList, updateUserById } from '@/api/user'
export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    roles(status) {
      let role = ''
      if (status.indexOf('user') !== -1) {
        role += ' 学生、'
      }
      if (status.indexOf('admin') !== -1) {
        role += ' 教师、'
      }
      if (status.indexOf('super-admin') !== -1) {
        role += ' 超级管理员 '
      }
      return role
    }
  },
  data() {
    return {
      newRole: [],
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 8,
        username: ''
      },
      drawer: false,
      clickMessage: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getPage() {
      this.getList()
    },
    getList() {
      getUserList(this.listQuery).then(res => {
        this.list = res.data.list
        this.total = res.data.total
      })
    },
    open(data) {
      this.drawer = true
      this.clickMessage = data
      console.log(this.clickMessage)

      this.newRole = data.roles
    },
    onSubmit() {
      console.log(this.newRole)

      updateUserById({ _id: this.clickMessage._id, roles: this.newRole }).then(res => {
        this.drawer = false
        this.getList()
        this.$message({
          message: `修改${this.clickMessage.username}权限成功`,
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
