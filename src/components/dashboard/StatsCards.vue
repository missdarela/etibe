<template>
  <div class="grid grid-cols-2 gap-4 mb-6">
    <div class="col-span-1 bg-ajo-green rounded-2xl p-6 relative overflow-hidden">
      <div class="relative z-10">
        <p class="text-white/80 text-sm mb-2">Total Saved</p>
        <p class="text-white text-4xl font-bold">₦{{ formatNumber(stats.totalSaved) }}</p>
      </div>
      <svg class="absolute right-0 top-0 w-40 h-40 opacity-10" viewBox="0 0 160 160" fill="none">
        <circle cx="80" cy="80" r="70" stroke="#C8A96A" stroke-width="2"/>
        <circle cx="80" cy="80" r="50" stroke="#C8A96A" stroke-width="2"/>
        <circle cx="80" cy="80" r="30" stroke="#C8A96A" stroke-width="2"/>
        <path d="M80 10 L80 150 M10 80 L150 80" stroke="#C8A96A" stroke-width="1" opacity="0.5"/>
      </svg>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-600 text-sm mb-2">Active Groups</p>
          <p class="text-gray-900 text-4xl font-bold">{{ stats.activeGroups }}</p>
        </div>
        <div class="w-14 h-14 bg-ajo-gold/10 rounded-full flex items-center justify-center">
          <UsersIcon class="w-7 h-7 text-ajo-gold" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-600 text-sm mb-2">Next Contribution</p>
          <p class="text-gray-900 text-4xl font-bold">{{ stats.nextContribution }}</p>
        </div>
        <div class="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
          <PotIcon :size="28" color="#D4A574" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-600 text-sm mb-2">Next Payout</p>
          <p class="text-gray-900 text-4xl font-bold">{{ stats.nextPayout }}</p>
        </div>
        <div class="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center">
          <BoxIcon :size="28" color="#D4A574" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGroupsStore } from '../../stores/groups'
import { UsersIcon } from '../layout/Icons.js'
import PotIcon from '../../assets/icons/PotIcon.vue'
import BoxIcon from '../../assets/icons/BoxIcon.vue'

const groupsStore = useGroupsStore()
const stats = computed(() => groupsStore.stats)

const formatNumber = (num) => {
  return num.toLocaleString('en-NG')
}
</script>
