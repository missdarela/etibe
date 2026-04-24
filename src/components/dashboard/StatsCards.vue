<template>
  <div class="grid grid-cols-2 gap-4 mb-6">
    <div class="col-span-1 bg-ajo-green rounded-2xl p-6 relative overflow-hidden">
      <div class="relative z-10">
        <p class="text-white/80 text-sm mb-2">Total Saved</p>
        <p class="text-white text-4xl font-bold">₦{{ formatNumber(totalSaved) }}</p>
      </div>
      <img src="/src/assets/total_icon.png" alt="" class="absolute -right-4 top-2 h-full w-42 opacity-20" />
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-600 text-sm mb-2">Active Groups</p>
          <p class="text-gray-900 text-4xl font-bold">{{ activeGroupsCount }}</p>
        </div>
        <div class="w-14 h-14 bg-ajo-gold/10 rounded-full flex items-center justify-center">
          <UsersIcon class="w-7 h-7 text-ajo-gold" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between">
        <div class="flex-1 min-w-0">
          <p class="text-gray-600 text-sm mb-2">Next Contribution</p>
          <p class="text-gray-900 text-4xl font-bold">{{ nextContributionDisplay }}</p>
          <p v-if="nextContribution" class="text-xs text-gray-500 mt-1">{{ nextContributionSubtitle }}</p>
          <button
            v-if="nextContribution"
            @click="handlePayNow"
            class="mt-3 inline-flex items-center gap-1 text-xs font-medium text-ajo-gold hover:text-ajo-gold/80 transition-colors"
          >
            Pay now →
          </button>
        </div>
        <div class="w-14 h-14 bg-ajo-beige rounded-full flex items-center justify-center flex-shrink-0">
          <img src="/src/assets/nxtc.png" alt="Next Contribution" class="w-16 h-16" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-600 text-sm mb-2">Next Payout</p>
          <p class="text-gray-900 text-4xl font-bold">{{ nextPayoutDisplay }}</p>
          <p v-if="nextPayoutPosition" class="text-xs text-gray-500 mt-1">Position in {{ activeGroup?.name }}</p>
        </div>
        <div class="w-14 h-14 bg-ajo-beige rounded-full flex items-center justify-center">
          <img src="/src/assets/donationbox.png" alt="Next Payout" class="w-16 h-16" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useGroupsStore } from '../../stores/groups'
import { useGroupMembersStore } from '../../stores/groupMembers'
import { useContributionsStore } from '../../stores/contributions'
import { UsersIcon } from '../layout/Icons.js'

const authStore = useAuthStore()
const groupsStore = useGroupsStore()
const groupMembersStore = useGroupMembersStore()
const contributionsStore = useContributionsStore()

const currentUserId = computed(() => authStore.currentUser?.id ?? null)
const activeGroup = computed(() => groupsStore.activeGroup)

// 1. Total Saved — sum of current user's paid contributions
const totalSaved = computed(() => {
  if (!currentUserId.value) return 0
  return contributionsStore.totalSavedByUser(currentUserId.value)
})

// 2. Active Groups — count of groups current user belongs to
const activeGroupsCount = computed(() => {
  if (!currentUserId.value) return 0
  return groupMembersStore.getGroupsForUser(currentUserId.value).length
})

// 3. Next Contribution — earliest pending contribution for current user
const nextContribution = computed(() => {
  if (!currentUserId.value) return null
  return contributionsStore.nextPendingForUser(currentUserId.value)
})

const nextContributionDisplay = computed(() => {
  if (!nextContribution.value) return '—'
  return `₦${formatNumber(nextContribution.value.amount)}`
})

const nextContributionSubtitle = computed(() => {
  if (!nextContribution.value) return ''
  const group = groupsStore.getGroupById(nextContribution.value.groupId)
  const date = new Date(nextContribution.value.date)
  const dateStr = date.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })
  return `${group?.name ?? ''} · ${dateStr}`
})

// 4. Next Payout — current user's payout position in active group
const nextPayoutMember = computed(() => {
  if (!currentUserId.value || !activeGroup.value) return null
  return groupMembersStore.getMember(currentUserId.value, activeGroup.value.id)
})

const nextPayoutPosition = computed(() => nextPayoutMember.value?.payoutPosition ?? null)

const nextPayoutDisplay = computed(() => {
  return nextPayoutPosition.value ? `#${nextPayoutPosition.value}` : '—'
})

function formatNumber(num) {
  return (num ?? 0).toLocaleString('en-NG')
}

function handlePayNow() {
  if (nextContribution.value) {
    contributionsStore.markPaid(nextContribution.value.id)
  }
}
</script>
