<template>
  <div class="btn-group">
    <el-button-group>
      <el-button @click="handleClick(btn, $event)" type="primary" size="mini" v-for="(btn, index) in btnGroup" :key="index" :icon="btn.icon" :disabled="btn.disabled">{{btn.name}}</el-button>
    </el-button-group>
  </div>
</template>
<script>
export default {
  name: 'TableBar',
  props: {
    btnGroup: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    handleClick(btn, $event) {
      this.$emit('click', { type: btn.eventType, event: $event })
    }
  }
}
</script>
