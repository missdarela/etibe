import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNotificationsStore = defineStore('notifications', () => {
  const isOpen = ref(false)
  const messageCount = ref(2)

  const notifications = ref([
    { id: 1, message: 'Chidi received his payout of ₦800,000 🎉', read: false, time: '2m ago', type: 'payout' },
    { id: 2, message: 'New invite: Diaspora Circle Lagos', read: false, time: '15m ago', type: 'invite' },
    { id: 3, message: 'Your contribution of ₦50,000 was confirmed ✅', read: true, time: '1h ago', type: 'contribution' },
    { id: 4, message: 'Hand-in-Hand group is 90% complete 🔥', read: true, time: '2h ago', type: 'milestone' }
  ])

  const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

  function markAsRead(id) {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) notification.read = true
  }

  function markAllAsRead() {
    notifications.value.forEach(n => { n.read = true })
  }

  function toggleDropdown() {
    isOpen.value = !isOpen.value
  }

  function closeDropdown() {
    isOpen.value = false
  }

  return {
    notifications,
    isOpen,
    unreadCount,
    messageCount,
    markAsRead,
    markAllAsRead,
    toggleDropdown,
    closeDropdown
  }
})
