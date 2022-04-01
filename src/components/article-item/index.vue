<template>
  <van-cell class="article-item">
    <div class="van-multi-ellipsis--l2 title" slot="title">{{ articleItem.title }}</div>
    <van-image class="right-cover" v-if="articleItem.cover.type === 1" :src="articleItem.cover.images[0]" />
    <template v-slot:label>
      <div class="cover-wrap" v-if="articleItem.cover.type === 3">
        <div class="cover-item" v-for="(item, index) in articleItem.cover.images" :key="index">
          <van-image class="cover-item-img" fit="cover" :src="item" />
        </div>
      </div>
      <div class="label-info">
        <span>{{ articleItem.aut_name }}</span>
        <span>{{ articleItem.comm_count }}评论</span>
        <span>{{ articleItem.pubdate | relativeTime }}</span>
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'articleItem',
  props: {
    articleItem: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .right-cover {
    width: 100%;
    height: 146px;
  }
  .label-info {
    span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
