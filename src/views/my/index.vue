<template>
  <div class="My-container">
    <!-- 已登录的头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <span class="left-text">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button round size="mini">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录的头部 -->

    <!-- 未登录的头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="not-avatar" src="~@/assets/mobile.png" alt="" />
        <span class="not-text">登录 / 注册</span>
      </div>
    </div>
    <!-- /未登录的头部 -->

    <!-- 宫格区域 -->
    <van-grid class="my-grid" clickable :column-num="2">
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /宫格区域 -->

    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell v-if="user" @click="logout" title="退出登录" clickable class="logout" />
  </div>
</template>

<script>
import { getUserInfo } from '@/api/login'
import { mapState } from 'vuex'
export default {
  name: 'My',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '确认退出吗？'
        })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('取消执行')
        })
    },
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data
      } catch (error) {
        this.$toast('获取用户资料失败')
      }
    }
  },
  created() {
    if (this.user) {
      this.getUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.My-container {
  .header {
    height: 361px;
    background-image: url('~@/assets/banner.png');
    background-size: cover;
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          border: 5px solid #fff;
          margin-right: 14px;
          width: 132px;
          height: 132px;
        }
        .left-text {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        flex: 1;
        height: 130px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .not-avatar {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .not-text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .my-grid {
    margin-bottom: 10px;
    .grid-item {
      height: 141px;
      .iconfont {
        font-size: 46px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      span {
        font-size: 28px;
      }
    }
  }
  .logout {
    text-align: center;
    margin-top: 10px;
    color: #d86262;
  }
}
</style>
