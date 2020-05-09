<template>
  <div class="dashboard-container">
    <el-carousel :interval="3000" type="card" height="300px" arrow="never">
      <el-carousel-item v-for="(item,index) in banner" :key="index" class="ecarousel_item">
        <img :src="item.url" alt="">
        <div class="medium">{{ item.title }}</div>
      </el-carousel-item>
    </el-carousel>
    <el-row :gutter="12">
      <el-col :span="12">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-s-home" /> 广油要闻</span>
            <div class="card">
              <p v-for="(item,index) in main" :key="index">
                <i class="el-icon-d-arrow-right" />
                <el-link class="link" :href="item.url" target="_blank">{{ item.name }}</el-link>
                <span>{{ item.time }}</span>
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-video-camera-solid" /> 媒体广油</span>
            <div class="card">
              <p v-for="(item,index) in student" :key="index">
                <i class="el-icon-d-arrow-right" />
                <el-link class="link" :href="item.url" target="_blank">{{ item.name }}</el-link>
                <span>{{ item.time }}</span>
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-message-solid" /> 通知公告</span>
            <div class="card">
              <p v-for="(item,index) in main" :key="index">
                <i class="el-icon-d-arrow-right" />
                <el-link class="link" :href="item.url" target="_blank">{{ item.name }}</el-link>
                <span>{{ item.time }}</span>
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-camera-solid" /> 校园动态</span>
            <div class="card">
              <p v-for="(item,index) in student" :key="index">
                <i class="el-icon-d-arrow-right" />
                <el-link class="link" :href="item.url" target="_blank">{{ item.name }}</el-link>
                <span>{{ item.time }}</span>
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-s-help" /> 学生讲座</span>
            <div class="card">
              <p v-for="(item,index) in main" :key="index">
                <i class="el-icon-d-arrow-right" />
                <el-link class="link" :href="item.url" target="_blank">{{ item.name }}</el-link>
                <span>{{ item.time }}</span>
              </p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="12">
        <div class="chart-container">
          <chart height="100%" width="100%" />
        </div>
      </el-col>

    </el-row>
    <div class="bottom">Copyright © 2020 广东石油化工学院 | 京ICP备16010358号-2</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Chart from '@/components/Charts/students'

export default {
  name: 'Dashboard',
  components: { Chart },
  data() {
    return {
      banner: [
        { url: require('@/assets/banner_images/gsh.jpg'), title: '校园简介' },
        { url: require('@/assets/banner_images/gyxq.jpg'), title: '广油西迁精神' },
        { url: require('@/assets/banner_images/gysyl.jpg'), title: '广油实验楼' },
        { url: require('@/assets/banner_images/gytsg.jpg'), title: '广油图书馆' }
      ],
      main: [
        { name: '【喜讯】广东石油化工学院荣获“2019年度全省征兵工作先进单位”称号', url: 'http://www.gdupt.edu.cn/detail_18801.html', time: '2020-4-8' },
        { name: '我校一项组织工作调研报告获茂名市组织工作优秀调研成果二等奖', url: 'http://www.gdupt.edu.cn/detail_18800.html', time: '2020-4-7' },
        { name: '【防控疫情广油在行动】广东石油化工学院开展开学安全生产专项检查', url: 'http://www.gdupt.edu.cn/detail_18799.html', time: '2020-4-3' },
        { name: '李华带队到包联单位坡咀社区开展创文调研及志愿服务工作', url: 'http://www.gdupt.edu.cn/detail_18795.html', time: '2020-4-3' },
        { name: '【喜讯】广东石油化工学院17个学生项目获“攀登计划”41.5万元立项', url: 'http://www.gdupt.edu.cn/detail_18793.html', time: '2020-4-3' },
        { name: '探索高水平科技成果与企业实际需求的精准对接机制', url: 'https://s.cloud.gmw.cn/gmrb/c/2020-03-31/1380173.shtml', time: '2020-4-1' },
        { name: '【羊城晚报】头版导读：产学研精准对接 广油实现科技成果高效转化', url: 'http://www.gdupt.edu.cn/detail_18777.html', time: '2020-4-1' },
        { name: '​广油科技成果转化再获新突破', url: 'http://news.ycwb.com/2020-03/28/content_727632.htm', time: '2020-4-1' }
      ],
      student: [
        { name: '【防控疫情广油在行动】广东石油化工学院开展开学安全生产专项检查', url: 'http://www.gdupt.edu.cn/detail_18799.html', time: '2020-4-3' },
        { name: '【喜讯】广东石油化工学院17个学生项目获“攀登计划”41.5万元立项', url: 'http://www.gdupt.edu.cn/detail_18793.html', time: '2020-4-3' },
        { name: '【喜讯】广东石油化工学院荣获“2019年度全省征兵工作先进单位”称号', url: 'http://www.gdupt.edu.cn/detail_18801.html', time: '2020-4-8' },
        { name: '我校一项组织工作调研报告获茂名市组织工作优秀调研成果二等奖', url: 'http://www.gdupt.edu.cn/detail_18800.html', time: '2020-4-7' },
        { name: '【羊城晚报】头版导读：产学研精准对接 广油实现科技成果高效转化', url: 'http://www.gdupt.edu.cn/detail_18777.html', time: '2020-4-1' },
        { name: '​广油科技成果转化再获新突破', url: 'http://news.ycwb.com/2020-03/28/content_727632.htm', time: '2020-4-1' },
        { name: '李华带队到包联单位坡咀社区开展创文调研及志愿服务工作', url: 'http://www.gdupt.edu.cn/detail_18795.html', time: '2020-4-3' },

        { name: '探索高水平科技成果与企业实际需求的精准对接机制', url: 'https://s.cloud.gmw.cn/gmrb/c/2020-03-31/1380173.shtml', time: '2020-4-1' }

      ],
      identity: ''

    }
  },
  computed: {
    ...mapGetters([
      'username',
      'id'

    ])
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.ecarousel_item {
  img{
    width: 100%;
    height: 100%;
  }
  div{
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: 600;
    color: white;
    padding-left: 20px;
    letter-spacing:4px;
    transform: translateY(-100%);
    background-color: rgba(0,0,0,0.4)
  }
}
.card{
  height: 350px;
  p{
    height: 25px;
    line-height: 25px;
    margin: 0;
    margin-bottom: 10px;
    .link{
      font-size: 16px;
       line-height: 25px;
    }
    span{
      color: #606266;
      float: right;
    }
  }
}
.chart-container{
  width: 100%;
  height: 420px;
}
.bottom{
  color: rgba(24, 10, 10, 0.8);
  padding: 40px 0 10px;
  text-align: center;
}
</style>
