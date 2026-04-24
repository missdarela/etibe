<template>
  <div class="mb-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-900">Active groups</h2>
      <button class="text-sm text-ajo-gold hover:text-ajo-gold/80 font-medium">View all</button>
    </div>

    <div v-if="groups.length === 0" class="text-center py-8">
      <p class="text-sm text-gray-500">No active groups yet</p>
      <p class="text-xs text-gray-400 mt-1">Join or create a group to get started</p>
    </div>

    <div v-else class="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
      <GroupCard
        v-for="group in groups"
        :key="group.id"
        :group="group"
        :isActive="group.id === activeGroupId"
        @click="groupsStore.setActiveGroup(group.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGroupsStore } from '../../stores/groups'
import GroupCard from './GroupCard.vue'

const groupsStore = useGroupsStore()
const groups = computed(() => groupsStore.groups)
const activeGroupId = computed(() => groupsStore.activeGroupId)
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
