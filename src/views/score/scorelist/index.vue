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
      按钮
    </el-button>
    <el-table :data="gradeList" border>
      <el-table-column prop="name" label="课程名称" align="center" />
      <el-table-column prop="sort" label="课程大类" align="center" />
      <el-table-column prop="hours" label="学时" align="center" />
      <el-table-column prop="credit" label="学分" align="center" />
      <el-table-column prop="point" label="绩点" align="center" />
    </el-table>
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
        this.allGradeList = res.data
        this.gradeList = res.data.gradeOneUp
      })
    },
    yearChange(data) {
      this.gradeList = this.allGradeList[data]
    },
    handleDownload() {
      console.log(this.yearTerm)
    }
  }
}
</script>
<style lang="scss" scoped>
.index{
  padding: 20px;
}
</style>
