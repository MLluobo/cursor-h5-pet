<template>
  <div class="login-page">
    <!-- 顶部返回 -->
    <div class="nav-bar">
      <div class="back" @click="router.back()">
        <svg-icon name="arrow-right" :size="20" color="#333" class="back-icon"/>
      </div>
      <div class="title">登录</div>
    </div>

    <!-- 登录表单 -->
    <div class="login-form">
      <div class="form-title">
        <h2>欢迎登录</h2>
        <p>登录后享受更多服务</p>
      </div>

      <!-- 手机号输入 -->
      <div class="form-item">
        <van-field
          v-model="phone"
          type="tel"
          maxlength="11"
          placeholder="请输入手机号"
          :formatter="formatPhone"
          @focus="isFocusPhone = true"
          @blur="isFocusPhone = false"
        >
          <template #left-icon>
            <svg-icon 
              name="phone" 
              :size="20" 
              :color="isFocusPhone ? 'var(--primary-gradient-start)' : '#999'"
            />
          </template>
        </van-field>
      </div>

      <!-- 验证码输入 -->
      <div class="form-item">
        <van-field
          v-model="code"
          type="number"
          maxlength="6"
          placeholder="请输入验证码"
          @focus="isFocusCode = true"
          @blur="isFocusCode = false"
        >
          <template #left-icon>
            <svg-icon 
              name="lock" 
              :size="20" 
              :color="isFocusCode ? 'var(--primary-gradient-start)' : '#999'"
            />
          </template>
          <template #button>
            <div 
              class="code-btn" 
              :class="{ disabled: isCountDown }"
              @click="handleSendCode"
            >
              {{ countDownText }}
            </div>
          </template>
        </van-field>
      </div>

      <!-- 登录按钮 -->
      <div class="submit-btn" @click="handleLogin">
        登录
      </div>

      <!-- 用户协议 -->
      <div class="agreement">
        <van-checkbox v-model="isAgree" shape="square" icon-size="14px">
          我已阅读并同意
          <span class="link">《用户协议》</span>
          和
          <span class="link">《隐私政策》</span>
        </van-checkbox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'

const router = useRouter()

// 表单数据
const phone = ref('')
const code = ref('')
const isAgree = ref(false)
const isFocusPhone = ref(false)
const isFocusCode = ref(false)

// 倒计时相关
const isCountDown = ref(false)
const countDown = ref(60)
const countDownText = ref('获取验证码')

// 格式化手机号
const formatPhone = (value: string) => {
  const phone = value.replace(/[^\d]/g, '')
  const parts = []
  for (let i = 0; i < phone.length; i += 4) {
    parts.push(phone.slice(i, i + 4))
  }
  return parts.join(' ')
}

// 发送验证码
const handleSendCode = () => {
  if (isCountDown.value || phone.value.length !== 11) return
  
  isCountDown.value = true
  countDown.value = 60
  const timer = setInterval(() => {
    countDown.value--
    countDownText.value = `${countDown.value}s后重新获取`
    
    if (countDown.value <= 0) {
      clearInterval(timer)
      isCountDown.value = false
      countDownText.value = '获取验证码'
    }
  }, 1000)
}

// 登录
const handleLogin = () => {
  if (!isAgree.value) {
    // 提示用户同意协议
    return
  }
  
  if (phone.value.length !== 11) {
    // 提示手机号错误
    return
  }
  
  if (code.value.length !== 6) {
    // 提示验证码错误
    return
  }
  
  // 执行登录
  console.log('登录')
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: #fff;
  padding-bottom: env(safe-area-inset-bottom);
}

.nav-bar {
  position: relative;
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 16px;

  .back {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    padding: 4px;

    .back-icon {
      transform: rotate(180deg);
    }
  }

  .title {
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
}

.login-form {
  padding: 32px 24px;

  .form-title {
    margin-bottom: 40px;

    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin-bottom: 8px;
    }

    p {
      font-size: 14px;
      color: #999;
    }
  }

  .form-item {
    margin-bottom: 24px;

    :deep(.van-field) {
      padding: 12px 0;
      background: transparent;
    }

    :deep(.van-field__left-icon) {
      margin-right: 12px;
    }
  }

  .code-btn {
    padding: 0 12px;
    color: var(--primary-gradient-start);
    font-size: 14px;
    white-space: nowrap;

    &.disabled {
      color: #999;
    }
  }

  .submit-btn {
    height: 44px;
    background: var(--primary-gradient-start);
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 16px;
    margin: 40px 0 24px;

    &:active {
      opacity: 0.9;
    }
  }

  .agreement {
    text-align: center;
    font-size: 12px;
    color: #666;

    .link {
      color: var(--primary-gradient-start);
    }

    :deep(.van-checkbox__label) {
      color: #666;
    }
  }
}
</style> 