<template>
    <el-tabs type="card" :value="currentTabName" @edit="handleTabsEdit" @tab-click="handleTabsClick">
      <el-tab-pane
        v-for="item in openedTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable = "item.closable"
      ></el-tab-pane>
    </el-tabs>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '@/store/mutation-types'

export default {
  name: 'the-tabs',
  computed: {
    ...mapGetters(['openedTabs', 'currentTabName'])
  },
  methods: {
    handleTabsEdit(targetName, action) {
      if (action === 'remove') {
        let openedTabs = this.openedTabs
        let nextTabName = this.currentTabName

        // change current tab if needed
        if (this.currentTabName === targetName) {
          openedTabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = openedTabs[index + 1] || openedTabs[index - 1]
              if (nextTab) {
                nextTabName = nextTab.name
              }
            }
          })
          this.$store.commit(types.SET_CURRENT_TAB_NAME, nextTabName)
          this.$router.push({ name: nextTabName })
        }

        // close tab
        const index = openedTabs.findIndex(value => value.name === targetName)
        this.$store.commit(types.REMOVE_TAB, index)
      }
    },
    handleTabsClick(tab, event) {
      this.$router.push({ name: tab.name })
    }
  }
}
</script>

<style scoped>
</style>
