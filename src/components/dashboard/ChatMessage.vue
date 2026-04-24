<template>
  <div :class="['flex gap-3', isOwn ? 'flex-row-reverse' : '']">
    <img
      v-if="!isOwn && sender"
      :src="sender.avatar"
      :alt="sender.fullName"
      class="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
    />
    <div :class="['flex flex-col max-w-[75%]', isOwn ? 'items-end' : 'items-start']">
      <div class="flex items-center gap-2 mb-1">
        <span v-if="!isOwn && sender" class="text-xs text-gray-600 font-medium">{{ sender.fullName }}</span>
        <span class="text-xs text-gray-400">{{ formattedTime }}</span>
      </div>
      <div
        :class="[
          'px-4 py-2.5 rounded-2xl text-sm',
          isOwn
            ? 'bg-gray-100 text-gray-900 rounded-tr-sm'
            : 'bg-ajo-green text-white rounded-tl-sm'
        ]"
      >
        {{ message.text }}
      </div>
      <CheckIcon v-if="isOwn" class="w-3.5 h-3.5 text-gray-400 mt-1" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { CheckIcon } from '../layout/Icons.js'

const props = defineProps({
  message: { type: Object, required: true }
})

const authStore = useAuthStore()

const sender = computed(() => authStore.getUserById(props.message.senderId))
const isOwn = computed(() => props.message.senderId === authStore.currentUser?.id)

const formattedTime = computed(() => {
  const ts = props.message.timestamp
  if (!ts) return ''
  const d = new Date(ts)
  if (isNaN(d.getTime())) return ts
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
})
</script>
