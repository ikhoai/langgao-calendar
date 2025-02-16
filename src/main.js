import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Calendar from './views/Calendar.vue'
import Admin from './views/Admin.vue'
import './assets/main.css'

const routes = [
  { path: '/', component: Calendar },
  { path: '/admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')