<template>
  <div class="home">
    <div class="top-section">
      <div class="location-bar">
        <div class="location">
          <svg-icon 
            name="location" 
            :size="18" 
            color="#fff"
            class="location-icon"
          />
          <span class="location-text">上海市</span>
          <svg-icon 
            name="arrow-right" 
            :size="14" 
            color="#fff"
            class="arrow-icon"
          />
        </div>
      </div>
    </div>

    <!-- 搜索栏使用粘性布局 -->
    <div class="search-container" :class="{ 'is-sticky': isSticky }">
      <div class="search-bar">
        <div class="search-wrapper">
          <van-search
            v-model="searchValue"
            placeholder=""
            shape="round"
            readonly
            @click="handleSearchClick"
          >
            <template #left-icon>
              <svg-icon 
                name="search" 
                :size="16" 
                color="var(--primary-gradient-start)"
                class="search-icon"
              />
            </template>
          </van-search>
          <div class="search-btn" @click="handleSearchClick">
            <span>搜索</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 修改内容区域的结构 -->
    <div class="main-content">
      <div class="content-wrapper">
        <!-- 添加内容区域 -->
        <div class="section">
          <div class="section-header">
            <h2>附近的小可爱</h2>
          </div>
          <!-- 骨架屏 -->
          <div class="pet-list" v-if="isFirstLoading">
            <div class="pet-card skeleton" v-for="i in 6" :key="i">
              <div class="pet-image skeleton-image"></div>
              <div class="pet-info">
                <div class="pet-main">
                  <div class="pet-title">
                    <div class="skeleton-text skeleton-title"></div>
                  </div>
                  <div class="skeleton-text skeleton-desc"></div>
                </div>
                <div class="skeleton-text skeleton-address"></div>
              </div>
            </div>
          </div>
          <!-- 宠物列表 -->
          <div class="pet-list" v-else>
            <div class="pet-card" v-for="(pet, index) in displayPets" :key="index">
              <div class="pet-image">
                <img :src="pet.image" :alt="pet.name">
                <span class="pet-tag">{{ pet.type }}</span>
              </div>
              <div class="pet-info">
                <div class="pet-main">
                  <div class="pet-title">
                    <span class="pet-name">{{ pet.name }}</span>
                    <span class="pet-age">{{ pet.age }}</span>
                  </div>
                  <div class="pet-desc">{{ pet.breed }}</div>
                </div>
                <div class="pet-address">
                  <svg-icon name="location" :size="12" color="#999"/>
                  <span>{{ pet.distance }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 加载状态 -->
          <div class="loading-status" v-if="isLoading && !isFirstLoading">
            <van-loading size="24px" color="var(--primary-gradient-start)">加载中...</van-loading>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用 TabBar 组件 -->
    <tab-bar v-model="currentTab" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { useRouter, useRoute } from 'vue-router'
import TabBar from '@/components/TabBar/index.vue'

const router = useRouter()
const route = useRoute()

const searchValue = ref('')
const isSticky = ref(false)
const lastScrollTop = ref(0)
const isLoading = ref(false)
const isFirstLoading = ref(true)
const page = ref(1)
const displayPets = ref<any[]>([])

const currentTab = ref('home')

const switchTab = (tab: string) => {
  currentTab.value = tab
  if (tab === 'user') {
    router.push('/user')
  } else {
    router.push('/')
  }
}

const handleSearchClick = () => {
  console.log('search clicked')
}

// 模拟获取宠物数据的函数
const fetchPets = async (pageNum: number) => {
  // 模拟 API 请求延迟
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const pageSize = 6 // 每页6条数据
  const startIndex = (pageNum - 1) * pageSize
  
  return Array(pageSize).fill(null).map((_, index) => ({
    name: `小可爱${startIndex + index + 1}`,
    type: index % 2 === 0 ? '狗狗' : '猫咪',
    breed: index % 2 === 0 ? '柴犬' : '英短',
    age: `${Math.floor(Math.random() * 3 + 1)}岁`,
    distance: `${Math.floor(Math.random() * 2000 + 100)}m`,
    image: `https://picsum.photos/300/300?random=${startIndex + index}`
  }))
}

// 加载更多数据
const loadMore = async () => {
  if (isLoading.value) return
  
  isLoading.value = true
  try {
    const newPets = await fetchPets(page.value)
    displayPets.value.push(...newPets)
    page.value++
  } catch (error) {
    console.error('加载数据失败:', error)
  } finally {
    isLoading.value = false
    isFirstLoading.value = false
  }
}

// 检查是否触底
const checkBottom = () => {
  const scrollHeight = document.documentElement.scrollHeight
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const clientHeight = document.documentElement.clientHeight
  
  // 增加触底判断的距离到 100px
  if (scrollHeight - scrollTop - clientHeight < 100) {
    loadMore()
  }
}

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight
  const clientHeight = document.documentElement.clientHeight
  const maxScroll = scrollHeight - clientHeight
  
  // 只判断是否超过阈值
  isSticky.value = scrollTop > 40

  // 只在非底部区域更新lastScrollTop
  if (maxScroll - scrollTop > 20) {
    lastScrollTop.value = scrollTop
  }

  // 使用新的触底检测函数
  checkBottom()
}

// 根据当前路由设置激活的标签
onMounted(() => {
  currentTab.value = route.path === '/user' ? 'user' : 'home'
})

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  // 初始加载
  await loadMore()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background: var(--bg-gray);
}

.top-section {
  background: linear-gradient(
    180deg, 
    var(--primary-gradient-start) 0%, 
    var(--primary-gradient-end) 100%
  );
  height: 50px;
}

.location-bar {
  padding: 2px 8px 4px;
  background: transparent;
  border-bottom: none;

  .location {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    color: var(--bg-white);
    
    .location-icon {
      margin-right: 2px;
    }

    .arrow-icon {
      margin-left: 2px;
      transform: rotate(90deg);
    }
    
    .location-text {
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.search-container {
  position: sticky;
  top: 0;
  z-index: 99;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--primary-gradient-end);

  &.is-sticky {
    background: var(--primary-gradient-end);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    
    .search-bar {
      padding: 10px 8px;
    }

    :deep(.van-search__content) {
      border: 1px solid var(--primary-gradient-start);
      background: #fff;
    }
  }
}

.search-bar {
  padding: 8px 8px;
  background: transparent;
  position: relative;
  transition: padding 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  .search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  :deep(.van-search) {
    flex: 1;
    padding: 0;
    background: transparent;
  }

  :deep(.van-search__content) {
    background: rgba(255, 255, 255, 0.95);
    border: none;
    padding-right: 60px;
    height: 32px;
    min-height: 32px;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform, border;
  }

  :deep(.van-field__left-icon) {
    display: flex;
    align-items: center;
    height: 100%;
    
    .search-icon {
      margin: 0 4px;
    }
  }

  :deep(.van-field__body) {
    cursor: pointer;
  }

  .search-btn {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    min-width: 42px;
    height: 26px;
    background: var(--primary-gradient-start);
    border-radius: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0 10px;

   

    span {
      color: rgba(255, 255, 255, 1);
      font-size: 12px;
      font-weight: 400;
      transform: translateY(1px);
    }
  }
}

.main-content {
  position: relative;
  background: var(--primary-gradient-end);
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: -20px;
  padding-top: 24px;
  min-height: calc(100vh - 90px);

  .content-wrapper {
    background: var(--bg-gray);
    flex: 1;
    border-radius: 20px 20px 0 0;
    width: 100%;
    padding: 16px;
    padding-bottom: 100px;
    padding-bottom: calc(50px + env(safe-area-inset-bottom) + 10px);
  }
}

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

.section {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    h2 {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }

    .more {
      font-size: 13px;
      color: #999;
    }
  }

  .pet-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .pet-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

    .pet-image {
      position: relative;
      padding-top: 85%;
      margin-bottom: -4px;
      
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .pet-tag {
        position: absolute;
        top: 8px;
        left: 8px;
        padding: 3px 8px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 4px;
        color: #fff;
        font-size: 11px;
      }
    }

    .pet-info {
      padding: 8px 10px 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;

      .pet-main {
        flex: 1;
        min-width: 0;
      }

      .pet-title {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 2px;

        .pet-name {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .pet-age {
          font-size: 12px;
          color: #666;
        }
      }

      .pet-desc {
        font-size: 12px;
        color: #666;
      }

      .pet-address {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 12px;
        color: #999;
        white-space: nowrap;
        margin-top: 2px;
      }
    }

    &.skeleton {
      .skeleton-image {
        background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
        background-size: 400% 100%;
        animation: skeleton-loading 1.4s ease infinite;
      }

      .skeleton-text {
        background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
        background-size: 400% 100%;
        animation: skeleton-loading 1.4s ease infinite;
        height: 16px;
        border-radius: 4px;
      }

      .skeleton-title {
        width: 40%;
        margin-bottom: 8px;
      }

      .skeleton-desc {
        width: 60%;
        margin-bottom: 8px;
      }

      .skeleton-address {
        width: 30%;
      }
    }
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.loading-status {
  padding: 16px 0;
  text-align: center;
  color: #999;
}
</style> 