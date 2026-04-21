<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <div class="flex items-center gap-3">
        <button class="p-1 hover:bg-gray-100 rounded transition-colors">
          <ArrowLeftIcon class="w-5 h-5 text-gray-600" />
        </button>
        <img :src="currentGroup.avatar" :alt="currentGroup.name" class="w-9 h-9 rounded-full object-cover" />
        <h3 class="font-semibold text-gray-900">{{ currentGroup.name }}</h3>
      </div>
      <button class="p-1 hover:bg-gray-100 rounded transition-colors">
        <MoreVerticalIcon class="w-5 h-5 text-gray-600" />
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div class="text-center">
        <span class="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Today</span>
      </div>

      <div
        v-for="message in messages"
        :key="message.id"
        :class="['flex gap-3', message.isOwn ? 'flex-row-reverse' : '']"
      >
        <img
          v-if="!message.isOwn"
          :src="message.avatar"
          :alt="message.sender"
          class="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
        <div :class="['flex flex-col', message.isOwn ? 'items-end' : 'items-start']">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xs text-gray-600">{{ message.sender }}</span>
            <span class="text-xs text-gray-400">{{ message.time }}</span>
          </div>
          <div
            :class="[
              'max-w-xs px-4 py-2.5 rounded-2xl',
              message.isOwn
                ? 'bg-gray-100 text-gray-900 rounded-tr-sm'
                : 'bg-ajo-green text-white rounded-tl-sm'
            ]"
          >
            <p class="text-sm">{{ message.message }}</p>
          </div>
          <CheckIcon
            v-if="message.isOwn"
            class="w-4 h-4 text-gray-400 mt-1"
          />
        </div>
      </div>
    </div>

    <div class="p-4 border-t border-gray-200">
      <div class="flex items-center gap-2">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type a message..."
          class="flex-1 px-4 py-2.5 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-ajo-gold/30 text-sm"
          @keypress.enter="sendMessage"
        />
        <button
          @click="sendMessage"
          class="w-10 h-10 bg-ajo-green text-white rounded-full flex items-center justify-center hover:bg-ajo-green/90 transition-colors"
        >
          <SendIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useChatStore } from '../../stores/chat'
import { ArrowLeftIcon, MoreVerticalIcon, CheckIcon, SendIcon } from '../layout/Icons.js'

const chatStore = useChatStore()
const newMessage = ref('')

const currentGroup = computed(() => chatStore.currentGroup)
const messages = computed(() => chatStore.messages)

const sendMessage = () => {
  if (newMessage.value.trim()) {
    chatStore.sendMessage(newMessage.value)
    newMessage.value = ''
  }
}
</script>
