import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const currentGroup = ref({
    id: 1,
    name: 'Money Monday Crew',
    avatar: 'https://i.pravatar.cc/150?img=10'
  })

  const messages = ref([
    {
      id: 1,
      sender: 'Monica Stich',
      avatar: 'https://i.pravatar.cc/150?img=9',
      message: 'Dope yes sometimes it is cool to break out of the screen a bit thought this looked kinda cool',
      time: '10:21 AM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      avatar: 'https://i.pravatar.cc/150?img=12',
      message: 'yea I\'m considering adopting another black cat',
      time: '10:22 AM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Monica Stich',
      avatar: 'https://i.pravatar.cc/150?img=9',
      message: 'Dope yes sometimes it is cool to break out of the screen a bit thought this looked kinda cool',
      time: '10:21 AM',
      isOwn: false
    },
    {
      id: 4,
      sender: 'You',
      avatar: 'https://i.pravatar.cc/150?img=12',
      message: 'yea I\'m considering adopting another black cat',
      time: '10:22 AM',
      isOwn: true
    }
  ])

  function sendMessage(text) {
    messages.value.push({
      id: messages.value.length + 1,
      sender: 'You',
      avatar: 'https://i.pravatar.cc/150?img=12',
      message: text,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      isOwn: true
    })
  }

  return {
    currentGroup,
    messages,
    sendMessage
  }
})
