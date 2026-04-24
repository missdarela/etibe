import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { useGroupMembersStore } from './groupMembers'
import { useContributionsStore } from './contributions'
import { useActivityStore } from './activity'

// groups table shape:
// { id, name, contributionAmount, cycleLength, frequency, createdBy, createdAt, avatar, hasNotification }
export const useGroupsStore = defineStore('groups', () => {
  const activeGroupId = ref(1)

  const groups = ref([
    { id: 1, name: '9-5 to Freedom',  contributionAmount: 50000,  cycleLength: 12, frequency: 'weekly',    createdBy: 2, createdAt: '2026-03-01', avatar: 'https://i.pravatar.cc/150?img=1', hasNotification: true },
    { id: 2, name: 'Kin & Coin',      contributionAmount: 100000, cycleLength: 6,  frequency: 'monthly',   createdBy: 4, createdAt: '2026-02-15', avatar: 'https://i.pravatar.cc/150?img=2', hasNotification: false },
    { id: 3, name: 'Hand-in-Hand',    contributionAmount: 30000,  cycleLength: 10, frequency: 'weekly',    createdBy: 5, createdAt: '2026-01-10', avatar: 'https://i.pravatar.cc/150?img=3', hasNotification: true },
    { id: 4, name: 'Money Moves',     contributionAmount: 75000,  cycleLength: 8,  frequency: 'bi-weekly', createdBy: 6, createdAt: '2026-04-01', avatar: 'https://i.pravatar.cc/150?img=4', hasNotification: false },
    { id: 5, name: 'Village Vault',   contributionAmount: 25000,  cycleLength: 12, frequency: 'weekly',    createdBy: 6, createdAt: '2026-03-15', avatar: 'https://i.pravatar.cc/150?img=5', hasNotification: true },
    { id: 6, name: 'Diaspora Circle', contributionAmount: 150000, cycleLength: 4,  frequency: 'monthly',   createdBy: 7, createdAt: '2026-04-05', avatar: 'https://i.pravatar.cc/150?img=6', hasNotification: false }
  ])

  const activeGroup = computed(() =>
    groups.value.find(g => g.id === activeGroupId.value) || groups.value[0]
  )

  // Groups the current user belongs to (derived from group_members)
  const currentUserGroups = computed(() => {
    const authStore = useAuthStore()
    const membersStore = useGroupMembersStore()
    if (!authStore.currentUser) return []
    const ids = membersStore.getGroupsForUser(authStore.currentUser.id)
    return groups.value.filter(g => ids.includes(g.id))
  })

  function getGroupById(id) {
    return groups.value.find(g => g.id === id) || null
  }

  /**
   * Group progress as a % — paid contributions / (members × amount × cycleLength).
   * For display on GroupCard.
   */
  function groupProgress(groupId) {
    const membersStore = useGroupMembersStore()
    const contribStore = useContributionsStore()
    const group = getGroupById(groupId)
    if (!group) return 0
    const memberCount = membersStore.getMemberCount(groupId) || 1
    const expected = group.contributionAmount * memberCount * group.cycleLength
    if (expected === 0) return 0
    const paid = contribStore.paidTotalForGroup(groupId)
    return Math.min(100, Math.round((paid / expected) * 100))
  }

  function setActiveGroup(id) {
    activeGroupId.value = id
  }

  function nextGroupId() {
    return groups.value.length ? Math.max(...groups.value.map(g => g.id)) + 1 : 1
  }

  /**
   * createGroup(payload) — full backend-like flow.
   *   1. Create group row
   *   2. Add current user as member with payoutPosition = 1
   *   3. Generate contributions schedule (cycleLength rows, first pending)
   *   4. Set new group as active
   */
  function createGroup({ name, contributionAmount, cycleLength, frequency = 'weekly' }) {
    const authStore = useAuthStore()
    const membersStore = useGroupMembersStore()
    const contribStore = useContributionsStore()

    const currentUser = authStore.currentUser
    if (!currentUser) {
      throw new Error('Cannot create group: no authenticated user')
    }

    // 1. Create group row
    const newId = nextGroupId()
    const group = {
      id: newId,
      name,
      contributionAmount,
      cycleLength,
      frequency,
      createdBy: currentUser.id,
      createdAt: new Date().toISOString(),
      avatar: `https://i.pravatar.cc/150?img=${(newId % 70) + 1}`,
      hasNotification: false
    }
    groups.value.push(group)

    // 2. Add creator as member with payoutPosition = 1 (silent: creation activity logged below)
    membersStore.addMember({
      userId: currentUser.id,
      groupId: newId,
      payoutPosition: 1,
      hasReceived: false,
      silent: true
    })

    // 3. Generate contributions schedule
    contribStore.generateSchedule(newId, currentUser.id, cycleLength, contributionAmount, frequency)

    // 4. Log activity
    const activityStore = useActivityStore()
    activityStore.addActivity({
      type: 'invite',
      message: `You created a new group "${name}" 🎉`,
      avatar: currentUser.avatar
    })

    // 5. Set as active group
    activeGroupId.value = newId

    return group
  }

  function updateGroup(id, patch) {
    const group = groups.value.find(g => g.id === id)
    if (group) Object.assign(group, patch)
  }

  function deleteGroup(id) {
    const idx = groups.value.findIndex(g => g.id === id)
    if (idx !== -1) groups.value.splice(idx, 1)
  }

  return {
    groups,
    activeGroupId,
    activeGroup,
    currentUserGroups,
    getGroupById,
    groupProgress,
    setActiveGroup,
    createGroup,
    updateGroup,
    deleteGroup
  }
})
