import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import RCUView from './views/RCUView.vue'
import NetworkView from './views/NetworkView.vue'

// Flowbite
import 'flowbite'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/rcu', name: 'rcu', component: RCUView },
  { path: '/network', name: 'network', component: NetworkView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')