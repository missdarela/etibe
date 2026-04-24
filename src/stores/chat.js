import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'
import { useGroupsStore } from './groups'

// messages table shape:
// { id, groupId, senderId, text, timestamp }
export const useChatStore = defineStore('chat', () => {
  const isVisible = ref(true)

  const messages = ref([
    { id: 1, groupId: 1, senderId: 2, text: 'Has everyone contributed this week? We need to hit the target 💪', timestamp: '2026-04-22T10:15:00' },
    { id: 2, groupId: 1, senderId: 1, text: 'Already sent mine this morning!',                                  timestamp: '2026-04-22T10:18:00' },
    { id: 3, groupId: 1, senderId: 3, text: 'Same here. When is the next payout date?',                         timestamp: '2026-04-22T10:20:00' },
    { id: 4, groupId: 1, senderId: 1, text: 'April 25th for Chidi 🎉',                                           timestamp: '2026-04-22T10:21:00' },

    { id: 5, groupId: 2, senderId: 4, text: 'Monthly contribution reminder for everyone 📢', timestamp: '2026-04-22T09:00:00' },
    { id: 6, groupId: 2, senderId: 1, text: 'Got it, will send by end of day',               timestamp: '2026-04-22T09:30:00' },

    { id: 7, groupId: 3, senderId: 5, text: 'Great progress everyone! Only 10% left 🙌',  timestamp: '2026-04-22T08:45:00' },
    { id: 8, groupId: 3, senderId: 1, text: 'Almost there! Payout soon for Tunde 🔥',     timestamp: '2026-04-22T08:50:00' },

    { id: 9, groupId: 4, senderId: 6, text: 'Bi-weekly check-in. Are we all on track?', timestamp: '2026-04-22T07:00:00' }
  ])

  // Get all messages for a group, sorted by timestamp ascending
  function getMessagesByGroup(groupId) {
    return messages.value
      .filter(m => m.groupId === groupId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
  }

  // Send a message to the currently active group.
  // Auto-fills senderId from auth + groupId from active group.
  function sendMessage(text) {
    const authStore = useAuthStore()
    const groupsStore = useGroupsStore()
    const user = authStore.currentUser
    if (!user || !groupsStore.activeGroupId) return null

    const msg = {
      id: Date.now(),
      groupId: groupsStore.activeGroupId,
      senderId: user.id,
      text,
      timestamp: new Date().toISOString()
    }
    messages.value.push(msg)
    return msg
  }

  function deleteMessage(id) {
    const idx = messages.value.findIndex(m => m.id === id)
    if (idx !== -1) messages.value.splice(idx, 1)
  }

  function toggleVisibility() {
    isVisible.value = !isVisible.value
  }

  return {
    messages,
    isVisible,
    getMessagesByGroup,
    sendMessage,
    deleteMessage,
    toggleVisibility
  }
})
