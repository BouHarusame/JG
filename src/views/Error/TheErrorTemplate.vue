<template>
  <div class="error-container">
    <div :class="`${errorClasses} error`">
      <img class="error-pic" :src="errorPic">
      <div class="error-descp">
        <img class="error-num-pic" :src="errorNumPic">
        <p>{{errorDescp}}</p>
        <el-button size="small" type="primary" @click.native="handleToHome">返回首页</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TheErrorTemplate',
  props: {
    errorType: {
      type: [String, Number],
      required: true
    },
    errorDescp: {
      type: String,
      required: true
    }
  },
  methods: {
    handleToHome() {
      this.$router.push({ name: 'home' })
    }
  },
  computed: {
    errorClasses() {
      return `error-${this.errorType}`
    },
    errorPic() {
      return require(`../../assets/error/${this.errorType}_pic.png`)
    },
    errorNumPic() {
      return require(`../../assets/error/${this.errorType}.png`)
    }
  }
}
</script>
<style scoped>
.error-container {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
}
.error {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  & .error-pic {
    height: auto;
  }
  & .error-num-pic {
    width: 153px;
    height: 68px;
  }
  & .error-descp {
    text-align: left;
  }
}
.error-404 {
  max-width: 878px;
  & .error-pic {
    width: 482px;
  }
  & .error-descp {
    width: 241px;
    height: 168px;
  }
}
.error-403 {
  max-width: 736px;
  & .error-pic {
    width: 243px;
  }
  & .error-descp {
    width: 221px;
    height: 168px;
  }
}
.error-500 {
  max-width: 819px;
  & .error-pic {
    width: 486px;
  }
  & .error-descp {
    width: 181px;
    height: 136px;
  }
}
</style>
