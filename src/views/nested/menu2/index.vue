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
          <p v-show="show(list2[item][item1])" class="pone">{{ list2[item][item1].courseName }} </p>
          <p v-show="show(list2[item][item1])" class="ptwo">{{ list2[item][item1].classroom }} {{ list2[item][item1].teacher }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      week: 1,
      num: [0, 1, 2, 3, 4],
      list: [
        [
          { courseName: '', week: [], teacher: '', classroom: '' },
          { courseName: '高数1-2', week: [1, 2, 3, 5, 6], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数1-3', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数1-4', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数1-5', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' }
        ],
        [
          { courseName: '高数2-1', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数2-2', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数2-3', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数2-4', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数2-5', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' }
        ],
        [
          { courseName: '高数3-1', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数3-2', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数3-3', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数3-4', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数3-5', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' }
        ],
        [
          { courseName: '高数4-1', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数4-2', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数4-3', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数4-4', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数4-5', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' }
        ],
        [
          { courseName: '高数5-1', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数5-2', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数5-3', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数5-4', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' },
          { courseName: '高数5-5', week: [1, 2, 3], teacher: 'xxxx', classroom: '西404' }
        ]

      ],
      list2: [
        [], [], [], [], []
      ]
    }
  },
  created() {
    this.formatList()
  },
  mounted() {},
  methods: {
    formatList() {
      for (let index = 0; index < this.list.length; index++) {
        for (let timeIndex = 0; timeIndex < 5; timeIndex++) {
          this.list2[timeIndex][index] = this.list[index][timeIndex]
        }
      }
    },
    show(data) {
      if (data.week.indexOf(this.week) === -1) {
        return false
      }
      return true
    },
    change(data) {
      console.log(data)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['', '星期一', '星期二', '星期三', '星期四', '星期五']
        // const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        // const list = this.list

        // const data = this.formatJson(filterVal, list)
        const data = this.aaa(this.list2)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    aaa(data) {
      const a = [['12'], ['34'], ['56'], ['78'], ['910']]
      for (let index = 0; index < 5; index++) {
        for (let index1 = 0; index1 < 5; index1++) {
          a[index].push(data[index][index1].courseName + '-' + data[index][index1].classroom)
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
