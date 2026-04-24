<template>
  <div class="min-h-screen bg-ajo-beige flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <div class="text-center mb-10">
        <div class="flex justify-center mb-4">
          <div class="bg-white rounded-2xl p-6 inline-block shadow-sm">
            <img src="/src/assets/sujo-transbg.png" alt="Sujo" class="h-36 w-auto" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">Forgot Password?</h2>
        <p class="text-gray-600 mb-8">Enter your email and we'll send you a reset link</p>

        <form @submit.prevent="handleReset" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2.5">Email Address</label>
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email address"
              class="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ajo-gold/30 focus:border-ajo-gold text-sm"
              required
            />
          </div>

          <button
            type="submit"
            class="w-full bg-ajo-green text-white py-3.5 rounded-lg font-semibold hover:bg-ajo-green/90 transition-colors mt-2"
          >
            Send Reset Link
          </button>
        </form>

        <div class="text-center mt-8">
          <router-link to="/login" class="text-sm text-ajo-gold hover:text-ajo-gold/80 font-semibold">
            ← Back to Login
          </router-link>
        </div>
      </div>

      <div class="mt-6 text-center">
        <svg class="w-full h-12 opacity-20" viewBox="0 0 400 48" fill="none">
          <pattern id="forgot-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="#C8A96A" opacity="0.3"/>
          </pattern>
          <rect width="400" height="48" fill="url(#forgot-pattern)"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')

const handleReset = () => {
  alert('Password reset link sent to ' + email.value)
  router.push('/login')
}
</script>
