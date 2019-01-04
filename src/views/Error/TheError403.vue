<template>
  <theErrorTemplate error-type="403" error-descp="抱歉，你无权访问该页面" />
</template>
<script>
import TheErrorTemplate from './TheErrorTemplate'
export default {
  name: 'TheError403',
  components: {
    TheErrorTemplate
  }
}
</script>
