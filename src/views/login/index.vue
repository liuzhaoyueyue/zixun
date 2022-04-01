<template>
  <div class="login-container">
    <van-nav-bar @click-left="$router.back()" left-arrow class="page-nav-bar" title="登录" />

    <van-form ref="loginForm" @submit="onSubmit">
      <van-field type="number" class="login-input" v-model="user.mobile" name="mobile" placeholder="请输入手机号" :rules="rules.mobile">
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>

      <van-field class="login-input" v-model="user.code" name="code" placeholder="请输入验证码" :rules="rules.code">
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <van-count-down v-if="showCount" slot="button" :time="1000 * 5" format="ss s" @finish="showCount = false" />
        <van-button v-else @click="sendSms" class="send-sms-btn" round size="small" type="default" slot="button" native-type="button">发送验证码</van-button>
      </van-field>

      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getToken, getSms } from '@/api/login'
export default {
  name: 'login',
  data() {
    return {
      showCount: false,
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0 // 表示持续时间，0的时候是一直展示
      })

      try {
        const { data } = await getToken(this.user)
        this.$store.commit('setUser', data)
        this.$toast.success({
          message: '登录成功',
          duration: 1000 * 1
        })
        this.$router.push('/my')
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    async sendSms() {
      await this.$refs.loginForm.validate('mobile')
      this.showCount = true

      try {
        await getSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        this.showCount = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    margin: 53px 33px;
    .login-btn {
      color: #fff;
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
