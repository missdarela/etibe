import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const isVisible = ref(true)

  const messagesByGroup = ref({
    1: [
      { id: 1, groupId: 1, sender: 'Chidi Okonkwo', avatar: 'https://i.pravatar.cc/150?img=7', text: 'Has everyone contributed this week? We need to hit the target 💪', timestamp: '10:15 AM', isOwn: false },
      { id: 2, groupId: 1, sender: 'You', avatar: 'https://i.pravatar.cc/150?img=12', text: 'Already sent mine this morning!', timestamp: '10:18 AM', isOwn: true },
      { id: 3, groupId: 1, sender: 'Amaka Johnson', avatar: 'https://i.pravatar.cc/150?img=9', text: 'Same here. When is the next payout date?', timestamp: '10:20 AM', isOwn: false },
      { id: 4, groupId: 1, sender: 'You', avatar: 'https://i.pravatar.cc/150?img=12', text: 'April 25th for Chidi 🎉', timestamp: '10:21 AM', isOwn: true }
    ],
    2: [
      { id: 1, groupId: 2, sender: 'Tunde Bakare', avatar: 'https://i.pravatar.cc/150?img=3', text: 'Monthly contribution reminder for everyone 📢', timestamp: '9:00 AM', isOwn: false },
      { id: 2, groupId: 2, sender: 'You', avatar: 'https://i.pravatar.cc/150?img=12', text: 'Got it, will send by end of day', timestamp: '9:30 AM', isOwn: true }
    ],
    3: [
      { id: 1, groupId: 3, sender: 'Ngozi Eze', avatar: 'https://i.pravatar.cc/150?img=4', text: 'Great progress everyone! Only 10% left 🙌', timestamp: '8:45 AM', isOwn: false },
      { id: 2, groupId: 3, sender: 'You', avatar: 'https://i.pravatar.cc/150?img=12', text: 'Almost there! Payout soon for Tunde 🔥', timestamp: '8:50 AM', isOwn: true }
    ],
    4: [
      { id: 1, groupId: 4, sender: 'Kunle Adeyemi', avatar: 'https://i.pravatar.cc/150?img=5', text: 'Bi-weekly check-in. Are we all on track?', timestamp: '7:00 AM', isOwn: false }
    ]
  })

  function getMessagesForGroup(groupId) {
    return messagesByGroup.value[groupId] || []
  }

  function sendMessage(groupId, text) {
    if (!messagesByGroup.value[groupId]) {
      messagesByGroup.value[groupId] = []
    }
    messagesByGroup.value[groupId].push({
      id: Date.now(),
      groupId,
      sender: 'You',
      avatar: 'https://i.pravatar.cc/150?img=12',
      text,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      isOwn: true
    })
  }

  function toggleVisibility() {
    isVisible.value = !isVisible.value
  }

  return {
    messagesByGroup,
    isVisible,
    getMessagesForGroup,
    sendMessage,
    toggleVisibility
  }
})
