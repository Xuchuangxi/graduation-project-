
<template>
  <div class="app-container">
    <el-button style="margin-bottom:15px" type="primary">新建文章</el-button>
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column width="180px" align="center" label="日期">
        <template slot-scope="scope">
          <span>{{ scope.row.time |time }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="推荐等级">
        <template slot-scope="scope">
          <el-rate v-model="scope.row.recommend" disabled />
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" align="center" label="状态" width="110">
        <template slot-scope="{row}">
          <el-tag effect="dark" :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="标题">
        <template slot-scope="{row}">
          <router-link :to="'/example/edit/'+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="open(scope.row)">
            详情
          </el-button>
          <el-button type="danger" size="small" @click="deletearticle(scope.row._id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getPage" />
    <el-dialog :title="clickMessage.title" :visible.sync="drawer" width="60%">

      <Tinymce ref="editor" v-model="clickMessage.content" :height="350" class="tinymce1" />

    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getArticleList, deleteArticle } from '@/api/article'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'ArticleList',
  components: { Pagination, Tinymce },
  filters: {
    statusFilter(status) {
      const statusMap = {
        public: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    time(data) {
      return new Date(data).toLocaleDateString()
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      drawer: false,
      clickMessage: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getPage() {
      this.getList()
    },
    getList() {
      getArticleList(this.listQuery).then(res => {
        this.list = res.data.list
        this.total = res.data.total
      })
    },
    open(data) {
      this.drawer = true
      this.clickMessage = data
    },
    deletearticle(data) {
      deleteArticle({ _id: data }).then(res => {
        this.getList()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
