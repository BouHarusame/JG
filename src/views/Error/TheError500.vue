<template>
  <TheErrorTemplate error-type="500" error-descp="抱歉，服务器出错了" />
</template>
<script>
import TheErrorTemplate from './TheErrorTemplate'
export default {
  name: 'TheError500',
  components: {
    TheErrorTemplate
  }
}
</script>
