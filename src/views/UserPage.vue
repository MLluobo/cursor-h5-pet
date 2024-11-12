<template>
  <div class="user-page">
    <!-- 未登录状态 -->
    <div class="user-header" v-if="!isLogin">
      <div class="login-banner">
        <svg-icon name="user" :size="50" color="#fff" class="avatar"/>
        <div class="login-text" @click="handleLogin">
          <span>立即登录</span>
          <svg-icon name="arrow-right" :size="16" color="#fff"/>
        </div>
      </div>
    </div>

    <!-- 已登录状态 -->
    <div class="user-header" v-else>
      <div class="user-info">
        <img :src="userInfo.avatar" class="avatar" alt="avatar">
        <div class="info">
          <div class="nickname">{{ userInfo.nickname }}</div>
          <div class="id">ID: {{ userInfo.userId }}</div>
        </div>
      </div>
    </div>

    <!-- 功能列表 -->
    <div class="menu-list">
      <div class="menu-group">
        <div class="menu-item" @click="handleMenuClick('myPets')">
          <div class="left">
            <svg-icon name="pet" :size="20" color="var(--primary-gradient-start)"/>
            <span>我的领养</span>
          </div>
          <svg-icon name="arrow-right" :size="16" color="#999"/>
        </div>
        <div class="menu-item" @click="handleMenuClick('favorites')">
          <div class="left">
            <svg-icon name="heart" :size="20" color="var(--primary-gradient-start)"/>
            <span>我的收藏</span>
          </div>
          <svg-icon name="arrow-right" :size="16" color="#999"/>
        </div>
      </div>

      <div class="menu-group">
        <div class="menu-item" @click="handleMenuClick('settings')">
          <div class="left">
            <svg-icon name="settings" :size="20" color="var(--primary-gradient-start)"/>
            <span>设置</span>
          </div>
          <svg-icon name="arrow-right" :size="16" color="#999"/>
        </div>
        <div class="menu-item" @click="handleMenuClick('about')">
          <div class="left">
            <svg-icon name="info" :size="20" color="var(--primary-gradient-start)"/>
            <span>关于我们</span>
          </div>
          <svg-icon name="arrow-right" :size="16" color="#999"/>
        </div>
      </div>
    </div>

    <!-- 退出登录按钮 -->
    <div class="logout-btn" v-if="isLogin" @click="handleLogout">
      退出登录
    </div>

    <!-- 使用 TabBar 组件 -->
    <tab-bar v-model="currentTab" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'
import TabBar from '@/components/TabBar/index.vue'

const router = useRouter()
const isLogin = ref(false)
const userInfo = ref({
  nickname: '',
  userId: '',
  avatar: ''
})

const currentTab = ref('user')

// 处理登录点击
const handleLogin = () => {
  router.push('/login')
}

// 处理菜单点击
const handleMenuClick = (type: string) => {
  if (!isLogin.value) {
    handleLogin()
    return
  }
  
  switch (type) {
    case 'myPets':
      router.push('/my-pets')
      break
    case 'favorites':
      router.push('/favorites')
      break
    case 'settings':
      router.push('/settings')
      break
    case 'about':
      router.push('/about')
      break
  }
}

// 处理退出登录
const handleLogout = () => {
  // 清除登录状态
  isLogin.value = false
  userInfo.value = {
    nickname: '',
    userId: '',
    avatar: ''
  }
}
</script>

<style lang="scss" scoped>
.user-page {
  min-height: 100vh;
  background: var(--bg-gray);
  padding-bottom: calc(50px + env(safe-area-inset-bottom));
}

.user-header {
  background: linear-gradient(
    180deg, 
    var(--primary-gradient-start) 0%, 
    var(--primary-gradient-end) 100%
  );
  padding: 40px 20px 30px;
  color: #fff;

  .login-banner {
    display: flex;
    align-items: center;
    gap: 16px;

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .login-text {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 16px;

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 30px;
      object-fit: cover;
    }

    .info {
      flex: 1;

      .nickname {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 4px;
      }

      .id {
        font-size: 13px;
        opacity: 0.8;
      }
    }
  }
}

.menu-list {
  padding: 12px;

  .menu-group {
    background: #fff;
    border-radius: 12px;
    margin-bottom: 12px;
    overflow: hidden;
  }

  .menu-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    cursor: pointer;

    &:active {
      background: #f5f5f5;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #f5f5f5;
    }

    .left {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 15px;
      color: #333;
    }
  }
}

.logout-btn {
  margin: 20px 12px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 22px;
  font-size: 15px;
  color: #ff4d4f;
  cursor: pointer;

  &:active {
    background: #f5f5f5;
  }
}
</style> 