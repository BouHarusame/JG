<template>
  <div class="access-test-container">
    <p>权限测试页面</p>
    <p>当前用户权限值{{access}}</p>
    <p>当权限值大于3时显示</p>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AccessTest',
  computed: {
    ...mapGetters(['access'])
  }
}
</script>
<style scoped>
</style>
