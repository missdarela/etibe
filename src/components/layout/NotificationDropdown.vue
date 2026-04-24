<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="notificationsStore.toggleDropdown"
      class="relative p-2 hover:bg-white/50 rounded-lg transition-colors"
    >
      <BellIcon class="w-5 h-5 text-gray-700" />
      <span
        v-if="notificationsStore.unreadCount > 0"
        class="absolute top-1 right-1 w-4 h-4 bg-ajo-gold text-white text-xs rounded-full flex items-center justify-center font-medium"
      >
        {{ notificationsStore.unreadCount }}
      </span>
    </button>

    <Transition name="dropdown">
      <div
        v-if="notificationsStore.isOpen"
        class="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden"
      >
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <h3 class="font-semibold text-gray-900 text-sm">Notifications</h3>
          <button
            @click="notificationsStore.markAllAsRead"
            class="text-xs text-ajo-gold hover:underline"
          >
            Mark all as read
          </button>
        </div>

        <div class="max-h-80 overflow-y-auto divide-y divide-gray-50">
          <div
            v-if="notificationsStore.notifications.length === 0"
            class="px-4 py-8 text-center"
          >
            <p class="text-sm text-gray-400">No notifications</p>
          </div>

          <div
            v-for="notification in notificationsStore.notifications"
            :key="notification.id"
            @click="notificationsStore.markAsRead(notification.id)"
            class="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
            :class="notification.read ? 'opacity-60' : ''"
          >
            <div
              class="w-2 h-2 rounded-full mt-2 flex-shrink-0"
              :class="notification.read ? 'bg-gray-300' : 'bg-ajo-gold'"
            />
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-800">{{ notification.message }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ notification.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useNotificationsStore } from '../../stores/notifications'
import { BellIcon } from './Icons.js'

const notificationsStore = useNotificationsStore()
const dropdownRef = ref(null)

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    notificationsStore.closeDropdown()
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
