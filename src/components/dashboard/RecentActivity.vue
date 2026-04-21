<template>
  <div class="mb-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
    
    <div class="space-y-1">
      <p class="text-xs text-gray-500 font-medium mb-3">Today</p>
      
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="flex items-center gap-3 py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors"
      >
        <img
          :src="activity.avatar"
          :alt="activity.user"
          class="w-9 h-9 rounded-full object-cover flex-shrink-0"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm text-gray-900">
            {{ getActivityText(activity) }}
          </p>
        </div>
        <span class="text-xs text-gray-500 flex-shrink-0">{{ activity.time }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGroupsStore } from '../../stores/groups'

const groupsStore = useGroupsStore()
const activities = computed(() => groupsStore.activities)

const getActivityText = (activity) => {
  if (activity.type === 'payout') {
    return `${activity.user} received his payout of ₦${activity.amount.toLocaleString('en-NG')} ${activity.emoji}`
  } else if (activity.type === 'contribution') {
    return `${activity.user} contributed ₦${activity.amount.toLocaleString('en-NG')} to ${activity.group}`
  } else if (activity.type === 'invite') {
    return `New invite: ${activity.group}`
  }
  return ''
}
</script>
