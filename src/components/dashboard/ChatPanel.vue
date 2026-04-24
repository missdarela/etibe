<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-[600px]">
    <div class="flex items-center justify-between p-4 border-b border-gray-200">
      <div class="flex items-center gap-3">
        <img
          :src="activeGroup.avatar"
          :alt="activeGroup.name"
          class="w-9 h-9 rounded-full object-cover"
        />
        <div>
          <h3 class="font-semibold text-gray-900 text-sm">{{ activeGroup.name }}</h3>
          <p class="text-xs text-gray-400">{{ activeGroup.members }} members</p>
        </div>
      </div>
      <button class="p-1 hover:bg-gray-100 rounded transition-colors">
        <MoreVerticalIcon class="w-5 h-5 text-gray-600" />
      </button>
    </div>

    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
      <div class="text-center">
        <span class="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Today</span>
      </div>

      <div
        v-if="activeMessages.length === 0"
        class="flex flex-col items-center justify-center h-32 text-center"
      >
        <p class="text-sm text-gray-400">No messages yet</p>
        <p class="text-xs text-gray-400 mt-1">Be the first to say something!</p>
      </div>

      <ChatMessage
        v-for="message in activeMessages"
        :key="message.id"
        :message="message"
      />
    </div>

    <div class="p-4 border-t border-gray-200">
      <div class="flex items-center gap-2">
        <input
          v-model="newMessage"
          type="text"
          :placeholder="`Message ${activeGroup.name}...`"
          class="flex-1 px-4 py-2.5 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-ajo-gold/30 text-sm"
          @keypress.enter="handleSend"
        />
        <button
          @click="handleSend"
          :disabled="!newMessage.trim()"
          class="w-10 h-10 bg-ajo-green text-white rounded-full flex items-center justify-center hover:bg-ajo-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useChatStore } from '../../stores/chat'
import { useGroupsStore } from '../../stores/groups'
import { MoreVerticalIcon, SendIcon } from '../layout/Icons.js'
import ChatMessage from './ChatMessage.vue'

const chatStore = useChatStore()
const groupsStore = useGroupsStore()
const newMessage = ref('')
const messagesContainer = ref(null)

const activeGroup = computed(() => groupsStore.activeGroup)
const activeMessages = computed(() =>
  chatStore.getMessagesForGroup(groupsStore.activeGroupId)
)

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

watch(activeMessages, scrollToBottom, { deep: true })
watch(() => groupsStore.activeGroupId, scrollToBottom)

const handleSend = () => {
  if (newMessage.value.trim()) {
    chatStore.sendMessage(groupsStore.activeGroupId, newMessage.value.trim())
    newMessage.value = ''
  }
}
</script>
