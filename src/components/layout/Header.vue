<template>
  <header class="bg-ajo-beige border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between gap-6">
      <SearchBar />

      <div class="flex items-center gap-2 flex-shrink-0">
        <NotificationDropdown />

        <button
          @click="chatStore.toggleVisibility"
          class="relative p-2 hover:bg-white/50 rounded-lg transition-colors"
          :class="chatStore.isVisible ? 'bg-white/50' : ''"
          title="Toggle chat"
        >
          <MessageIcon class="w-5 h-5 text-gray-700" />
          <span
            v-if="notificationsStore.messageCount > 0"
            class="absolute top-1 right-1 w-4 h-4 bg-ajo-gold text-white text-xs rounded-full flex items-center justify-center font-medium"
          >
            {{ notificationsStore.messageCount }}
          </span>
        </button>

        <div class="pl-3 border-l border-gray-300">
          <UserDropdown />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useNotificationsStore } from '../../stores/notifications'
import { useChatStore } from '../../stores/chat'
import { MessageIcon } from './Icons.js'
import SearchBar from './SearchBar.vue'
import NotificationDropdown from './NotificationDropdown.vue'
import UserDropdown from './UserDropdown.vue'

const notificationsStore = useNotificationsStore()
const chatStore = useChatStore()
</script>
