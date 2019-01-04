<template>
  <div class="signup-success">
    <div class="title">rs-spa-starter-vue</div>
    <div class="descp">
      <div class="icon-success"><i class="el-icon-success"></i></div>
      <div class="text-success">
        <p class="account-info">你的账户：{{account}}注册成功</p>
        <p class="active-info">激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件的链接激活账户。</p>
      </div>
      <div class="btn-group">
        <el-button type="primary">查看邮箱</el-button>
        <el-button @click="handleToHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SignupSuccess',
  props: {
    account: String
  },
  methods: {
    handleToHome() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
<style scoped>
.signup-success {
  width: 440px;
  & .title {
    margin-bottom: 30px;
  }
  & .icon-success {
    color: #409eff;
    font-size: 60px;
  }
  & .account-info {
    font-size: 16px;
    font-weight: bold;
    color: #1e1e1e;
  }
  & .active-info {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.43);
    line-height: 1.5;
  }
}
</style>
