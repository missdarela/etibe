<template>
  <div class="mb-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-900">Active groups</h2>
      <button class="text-sm text-ajo-gold hover:text-ajo-gold/80 font-medium">View all</button>
    </div>

    <div class="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
      <div
        v-for="group in groups"
        :key="group.id"
        class="flex flex-col items-center flex-shrink-0 cursor-pointer group"
      >
        <div class="relative mb-2">
          <svg class="w-20 h-20 -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="#E5E7EB"
              stroke-width="4"
              fill="none"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              :stroke="getProgressColor(group.progress)"
              stroke-width="4"
              fill="none"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="getStrokeDashoffset(group.progress)"
              stroke-linecap="round"
              class="transition-all duration-300"
            />
          </svg>
          <img
            :src="group.avatar"
            :alt="group.name"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full object-cover border-2 border-white"
          />
          <span
            v-if="group.hasNotification"
            class="absolute top-0 right-0 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"
          ></span>
        </div>
        <p class="text-xs text-gray-700 text-center max-w-[80px] truncate">{{ group.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGroupsStore } from '../../stores/groups'

const groupsStore = useGroupsStore()
const groups = computed(() => groupsStore.groups)

const circumference = 2 * Math.PI * 36

const getStrokeDashoffset = (progress) => {
  return circumference - (progress / 100) * circumference
}

const getProgressColor = (progress) => {
  if (progress >= 80) return '#10B981'
  if (progress >= 50) return '#F59E0B'
  return '#EF4444'
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
