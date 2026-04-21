<template>
  <div class="min-h-screen bg-ajo-beige flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <div class="text-center mb-10">
        <div class="flex items-center justify-center gap-3 mb-2">
          <AjoLogo :size="48" />
          <h1 class="text-3xl font-bold text-ajo-green">Sujo</h1>
        </div>
        <p class="text-sm text-gray-600">We rise together</p>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">Create an account</h2>
        <p class="text-gray-600 mb-8">Join thousands saving together</p>

        <form @submit.prevent="handleSignup" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2.5">Full Name</label>
            <input
              v-model="form.fullName"
              type="text"
              placeholder="Enter your full name"
              class="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ajo-gold/30 focus:border-ajo-gold text-sm"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2.5">Email</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="Enter your email address"
              class="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ajo-gold/30 focus:border-ajo-gold text-sm"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2.5">Phone Number</label>
            <input
              v-model="form.phone"
              type="tel"
              placeholder="+234 800 000 0000"
              class="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ajo-gold/30 focus:border-ajo-gold text-sm"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2.5">Password</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Create a password"
                class="w-full px-4 py-3.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ajo-gold/30 focus:border-ajo-gold text-sm"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2.5">Confirm Password</label>
            <div class="relative">
              <input
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirm your password"
                class="w-full px-4 py-3.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ajo-gold/30 focus:border-ajo-gold text-sm"
                required
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 font-medium"
              >
                {{ showConfirmPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-ajo-green text-white py-3.5 rounded-lg font-semibold hover:bg-ajo-green/90 transition-colors mt-6"
          >
            Create Account
          </button>
        </form>

        <p class="text-center text-sm text-gray-600 mt-8">
          Already have an account?
          <router-link to="/login" class="text-ajo-gold hover:text-ajo-gold/80 font-semibold">
            Login
          </router-link>
        </p>
      </div>

      <div class="mt-6 text-center">
        <svg class="w-full h-12 opacity-20" viewBox="0 0 400 48" fill="none">
          <pattern id="signup-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="#C8A96A" opacity="0.3"/>
          </pattern>
          <rect width="400" height="48" fill="url(#signup-pattern)"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AjoLogo from '../assets/icons/AjoLogo.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const handleSignup = () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match')
    return
  }
  
  authStore.signup(form.value)
  router.push('/')
}
</script>
