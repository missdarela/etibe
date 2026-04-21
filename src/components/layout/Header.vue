<template>
  <header class="bg-ajo-beige border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <div class="flex-1 max-w-xl">
        <div class="relative">
          <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Find a group, name, admin or invite code..."
            class="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ajo-gold/30 text-sm"
          />
        </div>
      </div>

      <div class="flex items-center gap-4">
        <button class="relative p-2 hover:bg-white/50 rounded-lg transition-colors">
          <BellIcon class="w-5 h-5 text-gray-700" />
          <span class="absolute top-1 right-1 w-4 h-4 bg-ajo-gold text-white text-xs rounded-full flex items-center justify-center font-medium">
            {{ notificationCount }}
          </span>
        </button>

        <button class="relative p-2 hover:bg-white/50 rounded-lg transition-colors">
          <MessageIcon class="w-5 h-5 text-gray-700" />
          <span class="absolute top-1 right-1 w-4 h-4 bg-ajo-gold text-white text-xs rounded-full flex items-center justify-center font-medium">
            {{ messageCount }}
          </span>
        </button>

        <div class="flex items-center gap-3 pl-4 border-l border-gray-300">
          <img :src="user?.avatar" :alt="user?.fullName" class="w-9 h-9 rounded-full object-cover" />
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-gray-900">{{ user?.fullName }}</span>
            <button class="p-1 hover:bg-white/50 rounded transition-colors">
              <ChevronDownIcon class="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useNotificationsStore } from '../../stores/notifications'
import { SearchIcon, BellIcon, MessageIcon, ChevronDownIcon } from './Icons.js'

const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const user = computed(() => authStore.user)
const notificationCount = computed(() => notificationsStore.notificationCount)
const messageCount = computed(() => notificationsStore.messageCount)
</script>
