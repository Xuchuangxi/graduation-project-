<template>
  <div class="index">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="新增班级课程表数据" />
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
      <el-form-item>
        <el-button type="primary" @click="addClass">添加到数据库</el-button>
      </el-form-item>
    </el-form>
    <el-upload
      class="upload-demo"
      drag
      action=""
      multiple
      accept=".xlsx"
      :on-exceed="exceed"
      :limit="1"
      :on-remove="remove"
      :http-request="uploadFile"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件(xlsx格式)拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>
    <div class="preview-excel">
      <el-table v-show="listTable.length>0" class="listTable_ele" border :data="listTable">
        <el-table-column prop="courseName" label="课程名" align="center" />
        <el-table-column prop="teacher" label="教师" align="center" />
        <el-table-column prop="classroom" label="教室" align="center" />
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
      </el-table>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { addCourse } from '@/api/course'
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
      listTable: [],
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
      form: {
        college: '',
        className: ''
      }
    }
  },
  methods: {
    // 解析excel
    async uploadFile(params) {
      const _file = params.file
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          for (const sheet in workbook.Sheets) {
            // 循环读取每个文件
            const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            // 若当前sheet没有数据，则continue
            if (sheetArray.length === 0) {
              continue
            }
            for (const item in sheetArray) {
              const rowTable = {}
              // 这里的rowTable的属性名注意要与上面表格的prop一致
              // sheetArray的属性名与上传的表格的列名一致
              rowTable.courseName = sheetArray[item].课程名
              rowTable.teacher = sheetArray[item].教师
              rowTable.classroom = sheetArray[item].教室
              rowTable.time = sheetArray[item].上课时间.split('，')
              rowTable.week = sheetArray[item].上课周数.split('，')

              this.listTable.push(rowTable)
            }
          }
        } catch (e) {
          this.$message.warning('文件类型不正确！')
        }
      }
      fileReader.readAsBinaryString(_file)
    },
    // 上传1个以上文件时弹窗提示错误
    exceed() {
      this.$message.error('最多只能同时上传1个xlsx文件')
    },
    // 删除文件
    remove() {
      this.listTable = []
    },
    addClass() {
      if (this.form.college === '' || this.form.className === '') {
        return this.$message.warning('输入学院和班级')
      }
      if (this.listTable.length === 0) {
        return this.$message.warning('请先点击下方上传1个xlsx文件')
      }

      this.listTable.forEach(item => {
        const arr = []
        item.week.forEach(a => {
          arr.push(Number(a))
        })
        item.week = arr
      })
      addCourse({ courseList: this.listTable, className: this.form.className, college: this.form.college, creator: this.$store.getters.username }).then(res => {
        this.$message.success('上传到数据库成功')
        this.listTable = []
      })
    }
  }
}
</script>

<style scope lang="scss">
.index{
  padding: 20px 50px;
  .el-upload{
    width: 100%;
    .el-upload-dragger{
      width: 100%;
    }
  }

}
.input{
  width: 200px;
}
</style>
