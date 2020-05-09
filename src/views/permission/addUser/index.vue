<template>
  <div class="index">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="新增用户数据">
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
        <el-table-column prop="className" label="班级" align="center" />
        <el-table-column prop="studentID" label="学号" align="center" />
        <el-table-column prop="username" label="姓名" align="center" />
        <el-table-column prop="password" label="密码" align="center" />
        <el-table-column prop="email" label="邮箱" align="center" />
        <el-table-column prop="phoneNumber" label="电话号码" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { adminAddUsers } from '@/api/user'
export default {
  data() {
    return {
      listTable: []
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
              rowTable.className = sheetArray[item].班级
              rowTable.studentID = sheetArray[item].学号
              rowTable.username = `${sheetArray[item].姓名}`
              rowTable.password = `${sheetArray[item].密码}`
              rowTable.email = sheetArray[item].邮箱
              rowTable.phoneNumber = sheetArray[item].电话号码
              this.listTable.push(rowTable)
            }
            console.log(this.listTable)
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
      if (this.listTable.length === 0) {
        return this.$message.warning('请先点击下方上传1个xlsx文件')
      }
      adminAddUsers({ list: this.listTable }).then(res => {
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
</style>
