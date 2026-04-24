import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useActivityStore } from './activity'
import { useAuthStore } from './auth'
import { useGroupsStore } from './groups'

const PERIOD_DAYS = { weekly: 7, 'bi-weekly': 14, monthly: 30 }

// contributions table shape:
// { id, groupId, userId, amount, status: 'paid' | 'pending', date }
export const useContributionsStore = defineStore('contributions', () => {
  const contributions = ref([
    // Current user (id=1) contributions — paid history + upcoming pending
    { id: 1,  groupId: 1, userId: 1, amount: 50000,  status: 'paid',    date: '2026-04-01' },
    { id: 2,  groupId: 1, userId: 1, amount: 50000,  status: 'paid',    date: '2026-04-08' },
    { id: 3,  groupId: 1, userId: 1, amount: 50000,  status: 'paid',    date: '2026-04-15' },
    { id: 4,  groupId: 1, userId: 1, amount: 50000,  status: 'pending', date: '2026-04-25' },

    { id: 5,  groupId: 2, userId: 1, amount: 100000, status: 'paid',    date: '2026-03-15' },
    { id: 6,  groupId: 2, userId: 1, amount: 100000, status: 'pending', date: '2026-05-01' },

    { id: 7,  groupId: 3, userId: 1, amount: 30000,  status: 'paid',    date: '2026-04-01' },
    { id: 8,  groupId: 3, userId: 1, amount: 30000,  status: 'paid',    date: '2026-04-08' },
    { id: 9,  groupId: 3, userId: 1, amount: 30000,  status: 'paid',    date: '2026-04-15' },
    { id: 10, groupId: 3, userId: 1, amount: 30000,  status: 'pending', date: '2026-04-27' },

    { id: 11, groupId: 5, userId: 1, amount: 25000,  status: 'paid',    date: '2026-04-01' },
    { id: 12, groupId: 5, userId: 1, amount: 25000,  status: 'paid',    date: '2026-04-08' },
    { id: 13, groupId: 5, userId: 1, amount: 25000,  status: 'pending', date: '2026-04-24' },

    // Other members (populate groups for realism)
    { id: 14, groupId: 1, userId: 2, amount: 50000, status: 'paid',    date: '2026-04-15' },
    { id: 15, groupId: 1, userId: 3, amount: 50000, status: 'paid',    date: '2026-04-15' },
    { id: 16, groupId: 2, userId: 4, amount: 100000, status: 'paid',   date: '2026-03-15' },
    { id: 17, groupId: 3, userId: 5, amount: 30000, status: 'paid',    date: '2026-04-15' },
    { id: 18, groupId: 5, userId: 6, amount: 25000, status: 'paid',    date: '2026-04-15' }
  ])

  function nextId() {
    return contributions.value.length ? Math.max(...contributions.value.map(c => c.id)) + 1 : 1
  }

  // ---- Getters ----
  function getByUser(userId) {
    return contributions.value.filter(c => c.userId === userId)
  }

  function getByGroup(groupId) {
    return contributions.value.filter(c => c.groupId === groupId)
  }

  function getByStatus(status) {
    return contributions.value.filter(c => c.status === status)
  }

  function totalSavedByUser(userId) {
    return contributions.value
      .filter(c => c.userId === userId && c.status === 'paid')
      .reduce((sum, c) => sum + c.amount, 0)
  }

  function nextPendingForUser(userId) {
    return contributions.value
      .filter(c => c.userId === userId && c.status === 'pending')
      .sort((a, b) => new Date(a.date) - new Date(b.date))[0] || null
  }

  function paidTotalForGroup(groupId) {
    return contributions.value
      .filter(c => c.groupId === groupId && c.status === 'paid')
      .reduce((sum, c) => sum + c.amount, 0)
  }

  // ---- Actions ----
  function addContribution({ groupId, userId, amount, status = 'pending', date }) {
    const row = {
      id: nextId(),
      groupId,
      userId,
      amount,
      status,
      date: date || new Date().toISOString()
    }
    contributions.value.push(row)
    return row
  }

  function markPaid(id) {
    const c = contributions.value.find(x => x.id === id)
    if (!c) return
    c.status = 'paid'

    // Auto-log activity
    const authStore = useAuthStore()
    const groupsStore = useGroupsStore()
    const activityStore = useActivityStore()
    const group = groupsStore.getGroupById(c.groupId)
    const isCurrentUser = authStore.currentUser?.id === c.userId
    const user = authStore.getUserById(c.userId)
    const amount = `₦${c.amount.toLocaleString('en-NG')}`
    const subject = isCurrentUser ? 'You' : (user?.fullName ?? 'Someone')
    const verb = isCurrentUser ? 'contributed' : 'contributed'
    activityStore.addActivity({
      type: 'contribution',
      message: `${subject} ${verb} ${amount} to ${group?.name ?? 'a group'}`,
      avatar: user?.avatar
    })
  }

  function removeContribution(id) {
    const idx = contributions.value.findIndex(c => c.id === id)
    if (idx !== -1) contributions.value.splice(idx, 1)
  }

  /**
   * Generate a contributions schedule for a member.
   * Creates `cycleLength` pending rows spaced by `frequency`.
   */
  function generateSchedule(groupId, userId, cycleLength, amount, frequency = 'weekly') {
    const days = PERIOD_DAYS[frequency] ?? 7
    const today = new Date()
    const created = []

    for (let i = 0; i < cycleLength; i++) {
      const date = new Date(today.getTime() + (i + 1) * days * 86400000)
      const row = {
        id: nextId() + i,
        groupId,
        userId,
        amount,
        status: 'pending',
        date: date.toISOString()
      }
      contributions.value.push(row)
      created.push(row)
    }
    return created
  }

  return {
    contributions,
    getByUser,
    getByGroup,
    getByStatus,
    totalSavedByUser,
    nextPendingForUser,
    paidTotalForGroup,
    addContribution,
    markPaid,
    removeContribution,
    generateSchedule
  }
})
