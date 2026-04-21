<template>
  <div class="flex h-screen bg-ajo-beige">
    <Sidebar />
    
    <div class="flex-1 ml-44 flex flex-col">
      <Header />
      
      <main class="flex-1 overflow-y-auto">
        <div class="flex gap-6 p-6">
          <div class="flex-1">
            <WelcomeBanner />
            <StatsCards />
            <ActiveGroups />
            <RecentActivity />
            <ActionButtons />
          </div>
          
          <div class="w-96 flex-shrink-0">
            <ChatPanel />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/layout/Sidebar.vue'
import Header from '../components/layout/Header.vue'
import WelcomeBanner from '../components/dashboard/WelcomeBanner.vue'
import StatsCards from '../components/dashboard/StatsCards.vue'
import ActiveGroups from '../components/dashboard/ActiveGroups.vue'
import RecentActivity from '../components/dashboard/RecentActivity.vue'
import ChatPanel from '../components/dashboard/ChatPanel.vue'
import ActionButtons from '../components/dashboard/ActionButtons.vue'
</script>
