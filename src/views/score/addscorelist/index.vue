<template>
  <div class="index">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="message.userName" />
      </el-form-item>
      <el-form-item label="学年学期：">
        <el-select v-model="message.yearTerm" placeholder="请选择学年学期">
          <el-option
            v-for="item in yearTermList"
            :key="item.name"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-show="gradeList.length>0" type="primary" @click="add">添加课程成绩</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="gradeList" border>
      <el-table-column prop="name" label="课程名称" align="center" />
      <el-table-column prop="sort" label="课程大类" align="center" />
      <el-table-column prop="hours" label="学时" align="center" />
      <el-table-column prop="credit" label="学分" align="center" />
      <el-table-column prop="point" label="绩点" align="center" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteGrade( scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增课程成绩" :visible.sync="dialogVisible" width="30%" @close="closeWindow('form')">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入课程名称" class="input" />
        </el-form-item>
        <el-form-item label="课程大类" prop="sort">
          <el-select v-model="form.sort" placeholder="请选择课程大类" class="input">
            <el-option :key="1" label="专业课" value="专业课" />
            <el-option :key="2" label="选修课" value="选修课" />
          </el-select>
        </el-form-item>
        <el-form-item label="学时" prop="hours">
          <el-input v-model="form.hours" placeholder="请输入学时" class="input" />
        </el-form-item>
        <el-form-item label="学分" prop="credit">
          <el-input v-model="form.credit" placeholder="请输入学分" class="input" />
        </el-form-item>
        <el-form-item label="绩点" prop="point">
          <el-input v-model="form.point" placeholder="请输入绩点" class="input" />
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
import { userInfoByName } from '@/api/user'
import { getScoreById, updateScore } from '@/api/score'
export default {
  components: {},
  props: {},
  data() {
    return {
      id: '',
      message: {},
      yearTermList: [
        { name: '大一第一学期', value: 'gradeOneUp' },
        { name: '大一第二学期', value: 'gradeOneDown' },
        { name: '大二第一学期', value: 'gradeTwoUp' },
        { name: '大二第二学期', value: 'gradeTwoDown' },
        { name: '大三第一学期', value: 'gradeThreeUp' },
        { name: '大三第二学期', value: 'gradeThreeDown' },
        { name: '大四第一学期', value: 'gradeFourUp' },
        { name: '大四第二学期', value: 'gradeFourDown' }
      ],
      gradeList: [],
      dialogVisible: false,
      form: {},
      rules: {
        name: { required: true, message: '请输入课程名称', trigger: 'blur' },
        sort: { required: true, message: '请输入课程大类', trigger: 'change' },
        hours: { required: true, message: '请输入学时', trigger: 'blur' },
        credit: { required: true, message: '请输入学分', trigger: 'blur' },
        point: { required: true, message: '请输入绩点', trigger: 'blur' }
      }
    }
  },
  methods: {
    handleDownload() {
      console.log(this.yearTerm)
    },
    search() {
      userInfoByName({ username: this.message.userName }).then(res => {
        this.id = res.data.id
        getScoreById({ userId: res.data.id }).then(res => {
          this.gradeList = res.data[this.message.yearTerm]
        })
      })
    },
    add() {
      this.form = {}
      this.dialogVisible = true
    },
    // 删除课程成绩

    deleteGrade(del) {
      const newdata = this.gradeList.filter(item => {
        return item !== del
      })
      let data = {}
      switch (this.message.yearTerm) {
        case 'gradeOneUp':
          data = { userId: this.id, gradeOneUp: newdata }
          break
        case 'gradeOneDown':
          data = { userId: this.id, gradeOneDown: newdata }
          break
        case 'gradeTwoUp':
          data = { userId: this.id, gradeTwoUp: newdata }
          break
        case 'gradeTwoDown':
          data = { userId: this.id, gradeTwoDown: newdata }
          break
        case 'gradeThreeUp':
          data = { userId: this.id, gradeThreeUp: newdata }
          break
        case 'gradeThreeDown':
          data = { userId: this.id, gradeThreeDown: newdata }
          break
        case 'gradeFourUp':
          data = { userId: this.id, gradeFourUp: newdata }
          break
        case 'gradeFourDown':
          data = { userId: this.id, gradeFourUp: newdata }
          break
      }
      updateScore(data).then(res => {
        this.dialogVisible = false
        this.search()
        this.$message({
          message: '删除课程成绩成功',
          type: 'success'
        })
      })
    },
    // 弹窗提交
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let data = {}
          switch (this.message.yearTerm) {
            case 'gradeOneUp':
              data = { userId: this.id, gradeOneUp: this.gradeList.concat(this.form) }
              break
            case 'gradeOneDown':
              data = { userId: this.id, gradeOneDown: this.gradeList.concat(this.form) }
              break
            case 'gradeTwoUp':
              data = { userId: this.id, gradeTwoUp: this.gradeList.concat(this.form) }
              break
            case 'gradeTwoDown':
              data = { userId: this.id, gradeTwoDown: this.gradeList.concat(this.form) }
              break
            case 'gradeThreeUp':
              data = { userId: this.id, gradeThreeUp: this.gradeList.concat(this.form) }
              break
            case 'gradeThreeDown':
              data = { userId: this.id, gradeThreeDown: this.gradeList.concat(this.form) }
              break
            case 'gradeFourUp':
              data = { userId: this.id, gradeFourUp: this.gradeList.concat(this.form) }
              break
            case 'gradeFourDown':
              data = { userId: this.id, gradeFourUp: this.gradeList.concat(this.form) }
              break
          }

          updateScore(data).then(res => {
            this.dialogVisible = false
            this.search()
            this.$message({
              message: '添加课程成绩成功',
              type: 'success'
            })
          })
        }
      })
    },
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
