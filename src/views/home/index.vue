<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar">
      <van-button round icon="search" class="search-btn" slot="title" type="info" size="small">搜索</van-button>
    </van-nav-bar>

    <van-tabs class="channel-tabs" v-model="active" swipeable>
      <van-tab v-for="channel in channelList" :key="channel.id" :title="channel.name">
        <article-list :channel="channel"></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import articleList from './components/article-list.vue'
import { getUserChannel } from '@/api/channel'
export default {
  name: 'home',
  components: { articleList },
  data() {
    return {
      channelList: [],
      active: 0
    }
  },
  created() {
    this.getUserChannel()
  },
  methods: {
    async getUserChannel() {
      try {
        const {
          data: { channels }
        } = await getUserChannel()
        this.channelList = channels
      } catch (error) {
        this.$toast('获取频道列表失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  ::v-deep .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon-search {
      color: #fff;
      font-size: 32px;
    }
  }
  ::v-deep .channel-tabs {
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: rgba(255, 255, 255, 0.902);
      i.iconfont {
        font-size: 33px;
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }
    }
  }
}
</style>
