<template>
  <div class="error-page-container">
    <el-card class="card-box">
      <div slot="header">
        403错误页面
      </div>
      <div class="card-content">
        <div class="error-box">
          <TheError403 />
        </div>
        <p class="card-descp">当访问的页面不存在时会跳转到404页面</p>
      </div>
    </el-card>
    <el-card class="card-box">
      <div slot="header">
        404错误页面
      </div>
      <div class="card-content">
        <div class="error-box">
          <TheError404 />
        </div>
        <p class="card-descp">在当前登录用户不具有执行当前操作的权限时跳转到该页面</p>
      </div>
    </el-card>
    <el-card class="card-box">
      <div slot="header">
        500错误页面
      </div>
      <div class="card-content">
        <div class="error-box">
          <TheError500 />
        </div>
        <p class="card-descp">当请求之后出现服务端错误时跳转到该页面</p>
      </div>
    </el-card>
  </div>
</template>
<script>
import TheError404 from './TheError404'
import TheError403 from './TheError403'
import TheError500 from './TheError500'

export default {
  name: 'ErrorPage',
  components: {
    TheError403,
    TheError404,
    TheError500
  }
}
</script>
<style>
.error-page-container {
  background: #f0f2f5;
  padding-top: 20px;
  & .card-box {
    margin: 0 0 20px 20px;
  }
  & .error-box {
    margin-right: 40px;
  }
  & .error {
    max-width: 800px !important;
    width: 800px !important;
    height: 400px !important;
  }
  & .card-content {
    display: flex;
    align-items: center;
  }
  & .card-descp {
    font-size: 14px;
    color: #495060;
    line-height: 1.5;
    text-align: center;
  }
}
</style>
