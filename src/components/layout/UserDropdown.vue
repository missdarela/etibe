<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="isOpen = !isOpen"
      class="flex items-center gap-3 hover:bg-white/50 rounded-lg px-2 py-1 transition-colors"
    >
      <img :src="user?.avatar" :alt="user?.fullName" class="w-9 h-9 rounded-full object-cover" />
      <div class="flex items-center gap-1.5">
        <span class="text-sm font-medium text-gray-900">{{ user?.fullName }}</span>
        <ChevronDownIcon
          class="w-4 h-4 text-gray-600 transition-transform duration-200"
          :class="isOpen ? 'rotate-180' : ''"
        />
      </div>
    </button>

    <Transition name="dropdown">
      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
      >
        <router-link
          to="/profile"
          @click="isOpen = false"
          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
        >
          <UserIcon class="w-4 h-4 text-gray-500" />
          Profile
        </router-link>

        <router-link
          to="/settings"
          @click="isOpen = false"
          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
        >
          <SettingsIcon class="w-4 h-4 text-gray-500" />
          Settings
        </router-link>

        <div class="border-t border-gray-100" />

        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm text-red-600 transition-colors"
        >
          <LogOutIcon class="w-4 h-4" />
          Logout
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { UserIcon, SettingsIcon, ChevronDownIcon, LogOutIcon } from './Icons.js'

const authStore = useAuthStore()
const router = useRouter()
const isOpen = ref(false)
const dropdownRef = ref(null)

const user = computed(() => authStore.user)

const handleLogout = () => {
  authStore.logout()
  isOpen.value = false
  router.push('/login')
}

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
