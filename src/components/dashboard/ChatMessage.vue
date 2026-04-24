<template>
  <div :class="['flex gap-3', message.isOwn ? 'flex-row-reverse' : '']">
    <img
      v-if="!message.isOwn"
      :src="message.avatar"
      :alt="message.sender"
      class="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
    />
    <div :class="['flex flex-col max-w-[75%]', message.isOwn ? 'items-end' : 'items-start']">
      <div class="flex items-center gap-2 mb-1">
        <span v-if="!message.isOwn" class="text-xs text-gray-600 font-medium">{{ message.sender }}</span>
        <span class="text-xs text-gray-400">{{ message.timestamp }}</span>
      </div>
      <div
        :class="[
          'px-4 py-2.5 rounded-2xl text-sm',
          message.isOwn
            ? 'bg-gray-100 text-gray-900 rounded-tr-sm'
            : 'bg-ajo-green text-white rounded-tl-sm'
        ]"
      >
        {{ message.text }}
      </div>
      <CheckIcon v-if="message.isOwn" class="w-3.5 h-3.5 text-gray-400 mt-1" />
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from '../layout/Icons.js'

defineProps({
  message: { type: Object, required: true }
})
</script>
