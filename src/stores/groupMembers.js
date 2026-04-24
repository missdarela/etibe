import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useActivityStore } from './activity'
import { useAuthStore } from './auth'
import { useGroupsStore } from './groups'

// group_members table shape:
// { id, userId, groupId, payoutPosition, hasReceived, joinedAt }
export const useGroupMembersStore = defineStore('groupMembers', () => {
  const members = ref([
    // Group 1: 9-5 to Freedom  (current user is member)
    { id: 1, userId: 1, groupId: 1, payoutPosition: 3, hasReceived: false, joinedAt: '2026-03-01' },
    { id: 2, userId: 2, groupId: 1, payoutPosition: 1, hasReceived: true,  joinedAt: '2026-03-01' },
    { id: 3, userId: 3, groupId: 1, payoutPosition: 2, hasReceived: true,  joinedAt: '2026-03-01' },
    { id: 4, userId: 4, groupId: 1, payoutPosition: 4, hasReceived: false, joinedAt: '2026-03-01' },

    // Group 2: Kin & Coin
    { id: 5, userId: 1, groupId: 2, payoutPosition: 2, hasReceived: false, joinedAt: '2026-02-15' },
    { id: 6, userId: 4, groupId: 2, payoutPosition: 1, hasReceived: true,  joinedAt: '2026-02-15' },
    { id: 7, userId: 3, groupId: 2, payoutPosition: 3, hasReceived: false, joinedAt: '2026-02-15' },

    // Group 3: Hand-in-Hand
    { id: 8,  userId: 1, groupId: 3, payoutPosition: 5, hasReceived: false, joinedAt: '2026-01-10' },
    { id: 9,  userId: 5, groupId: 3, payoutPosition: 1, hasReceived: true,  joinedAt: '2026-01-10' },
    { id: 10, userId: 4, groupId: 3, payoutPosition: 2, hasReceived: true,  joinedAt: '2026-01-10' },

    // Group 4: Money Moves  (current user NOT a member)
    { id: 11, userId: 6, groupId: 4, payoutPosition: 1, hasReceived: false, joinedAt: '2026-04-01' },
    { id: 12, userId: 2, groupId: 4, payoutPosition: 2, hasReceived: false, joinedAt: '2026-04-01' },

    // Group 5: Village Vault
    { id: 13, userId: 1, groupId: 5, payoutPosition: 4, hasReceived: false, joinedAt: '2026-03-15' },
    { id: 14, userId: 6, groupId: 5, payoutPosition: 1, hasReceived: true,  joinedAt: '2026-03-15' },
    { id: 15, userId: 7, groupId: 5, payoutPosition: 2, hasReceived: false, joinedAt: '2026-03-15' },

    // Group 6: Diaspora Circle (current user NOT a member)
    { id: 16, userId: 7, groupId: 6, payoutPosition: 1, hasReceived: false, joinedAt: '2026-04-05' },
    { id: 17, userId: 3, groupId: 6, payoutPosition: 2, hasReceived: false, joinedAt: '2026-04-05' }
  ])

  function getMembersByGroup(groupId) {
    return members.value.filter(m => m.groupId === groupId)
  }

  function getGroupsForUser(userId) {
    return members.value.filter(m => m.userId === userId).map(m => m.groupId)
  }

  function getMember(userId, groupId) {
    return members.value.find(m => m.userId === userId && m.groupId === groupId) || null
  }

  function getMemberCount(groupId) {
    return members.value.filter(m => m.groupId === groupId).length
  }

  function addMember({ userId, groupId, payoutPosition, hasReceived = false, silent = false }) {
    const newMember = {
      id: members.value.length ? Math.max(...members.value.map(m => m.id)) + 1 : 1,
      userId,
      groupId,
      payoutPosition,
      hasReceived,
      joinedAt: new Date().toISOString()
    }
    members.value.push(newMember)

    if (!silent) {
      const authStore = useAuthStore()
      const groupsStore = useGroupsStore()
      const activityStore = useActivityStore()
      const group = groupsStore.getGroupById(groupId)
      if (authStore.currentUser?.id === userId) {
        activityStore.addActivity({
          type: 'invite',
          message: `You joined ${group?.name ?? 'a group'} 👋`,
          avatar: authStore.currentUser.avatar
        })
      } else {
        const user = authStore.getUserById(userId)
        activityStore.addActivity({
          type: 'invite',
          message: `${user?.fullName ?? 'Someone'} joined ${group?.name ?? 'a group'}`,
          avatar: user?.avatar
        })
      }
    }

    return newMember
  }

  function removeMember(userId, groupId) {
    const idx = members.value.findIndex(m => m.userId === userId && m.groupId === groupId)
    if (idx !== -1) members.value.splice(idx, 1)
  }

  function markReceived(userId, groupId) {
    const member = getMember(userId, groupId)
    if (!member) return
    member.hasReceived = true

    const authStore = useAuthStore()
    const groupsStore = useGroupsStore()
    const activityStore = useActivityStore()
    const group = groupsStore.getGroupById(groupId)
    const user = authStore.getUserById(userId)
    const subject = authStore.currentUser?.id === userId ? 'You' : (user?.fullName ?? 'Someone')
    const amount = group ? `₦${(group.contributionAmount * group.cycleLength).toLocaleString('en-NG')}` : ''
    activityStore.addActivity({
      type: 'payout',
      message: `${subject} received payout${amount ? ` of ${amount}` : ''} from ${group?.name ?? 'a group'} 💰`,
      avatar: user?.avatar
    })
  }

  return {
    members,
    getMembersByGroup,
    getGroupsForUser,
    getMember,
    getMemberCount,
    addMember,
    removeMember,
    markReceived
  }
})
