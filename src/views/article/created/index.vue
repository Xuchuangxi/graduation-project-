<template>
  <div class="index">
    <el-button style="width:100px;float:right;margin-left:30px" type="success" @click="push">发布</el-button>
    <el-button style="width:100px;float:right" type="warning" @click="commit">存档</el-button>

    <h1>学习资料</h1>
    <MDinput v-model="postForm.title" :maxlength="100" name="name" class="title">
      标题
    </MDinput>
    <el-row>
      <el-col :span="8">
        作者：<el-input v-model="postForm.author" placeholder="请输入作者" class="input" />
      </el-col>

      <el-col :span="8">
        时间：<el-date-picker v-model="postForm.time" type="datetime" class="input" format="yyyy-MM-dd" placeholder="请选择时间" />
      </el-col>

      <el-col :span="8" style="float:left">
        <span style="float:left">推荐指数：</span><el-rate v-model="postForm.recommend" style="float:left" />
      </el-col>
    </el-row>
    <MDinput v-model="postForm.summary" :maxlength="100" name="name">
      摘要
    </MDinput>
    <Tinymce ref="editor" v-model="postForm.content" :height="400" class="tinymce1" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import { addArticle } from '@/api/article'
import store from '@/store'
export default {
  components: { Tinymce, MDinput },
  props: {},
  data() {
    return {
      postForm: {
      }
    }
  },
  mounted() {
    this.postForm.userId = store.getters.id
  },
  methods: {
    push() {
      this.postForm.status = 'public'
      addArticle(this.postForm).then(res => {
        this.postForm = { userId: store.getters.id, content: '' }
        this.$message({
          message: '文章发布成功',
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          message: '标题和作者是必填的',
          type: 'error'
        })
      })
    },
    commit() {
      this.postForm.status = 'draft'
      addArticle(this.postForm).then(res => {
        this.postForm = { userId: store.getters.id, content: '' }
        this.$message({
          message: '文章保存草稿成功',
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          message: '标题和作者是必填的',
          type: 'error'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.index{
  padding: 30px 80px;
  font-weight: 600;
  h1{
    text-align: center;
    letter-spacing:5px;
  }
  .title{
    margin-bottom: 20px;
    width: 500px;
  }
  .input{
    width: 50%;
  }
  .tinymce1{
    margin-top: 20px;
  }
}
</style>
