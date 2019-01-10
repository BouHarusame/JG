<template>
  <div class="login-container">
    <!-- <div class="login-title">
      <div class="wrap">
        <img src="../../assets/login/llogo.png" width="36" height="41">
        <span class="title">海军辅助舰船信息化管理系统</span>
      </div>
    </div>
    <div class="form-box">
      <el-form class="login-form" :model="loginForm" ref="loginForm">
        <div class="title-container">
          <h3 class="form-title">用户登录</h3>
        </div>

        <el-form-item>
          <span class="form-label">用户名：</span>
          <el-input type="text" v-model="loginForm.account" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <span class="form-label">密&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
          <el-input :type="passwordType" v-model="loginForm.password" placeholder="密码">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" style="" @click.native.prevent="handleLogin">登  录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">上海中船船舶设计技术国际家工程研究中心</div> -->
    <div class="login-content">
      <div class="login-left">
        <img src="./img/llogo.png" alt="logo">
        <p>综合保障管理系统</p>
      </div>
      <div class="line"></div>
      <div class="login-right">
        <el-form class="login-form" :model="loginForm" ref="loginForm">
          <el-form-item class="login-item-box">
            <i class="fa fa-user-o"></i><span class="login-line"></span><el-input type="text" v-model="loginForm.account" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item class="login-item-box">
            <i class="fa fa-unlock-alt"></i><span class="login-line"></span><el-input :type="passwordType" v-model="loginForm.password" placeholder="密码">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" style="" @click.native.prevent="handleLogin">登  录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login-bottom">
      <h4>海军装备研究院舰船所</h4>
      <p><i></i><span>上海中船船舶设计技术国家工程研究中心有限公司</span></p>
    </div>
  </div>
</template>

<script>
import * as storage from '../../utils/storage'
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        account: 'admin',
        password: '123456'
      },
      passwordType: 'password'
    }
  },
  methods: {
    switchVisibility() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },
    handleLogin() {
      storage.setItem('token', 'token')
      this.$router.push({ name: 'home' })
    },
    handleToSignUp() {
      this.$router.push({ name: 'signup' })
    }
  }
}
</script>

<style scoped lang="stylus">
.login-container
  max-width 1920px
  height 100%
  marign 0 auto
  display flex
  // background url('../../common/images/login-bg.jpg') no-repeat center
  background linear-gradient(#4493dd, #0876bf)
  justify-content center
  align-items center
  position relative
  .login-content
    width 1000px
    height 192px
    margin-bottom 130px
    display flex
    justify-content space-between
    align-items center
    .login-left
      width 480px
      img
        width 94px
        margin 0 auto 44px
        display block
      p
        font-size 36px
        color #ffffff
        font-weight bold
        text-align center
        letter-spacing 4px
    .login-right
      width 480px
      height 192px
      .login-form
        width 346px
        margin 0 auto
        .login-item-box
          width 346px
          height 42px
          border 1px solid #ffffff
          border-radius 22px
          overflow hidden
          .fa-user-o
            color #d9e5d9
            margin-left 15px
          .fa-unlock-alt
            color #d9e5d9
            margin-left 15px
          .login-line
            display block
            border-right 1px solid #d9e5d9
            height 24px
            width 0
            margin-left 10px
        .login-btn
          width 346px
          height 44px
          background #d9e5d9
          border-radius 22px
          color #1d5b8c
          line-height 20px
          text-align center
          font-size 24px
          margin-top 20px
    .line
      height 192px
      border-right 1px solid #eee0dd
  .login-bottom
    width 1000px
    height 120px
    text-align center
    color #ffffff
    position absolute
    left 50%
    bottom 0px
    margin-left -500px
    h4
      font-size 22px
      margin-bottom 10px
      font-weight 400
    p
      i
        display inline-block
        width 26px
        height 22px
        vertical-align middle
        background url('../../common/images/logodddd.png') no-repeat center
        background-size 100% 100%
        margin-right 3px
      span
        vertical-align middle
        font-size 22px
</style>
