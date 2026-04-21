import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationsStore = defineStore('notifications', () => {
  const notificationCount = ref(2)
  const messageCount = ref(2)

  return {
    notificationCount,
    messageCount
  }
})
