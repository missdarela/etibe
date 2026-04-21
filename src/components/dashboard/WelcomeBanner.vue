<template>
  <div class="flex items-center justify-between mb-6">
    <div>
      <h1 class="text-2xl font-semibold text-gray-900 mb-1">
        Welcome back, {{ userName }} 🎉
      </h1>
      <p class="text-gray-600">Ready for your next payout?</p>
    </div>

    <div class="flex items-center gap-6">
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <MapPinIcon class="w-4 h-4" />
        <span>{{ location }}</span>
      </div>
      <div class="text-sm font-medium text-gray-900">
        {{ currentTime }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { MapPinIcon } from '../layout/Icons.js'

const authStore = useAuthStore()
const currentTime = ref('')
let timeInterval = null

const userName = computed(() => authStore.user?.name || 'User')
const location = computed(() => authStore.user?.location || 'Lagos, Nigeria')

const updateTime = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  const displayMinutes = minutes.toString().padStart(2, '0')
  currentTime.value = `${displayHours}:${displayMinutes}${ampm.toLowerCase()} WAT`
}

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 60000)
})

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
})
</script>
