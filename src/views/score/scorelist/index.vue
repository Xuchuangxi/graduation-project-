<template>
  <div class="index">
    学年学期：
    <el-select v-model="yearTerm" placeholder="请选择学年学期" @change="yearChange">
      <el-option
        v-for="item in yearTermList"
        :key="item.name"
        :label="item.name"
        :value="item.value"
      />
    </el-select>
    <el-button style="margin:0 0 20px 20px;" type="primary" @click="handleDownload">
      导出成绩表
    </el-button>
    <el-table :data="gradeList" border>
      <el-table-column prop="name" label="课程名称" align="center" />
      <el-table-column prop="sort" label="课程大类" align="center" />
      <el-table-column prop="hours" label="学时" align="center" />
      <el-table-column prop="credit" label="学分" align="center" />
      <el-table-column prop="point" label="绩点" align="center" />
    </el-table>
    <div class="average">总学分：{{ allscore }}&nbsp;&nbsp;&nbsp;&nbsp;平均绩点：{{ averagescore }}</div>
  </div>
</template>

<script>
import { getScoreById } from '@/api/score'
import store from '@/store'
export default {
  components: {},
  props: {},
  data() {
    return {
      yearTerm: 'gradeOneUp',
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
      allscore: 0,
      averagescore: 0,
      gradeList: [],
      allGradeList: {}
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getScoreById({ userId: store.getters.id }).then(res => {
        let allPoint = 0
        this.allscore = 0
        this.averagescore = 0
        this.allGradeList = res.data
        this.gradeList = res.data.gradeOneUp
        this.gradeList.forEach(item => {
          this.allscore += Number(item.credit)
          allPoint += Number(item.credit) * Number(item.point)
        })
        this.averagescore = (allPoint / this.allscore).toFixed(2)
      })
    },
    yearChange(data) {
      let allPoint = 0
      this.allscore = 0
      this.averagescore = 0
      this.gradeList = this.allGradeList[data]
      this.gradeList.forEach(item => {
        this.allscore += Number(item.credit)
        allPoint += Number(item.credit) * Number(item.point)
      })
      this.averagescore = (allPoint / this.allscore).toFixed(2)
    },
    handleDownload() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['学年学期', '课程名称', '课程大类', '学时', '学分', '绩点']
        // const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        // const list = this.list

        // const data = this.formatJson(filterVal, list)
        const data = this.size(this.allGradeList)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: `${store.getters.username}的成绩单`,
          autoWidth: true,
          bookType: this.bookType
        })
      })
    },
    size(data) {
      const a = []
      /*
      for (let index = 0; index < 5; index++) {
        for (let index1 = 0; index1 < 5; index1++) {
          if (data[index][index1].courseName === '') {
            a[index].push('')
          } else {
            a[index].push(data[index][index1].courseName +
          '-' + data[index][index1].classroom + '-【' +
          data[index][index1].week + '】')
          }
        }
      }*/
      for (let index = 0; index < this.yearTermList.length; index++) {
        let alls = 0
        let allp = 0
        data[this.yearTermList[index].value].forEach(item => {
          allp += Number(item.credit) * Number(item.point)
          alls += Number(item.credit)
          a.push([this.yearTermList[index].name].concat(item.name).concat(item.sort).concat(item.hours).concat(item.credit).concat(item.point))
        })
        if (data[this.yearTermList[index].value].length > 0) {
          a.push(['平均绩点:', '', '', '', alls, `${(allp / alls).toFixed(2)}`])
          a.push([])
        }
      }

      return a
    }
  }
}
</script>
<style lang="scss" scoped>
.index{
  padding: 20px;
}
.average{
  margin-top: 20px;
  margin-right: 30px;
  float: right;
}
</style>
