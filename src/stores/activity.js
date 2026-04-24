import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useActivityStore = defineStore('activity', () => {
  const activities = ref([
    {
      id: 1,
      type: 'payout',
      message: 'Chidi received his payout of ₦800,000 🎉',
      avatar: 'https://i.pravatar.cc/150?img=7',
      timestamp: new Date('2026-04-22T09:50:00')
    },
    {
      id: 2,
      type: 'contribution',
      message: 'You contributed ₦50,000 to Family Oyesu',
      avatar: 'https://i.pravatar.cc/150?img=12',
      timestamp: new Date('2026-04-22T09:38:00')
    },
    {
      id: 3,
      type: 'invite',
      message: 'New invite: Diaspora Circle Lagos',
      avatar: 'https://i.pravatar.cc/150?img=8',
      timestamp: new Date('2026-04-22T09:35:00')
    },
    {
      id: 4,
      type: 'contribution',
      message: 'You contributed ₦100,000 to Kin & Coin',
      avatar: 'https://i.pravatar.cc/150?img=12',
      timestamp: new Date('2026-04-22T08:45:00')
    },
    {
      id: 5,
      type: 'payout',
      message: 'Kunle received payout from Village Vault 💰',
      avatar: 'https://i.pravatar.cc/150?img=5',
      timestamp: new Date('2026-04-22T08:30:00')
    }
  ])

  const sortedActivities = computed(() =>
    [...activities.value].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  )

  /**
   * addActivity(message)            — spec: accepts a string
   * addActivity({ type, message, avatar }) — rich form
   */
  function addActivity(activity) {
    const payload =
      typeof activity === 'string'
        ? { type: 'info', message: activity, avatar: 'https://i.pravatar.cc/150?img=12' }
        : activity

    activities.value.unshift({
      id: Date.now() + Math.floor(Math.random() * 1000),
      avatar: 'https://i.pravatar.cc/150?img=12',
      ...payload,
      timestamp: new Date()
    })
  }

  function formatTime(timestamp) {
    const now = new Date()
    const diff = now - new Date(timestamp)
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return new Date(timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  }

  return {
    activities,
    sortedActivities,
    addActivity,
    formatTime
  }
})
