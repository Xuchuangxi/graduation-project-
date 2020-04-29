<template>
  <div class="index">
    周数：
    <el-select v-model="week" placeholder="请选择">
      <el-option
        v-for="item in 20"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
    <el-button style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
      Export Excel
    </el-button>
    <div class="table">
      <div class="tableTop">
        <div class="tableitem">时间/星期</div>
        <div class="tableitem">星期一</div>
        <div class="tableitem">星期二</div>
        <div class="tableitem">星期三</div>
        <div class="tableitem">星期四</div>
        <div class="tableitem">星期五</div>
      </div>
      <div class="tableLeft">
        <div class="tableitem">1~2节</div>
        <div class="tableitem">3~4节</div>
        <div class="tableitem">5~6节</div>
        <div class="tableitem">7~8节</div>
        <div class="tableitem">9~10节</div>
      </div>
      <div v-for="item in num" :key="item" class="tableContent">
        <div v-for="item1 in num" :key="item1" class="tableitem" @click="change(list2[item][item1])">
          <p v-show="show(item,item1)" class="pone">{{ list2[item][item1].courseName }} </p>
          <p v-show="show(item,item1)" class="ptwo">{{ list2[item][item1].classroom }} {{ list2[item][item1].teacher }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCourse } from '@/api/course'
import store from '@/store'
export default {
  components: {},
  props: {},
  data() {
    return {
      week: 1,
      num: [0, 1, 2, 3, 4],
      list: [],
      list2: [
        [{ week: '' }, { week: '' }, { week: '' }, { week: '' }, { week: '' }],
        [{ week: '' }, { week: '' }, { week: '' }, { week: '' }, { week: '' }],
        [{ week: '' }, { week: '' }, { week: '' }, { week: '' }, { week: '' }],
        [{ week: '' }, { week: '' }, { week: '' }, { week: '' }, { week: '' }],
        [{ week: '' }, { week: '' }, { week: '' }, { week: '' }, { week: '' }]
      ]
    }
  },
  mounted() {
    this.formatList()
  },
  methods: {
    formatList() {
      getCourse({ className: store.getters.className }).then(res => {
        this.list2 = res.data
      })
    },
    show(a, b) {
      const data = this.list2[a][b].week
      if (data.indexOf(this.week) === -1) {
        return false
      }
      return true
    },
    change(data) {

    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['', '星期一', '星期二', '星期三', '星期四', '星期五']
        // const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        // const list = this.list

        // const data = this.formatJson(filterVal, list)
        const data = this.size(this.list2)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '课程表',
          autoWidth: true,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    size(data) {
      const a = [['1-2'], ['3-4'], ['5-6'], ['7-8'], ['9-10']]
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
      }
      return a
    }
  }
}
</script>
<style lang="scss" scoped>
.index{
  padding: 20px;
  .table{
    border: 1px solid black;
    width: 80%;
    margin-left: 10%;
    .tableTop{
      display: flex;
    }
    .tableLeft{
      width: 16.6%;
      float: left;
    }
    .tableContent{
      width: 83.4%;
      float: left;
      display: flex;
    }
    .tableitem{
      flex: 1;
      border: 1px solid black;
      text-align: center;
      height: 80px;
      line-height: 80px;
      p{
        line-height: 30px;
        height: 30px;
        margin: 0;
        margin-top: 5px;
        font-size: 14px;
      }
      .pone{
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 2px
      }
    }
  }
}
</style>
