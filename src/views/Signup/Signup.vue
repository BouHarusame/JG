<template>
  <div class="sign-up-container">
    <template v-if="success">
      <SignUpSuccess :account="formData.email"></SignUpSuccess>
    </template>
    <template v-else>
      <div class="signup-box">
        <h3 class="sign-title">rs-spa-starter-vue</h3>
        <el-form :model="formData" ref="signForm" class="sign-form" :rules="rules">
          <el-form-item prop="email">
            <el-input v-model="formData.email" placeholder="邮箱" />
          </el-form-item>
          <el-form-item prop="passd">
            <el-input v-model="formData.passd" placeholder="6 - 16位密码，区分大小写" type="password" />
          </el-form-item>

          <el-form-item prop="repeatPassd">
            <el-input v-model="formData.repeatPassd" placeholder="确认密码" type="password" />
          </el-form-item>

          <el-form-item prop="phone" class="phonenumber">
            <el-select value="86">
              <el-option value="86">+ 86</el-option>
            </el-select>
            <el-input v-model="formData.phone" placeholder="11位手机号" />
          </el-form-item>

          <el-form-item class="identify-code">
            <el-input v-model="formData.code" placeholder="输入验证码" />
            <el-button :disabled="disabled" @click="handleFetchCode">{{btnText}}</el-button>
          </el-form-item>

          <el-form-item class="signup-btn">
            <el-button type="primary" @click="handleClickSubmit('signForm')">注册</el-button>
            <el-button class="btn-text" @click="handleToLogin" type="text">使用已有帐户登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>
<script>
import SignUpSuccess from './SignupSuccess'
export default {
  name: 'SignUp',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.passd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        email: [
          {
            type: 'email',
            required: true,
            message: '请输入正确的邮箱地址',
            trigger: 'change'
          }
        ],
        passd: [
          {
            min: 6,
            max: 16,
            required: true,
            message: '请输入6-16位密码',
            trigger: 'change'
          }
        ],
        repeatPassd: [{ validator: validatePass, trigger: 'change' }],
        phone: [
          {
            pattern: /^1[3|4|5|7|8][0-9]{9}$/,
            message: '请输入正确的手机号',
            trigger: 'change'
          },
          { required: true, message: '手机号不能为空', trigger: 'change' }
        ]
      },
      formData: {
        email: '',
        passd: '',
        phone: '',
        code: '',
        repeatPassd: ''
      },
      success: false,
      disabled: false,
      btnText: '获取验证码',
      time: 60
    }
  },
  methods: {
    handleClickSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.success = true
        } else {
          return false
        }
      })
    },
    handleToLogin() {
      this.$router.push({ name: 'login' })
    },
    handleFetchCode() {
      setTimeout(() => {
        this.$message({
          type: 'info',
          message: '验证码已发送'
        })
        this.disabled = true
        this.handleTimer()
      }, 300)
    },
    handleTimer() {
      const timer = setInterval(() => {
        this.time--
        if (this.time > 0) {
          this.btnText = `${this.time}s后重送`
        } else {
          clearInterval(timer)
          this.btnText = '获取验证码'
          this.disabled = false
        }
      }, 1000)
    }
  },
  components: {
    SignUpSuccess
  }
}
</script>
<style scoped>
.sign-up-container {
  width: 100%;
  height: 100%;
  background: url(../../assets/signup_bg.jpg) no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.signup-box {
  width: 380px;
  & .sign-title {
    margin: 0 0 30px;
    padding: 0;
  }
  & .phonenumber {
    & .el-select {
      width: 72px;
    }
    & .el-input {
      width: 304px;
    }
  }
  & .identify-code {
    & .el-input {
      width: 264px;
    }
  }
  & .signup-btn {
    & .el-button {
      width: 48%;
    }
    & .btn-text {
      text-align: right;
    }
  }
}
</style>
