// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入通用样式
import '@/assets/styles/common.scss'
// 引入 rem 适配
import '@/utils/rem'

// 完整引入 Vant
import Vant from 'vant'
import 'vant/lib/index.css'

import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(Vant)
app.use(createPinia())
app.use(router)

app.mount('#app')
