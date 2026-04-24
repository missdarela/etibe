<template>
  <div class="flex h-screen bg-ajo-beige">
    <Sidebar />

    <div class="flex-1 ml-44 flex flex-col min-w-0">
      <Header />

      <main class="flex-1 overflow-y-auto">
        <div class="flex gap-6 p-6">
          <div class="flex-1 min-w-0">
            <WelcomeBanner />
            <StatsCards />
            <ActiveGroups />
            <RecentActivity />
            <ActionButtons />
          </div>

          <Transition name="chat-panel">
            <div v-if="chatStore.isVisible" class="w-80 flex-shrink-0">
              <ChatPanel />
            </div>
          </Transition>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from '../stores/chat'
import Sidebar from '../components/layout/Sidebar.vue'
import Header from '../components/layout/Header.vue'
import WelcomeBanner from '../components/dashboard/WelcomeBanner.vue'
import StatsCards from '../components/dashboard/StatsCards.vue'
import ActiveGroups from '../components/dashboard/ActiveGroups.vue'
import RecentActivity from '../components/dashboard/RecentActivity.vue'
import ChatPanel from '../components/dashboard/ChatPanel.vue'
import ActionButtons from '../components/dashboard/ActionButtons.vue'

const chatStore = useChatStore()
</script>

<style scoped>
.chat-panel-enter-active,
.chat-panel-leave-active {
  transition: all 0.3s ease;
}
.chat-panel-enter-from,
.chat-panel-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
