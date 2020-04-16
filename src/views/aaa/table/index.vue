<template>
  <div class="index">
    学年学期：
    <el-select v-model="yearTerm" placeholder="请选择学年学期">
      <el-option
        v-for="item in yearTermList"
        :key="item.name"
        :label="item.name"
        :value="item.name"
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
export default {
  components: {},
  props: {},
  data() {
    return {
      yearTerm: '',
      yearTermList: [
        { name: '大一第一学期' },
        { name: '大一第二学期' },
        { name: '大二第一学期' },
        { name: '大二第二学期' },
        { name: '大三第一学期' },
        { name: '大三第二学期' }
      ],
      gradeList: [
        { name: '高数', sort: '专业课', hours: 32, credit: 2, point: 3.2 }
      ]
    }
  },
  created() {},
  mounted() {},
  methods: {
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
