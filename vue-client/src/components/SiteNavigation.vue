<template>
  <nav class="bg-gray-800 border-b border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <span class="text-xl font-bold text-white tracking-wider">
              EDGERACK
            </span>
          </div>
          <div class="hidden md:block ml-10">
            <div class="flex items-baseline space-x-4">
              <RouterLink
                :to="{ name: 'home' }"
                class="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="router-link-exact-active"
              >
                Home
              </RouterLink>
              <RouterLink
                :to="{ name: 'rcu' }"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="router-link-exact-active"
              >
                RCU View
              </RouterLink>
              <RouterLink
                :to="{ name: 'network' }"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                active-class="router-link-exact-active"
              >
                Network
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <button
            @click="showLoginModal = true"
            class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <RouterLink
          :to="{ name: 'home' }"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          active-class="router-link-exact-active"
        >
          Home
        </RouterLink>
        <RouterLink
          :to="{ name: 'rcu' }"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          active-class="router-link-exact-active"
        >
          RCU View
        </RouterLink>
        <RouterLink
          :to="{ name: 'network' }"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          active-class="router-link-exact-active"
        >
          Network
        </RouterLink>
      </div>
    </div>
  </nav>

  <!-- Login Modal -->
  <UserLogin v-if="showLoginModal" @close="showLoginModal = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserLogin from './UserLogin.vue'

const showLoginModal = ref(false)
</script>