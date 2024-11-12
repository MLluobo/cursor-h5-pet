<template>
  <div class="tab-bar">
    <div 
      class="tab-item" 
      :class="{ active: modelValue === 'home' }" 
      @click="switchTab('home')"
    >
      <svg-icon 
        name="home" 
        :size="24" 
        :color="modelValue === 'home' ? 'var(--primary-gradient-start)' : '#666'"
      />
      <span>首页</span>
    </div>
    <div 
      class="tab-item" 
      :class="{ active: modelValue === 'user' }" 
      @click="switchTab('user')"
    >
      <svg-icon 
        name="user" 
        :size="24" 
        :color="modelValue === 'user' ? 'var(--primary-gradient-start)' : '#666'"
      />
      <span>我的</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import SvgIcon from '@/components/SvgIcon.vue'

interface Props {
  modelValue: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const router = useRouter()

const switchTab = (tab: string) => {
  emit('update:modelValue', tab)
  if (tab === 'user') {
    router.push('/user')
  } else {
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px 0;
    
    span {
      font-size: 12px;
      margin-top: 2px;
      color: #666;
    }

    &.active {
      span {
        color: var(--primary-gradient-start);
      }
    }
  }
}
</style> 