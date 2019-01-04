<template>
  <TheErrorTemplate error-type="404" error-descp="抱歉，您访问的页面不存在" />
</template>
<script>
import TheErrorTemplate from './TheErrorTemplate'
export default {
  name: 'TheError404',
  components: {
    TheErrorTemplate
  }
}
</script>
