<template>
  <div class="mb-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-900">Recent Activity</h2>
      <button
        v-if="canSimulatePayout"
        @click="simulatePayout"
        class="text-xs font-medium text-ajo-gold hover:text-ajo-gold/80 transition-colors"
      >
        Simulate payout →
      </button>
    </div>

    <div class="space-y-1">
      <p class="text-xs text-gray-500 font-medium mb-3">Today</p>

      <div v-if="sortedActivities.length === 0" class="text-center py-6">
        <p class="text-sm text-gray-400">No recent activity</p>
      </div>

      <div
        v-for="activity in sortedActivities"
        :key="activity.id"
        class="flex items-center gap-3 py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors"
      >
        <div class="relative flex-shrink-0">
          <img
            :src="activity.avatar"
            :alt="activity.type"
            class="w-9 h-9 rounded-full object-cover"
          />
          <span
            class="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-xs leading-none"
            :class="badgeClass(activity.type)"
          >{{ activityEmoji(activity.type) }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm text-gray-900">{{ activity.message }}</p>
        </div>
        <span class="text-xs text-gray-500 flex-shrink-0">{{ activityStore.formatTime(activity.timestamp) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useActivityStore } from '../../stores/activity'
import { useGroupsStore } from '../../stores/groups'
import { useGroupMembersStore } from '../../stores/groupMembers'

const activityStore = useActivityStore()
const groupsStore = useGroupsStore()
const groupMembersStore = useGroupMembersStore()

const sortedActivities = computed(() => activityStore.sortedActivities)

const nextEligibleMember = computed(() => {
  const groupId = groupsStore.activeGroupId
  if (!groupId) return null
  return groupMembersStore
    .getMembersByGroup(groupId)
    .filter(m => !m.hasReceived)
    .sort((a, b) => a.payoutPosition - b.payoutPosition)[0] || null
})

const canSimulatePayout = computed(() => !!nextEligibleMember.value)

function simulatePayout() {
  const m = nextEligibleMember.value
  if (m) groupMembersStore.markReceived(m.userId, m.groupId)
}

const activityEmoji = (type) => {
  if (type === 'payout') return '💰'
  if (type === 'contribution') return '✅'
  if (type === 'invite') return '👋'
  return '📌'
}

const badgeClass = (type) => {
  if (type === 'payout') return 'bg-green-100'
  if (type === 'contribution') return 'bg-blue-100'
  if (type === 'invite') return 'bg-orange-100'
  return 'bg-gray-100'
}
</script>
