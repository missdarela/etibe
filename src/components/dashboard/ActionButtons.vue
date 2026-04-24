<template>
  <div class="grid grid-cols-4 gap-4 mt-6">
    <button
      v-for="action in actions"
      :key="action.title"
      @click="action.onClick"
      class="flex flex-col items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-ajo-gold hover:shadow-md transition-all group"
    >
      <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-ajo-gold/10 transition-colors">
        <component :is="action.icon" class="w-6 h-6 text-gray-600 group-hover:text-ajo-gold transition-colors" />
      </div>
      <div class="text-center">
        <p class="text-sm font-semibold text-gray-900 mb-0.5">{{ action.title }}</p>
        <p class="text-xs text-gray-500">{{ action.subtitle }}</p>
      </div>
    </button>
  </div>

  <CreateGroupModal :isOpen="showCreateModal" @close="showCreateModal = false" />
</template>

<script setup>
import { ref } from 'vue'
import { PlusIcon, UsersIcon, AwardIcon, HelpCircleIcon } from '../layout/Icons.js'
import CreateGroupModal from './CreateGroupModal.vue'

const showCreateModal = ref(false)

const actions = [
  {
    title: 'Create a Group',
    subtitle: 'Create a new ajo',
    icon: PlusIcon,
    onClick: () => { showCreateModal.value = true }
  },
  {
    title: 'Join a Group',
    subtitle: 'Use invite code',
    icon: UsersIcon,
    onClick: () => {}
  },
  {
    title: 'Ajo Points',
    subtitle: 'Earn rewards',
    icon: AwardIcon,
    onClick: () => {}
  },
  {
    title: 'Help Center',
    subtitle: "We're here to help",
    icon: HelpCircleIcon,
    onClick: () => {}
  }
]
</script>
