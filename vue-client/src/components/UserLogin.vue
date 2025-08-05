<template>
  <!-- Main modal -->
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div 
        class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
        @click="$emit('close')"
      ></div>

      <!-- Modal panel -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <!-- Modal header -->
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="flex items-center justify-between border-b pb-4">
            <h3 class="text-xl font-semibold text-gray-900">
              EdgeRack™ Access - Sign In 
            </h3>
            <button 
              type="button" 
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              @click="$emit('close')"
            >
              <svg class="w-3 h-3" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Modal body -->
        <div class="bg-white px-4 pb-4 sm:p-6">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
                Your user name
              </label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                v-model="form.email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                placeholder="user name or name@company.com" 
                required 
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
                Your user ID
              </label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                v-model="form.password"
                placeholder="••••••••" 
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                required 
              />
            </div>
            <div class="flex justify-between items-center">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input 
                    id="remember" 
                    type="checkbox" 
                    v-model="form.remember"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" 
                  />
                </div>
                <label for="remember" class="ml-2 text-sm font-medium text-gray-900">
                  Remember me
                </label>
              </div>
              <a href="#" class="text-sm text-blue-700 hover:underline">
                Lost User ID?
              </a>
            </div>
            <button 
              type="submit" 
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login to control dashboard
            </button>
            <div class="text-sm font-medium text-gray-500 text-center">
              Not registered? 
              <a href="#" class="text-blue-700 hover:underline">
                Create user ID
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

defineEmits<{
  close: []
}>()

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const handleSubmit = () => {
  // Here you would handle the login logic
  console.log('Login attempt:', form)
  // For now, just close the modal
  // In a real app, you'd validate credentials and handle login state
}</script>