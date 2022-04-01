<template>
  <div class="article-list">
    <van-pull-refresh :success-text="refreshSuccessText" :success-duration="1500" v-model="isRefreshLoading" @refresh="onRefresh">
      <van-list v-model="loading" :error.sync="error" error-text="请求失败，点击重新加载" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <article-item v-for="(item, index) in list" :key="index" :articleItem="item"></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import articleItem from '@/components/article-item'
import { getArticleList } from '@/api/article'
export default {
  name: 'articleList',
  components: { articleItem },
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      refreshSuccessText: '',
      isRefreshLoading: false,
      error: false,
      list: [],
      loading: false,
      finished: false,
      timestamp: null // 请求获取下一页的时间戳
    }
  },
  methods: {
    async onLoad() {
      try {
        // 异步更新数据
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        // 模拟随机失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsnajndjsa')
        // }
        this.list.push(...data.results)
        this.loading = false
        if (data.results.length) {
          this.timestamp = data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id,
          timestamp: Date.now()
        })
        this.list.unshift(...data.results)
        this.isRefreshLoading = false
        this.refreshSuccessText = `刷新成功，更新了${data.results.length}条数据`
      } catch (error) {
        this.isRefreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 180px;
  bottom: 100px;
  overflow-y: auto; */
}
</style>
