import './assets/main.css'

import { createApp, reactive } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import Global from './Global.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

// 响应式的全局变量
app.provide('GLOBAL', reactive(Global))
app.config.globalProperties.GLOBAL = reactive(Global)

app.mount('#app')
