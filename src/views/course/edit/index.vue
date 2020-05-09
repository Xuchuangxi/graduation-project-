<template>
  <div class="index">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addcourse">新增课程</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column align="center" label="课程名" prop="courseName" />
      <el-table-column align="center" label="教师" prop="teacher" />
      <el-table-column align="center" label="教室" prop="classroom" />
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time | times }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="周数">
        <template slot-scope="scope">
          <span>{{ scope.row.week | weeks }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deletecourse( scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增课程" :visible.sync="dialogVisible" width="55%" @close="closeWindow('form')">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="课程名" prop="courseName">
          <el-input v-model="form.courseName" placeholder="请输入课程名" class="input" />
        </el-form-item>
        <el-form-item label="教师" prop="teacher">
          <el-input v-model="form.teacher" placeholder="请输入教师" class="input" />
        </el-form-item>
        <el-form-item label="教室" prop="classroom">
          <el-input v-model="form.classroom" placeholder="请输入教室" class="input" />
        </el-form-item>
        <el-form-item label="上课时间" prop="time">
          <el-cascader v-model="form.time" :options="options" :props="{ multiple: true }" clearable class="input" />
        </el-form-item>
        <el-form-item label="周数" prop="week">
          <el-checkbox v-model="weeks.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox v-model="weeks.checkOne" @change="handleCheckOneChange">单周</el-checkbox>
          <el-checkbox v-model="weeks.checkTwo" @change="handleCheckTwoChange">双周</el-checkbox>
          <el-checkbox-group v-model="selectWeek">
            <el-checkbox v-for="item in weeks.value" :key="item" :label="item">{{ item }}</el-checkbox>
          </el-checkbox-group>
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
import { getCourseById, updateCourse } from '@/api/course'
export default {
  filters: {
    times(data) {
      let time = ''
      const map = ['一', '二', '三', '四', '五']
      data.forEach(item => {
        const index = item.split('-')
        time += (`星期${map[Number(index[0]) - 1]}第${index[1]}节/  `)
      })
      return time
    },
    weeks(data) {
      let week = ''
      data.forEach(item => {
        week = week + item + ','
      })
      return week
    }
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {},
      selectWeek: [],
      weeks: {
        value: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        checkAll: false,
        checkOne: false,
        checkTwo: false
      },
      rules: {
        courseName: { required: true, message: '请输入课程名', trigger: 'change' },
        teacher: { required: true, message: '请输入老师', trigger: 'blur' },
        classroom: { required: true, message: '请输入班级', trigger: 'blur' },
        time: { required: true, message: '请输入上课时间', trigger: 'blur' }
      },
      options: [
        {
          value: 1,
          label: '星期一',
          children: [
            { value: 1, label: '1-2节' },
            { value: 2, label: '3-4节' },
            { value: 3, label: '5-6节' },
            { value: 4, label: '7-8节' },
            { value: 5, label: '9-10节' }
          ]
        },
        {
          value: 2,
          label: '星期二',
          children: [
            { value: 1, label: '1-2节' },
            { value: 2, label: '3-4节' },
            { value: 3, label: '5-6节' },
            { value: 4, label: '7-8节' },
            { value: 5, label: '9-10节' }
          ]
        },
        {
          value: 3,
          label: '星期三',
          children: [
            { value: 1, label: '1-2节' },
            { value: 2, label: '3-4节' },
            { value: 3, label: '5-6节' },
            { value: 4, label: '7-8节' },
            { value: 5, label: '9-10节' }
          ]
        },
        {
          value: 4,
          label: '星期四',
          children: [
            { value: 1, label: '1-2节' },
            { value: 2, label: '3-4节' },
            { value: 3, label: '5-6节' },
            { value: 4, label: '7-8节' },
            { value: 5, label: '9-10节' }
          ]
        },
        {
          value: 5,
          label: '星期五',
          children: [
            { value: 1, label: '1-2节' },
            { value: 2, label: '3-4节' },
            { value: 3, label: '5-6节' },
            { value: 4, label: '7-8节' },
            { value: 5, label: '9-10节' }
          ]
        }

      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getCourseById({ id: this.$route.params.id }).then(res => {
        this.tableData = res.data.courseList
      })
    },
    // 新增课程
    addcourse() {
      this.form = {}
      this.weeks.checkAll = false
      this.weeks.checkOne = false
      this.weeks.checkTwo = false
      this.selectWeek = []
      this.dialogVisible = true
    },
    // 删除课程
    deletecourse(del) {
      const newdata = this.tableData.filter(item => {
        return item !== del
      })
      const data = {
        _id: this.$route.params.id,
        courseList: newdata
      }
      updateCourse(data).then(res => {
        this.dialogVisible = false
        this.getList()
        this.$message({
          message: '添加班级成功',
          type: 'success'
        })
      })
    },
    // 弹窗提交
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.time.forEach((item, index) => {
            this.form.time[index] = item[0] + '-' + item[1]
          })
          this.form.week = this.selectWeek

          const data = {
            _id: this.$route.params.id,
            courseList: this.tableData.concat(this.form)
          }
          updateCourse(data).then(res => {
            this.dialogVisible = false
            this.getList()
            this.$message({
              message: '添加班级成功',
              type: 'success'
            })
          })
        }
      })
    },
    handleCheckAllChange(val) {
      this.selectWeek = val ? this.weeks.value : []
      this.weeks.checkAll = val
      this.weeks.checkOne = false
      this.weeks.checkTwo = false
    },
    handleCheckOneChange(val) {
      this.weeks.checkOne = val
      this.weeks.checkAll = false
      this.weeks.checkTwo = false
      if (val) {
        this.selectWeek = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
      } else {
        this.selectWeek = []
      }
    },
    handleCheckTwoChange(val) {
      this.weeks.checkTwo = val
      this.weeks.checkAll = false
      this.weeks.checkOwo = false
      if (val) {
        this.selectWeek = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
      } else {
        this.selectWeek = []
      }
    },
    closeWindow(formName) {
      this.$refs[formName].clearValidate()
    }
  }
}
</script>

<style>
.index{
  padding: 30px;
}
.input{
  width: 50%;
}
</style>
