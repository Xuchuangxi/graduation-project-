<template>
  <div class="index">

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="学院">
        <el-select v-model="listQuery.college" placeholder="请选择学院" clearable filterable @change="changeselect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addClass">新增班级</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column align="center" label="学院" prop="college" />
      <el-table-column align="center" label="班级" prop="className" />
      <el-table-column align="center" label="创建人" prop="creator" />
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdDate | date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="'/course/edit/'+scope.row._id">
            <el-button type="primary" size="mini">
              详情
            </el-button>
          </router-link>
          <el-button
            type="warning"
            size="mini"
            @click="editClass( scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteClass( scope.row._id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getpage" />
    <el-dialog :title="editORadd?'新增班级':'修改班级信息'" :visible.sync="dialogVisible" width="30%" @close="closeWindow('form')">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="学院" prop="college">
          <el-select v-model="form.college" placeholder="请选择学院" clearable filterable class="input">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="className">
          <el-input v-model="form.className" placeholder="请输入班级" class="input" />
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="form.creator" disabled class="input" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { getCourseList, addCourse, updateCourse, deleteCourse } from '@/api/course'
import Pagination from '@/components/Pagination'
import store from '@/store'
export default {
  components: { Pagination },
  filters: {
    date(data) {
      return new Date(data).toLocaleDateString()
    }
  },
  data() {
    return {
      options: [
        { value: '电信学院', label: '电信学院' },
        { value: '自动化学院', label: '自动化学院' },
        { value: '计算机学院', label: '计算机学院' },
        { value: '文法学院', label: '文法学院' },
        { value: '石油工程学院', label: '石油工程学院' },
        { value: '化学工程学院', label: '化学工程学院' },
        { value: '化学学院', label: '化学学院' },
        { value: '材料科学与工程学院', label: '材料科学与工程学院' },
        { value: '环境科学与工程学院', label: '环境科学与工程学院' },
        { value: '生物与食品工程学院', label: '生物与食品工程学院' },
        { value: '机电工程学院', label: '机电工程学院' },
        { value: '建筑工程学院', label: '建筑工程学院' },
        { value: '理学院', label: '理学院' },
        { value: '经济管理学院', label: '经济管理学院' },
        { value: '外国语学院', label: '外国语学院' },
        { value: '体育学院', label: '体育学院' },
        { value: '艺术与设计学院', label: '艺术与设计学院' }
      ],
      selectvalue: '',
      tableData: [],
      listQuery: {
        page: 1,
        limit: 8,
        college: ''
      },
      total: 0,
      dialogVisible: false,
      editORadd: false,
      form: {},
      rules: {
        college: { required: true, message: '请选择学院', trigger: 'change' },
        className: { required: true, message: '请输入班级', trigger: 'blur' }
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 获取列表信息
    getList() {
      getCourseList(this.listQuery).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    // 翻页调用
    getpage() {
      this.getList()
    },
    // 学院变化调用
    changeselect(data) {
      this.listQuery.college = data
      this.getList()
    },
    // 新增班级
    addClass() {
      this.form = {}
      this.editORadd = true
      this.dialogVisible = true
      this.form.creator = store.getters.username
    },
    // 编辑班级
    editClass(data) {
      this.editORadd = false
      this.dialogVisible = true
      this.form = data
    },
    // 弹窗提交
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.editORadd) {
            addCourse(this.form).then(res => {
              this.dialogVisible = false
              this.getList()
              this.$message({
                message: '添加班级成功',
                type: 'success'
              })
            })
          } else {
            updateCourse(this.form).then(res => {
              this.dialogVisible = false
              this.getList()
              this.$message({
                message: '修改班级信息成功',
                type: 'success'
              })
            })
          }
        }
      })
    },
    // 删除按钮
    deleteClass(_id) {
      deleteCourse({ _id: _id }).then(res => {
        this.getList()
        this.$message({
          message: '删除班级成功',
          type: 'success'
        })
      })
    },
    // 弹窗关闭
    closeWindow(formName) {
      this.$refs[formName].clearValidate()
    }
  }
}
</script>

<style lang="scss" scoped>
.index{
  padding: 20px;
}
.input{
  width: 80%;
}
</style>
