<template>
  <div class="app-container" :class="{ 'sidebar-collapse': isSidebarCollapse }">
    <the-header class="header-container"></the-header>
    <the-sidebar class="sidebar-container"></the-sidebar>
    <div class="main-container" :class="{ collapse: isSidebarCollapse }">
      <the-tabs></the-tabs>
      <the-main></the-main>
    </div>
  </div>
</template>

<script>
import TheSidebar from './TheSidebar'
import TheHeader from './TheHeader'
import TheTabs from './TheTabs'
import TheMain from './TheMain'
import { mapGetters } from 'vuex'

export default {
  name: 'the-app',
  computed: {
    ...mapGetters(['isSidebarCollapse'])
  },
  components: {
    TheSidebar,
    TheHeader,
    TheTabs,
    TheMain
  }
}
</script>

<style scoped>
.app-container {
  height: 100%;
}
.header-container {
  z-index: 1002;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.sidebar-container {
  box-sizing: border-box;
  z-index: 1001;
  position: fixed;
  top: 0;
  left: 0;
  width: 201px;
  height: 100%;
  padding-top: 50px;
}

.sidebar-collapse .sidebar-container {
  width: 64px;
}

.main-container {
  position: relative;
  box-sizing: border-box;
  margin-left: 201px;
  padding-top: 50px;
  height: 100%;
  transition: margin-left 0.28s;
}

.main-container.collapse {
  margin-left: 64px;
}
</style>
