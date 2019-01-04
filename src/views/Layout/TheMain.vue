<template>
  <section class="the-main">
    <router-view></router-view>
  </section>
</template>

<script>
export default {
  name: 'the-main'
}
</script>

<style scoped>
.the-main {
  padding: 90px 0 0;
  position: absolute;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>
