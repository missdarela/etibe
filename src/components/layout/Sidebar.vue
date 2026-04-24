<template>
  <aside class="w-44 bg-ajo-green text-white flex flex-col h-screen fixed left-0 top-0">
    <div class="p-3">
      <div class="flex justify-center">
        <img src="/src/assets/sujo_logo.png" alt="Sujo" class="h-24 w-auto" />
      </div>
    </div>

    <nav class="flex-1 px-3 space-y-1 overflow-y-auto">
      <router-link
        v-for="item in mainNav"
        :key="item.name"
        :to="item.path"
        class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
        :class="isActive(item.path) ? 'bg-ajo-gold text-white' : 'text-white/80 hover:bg-white/10'"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span>{{ item.name }}</span>
      </router-link>

      <div class="pt-4 pb-2">
        <p class="px-3 text-xs text-white/50 uppercase tracking-wider mb-2">Activity</p>
        <router-link
          v-for="item in activityNav"
          :key="item.name"
          :to="item.path"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
          :class="isActive(item.path) ? 'bg-ajo-gold text-white' : 'text-white/80 hover:bg-white/10'"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span>{{ item.name }}</span>
        </router-link>
      </div>

      <div class="pt-4 pb-2">
        <p class="px-3 text-xs text-white/50 uppercase tracking-wider mb-2">Account</p>
        <router-link
          v-for="item in accountNav"
          :key="item.name"
          :to="item.path"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
          :class="isActive(item.path) ? 'bg-ajo-gold text-white' : 'text-white/80 hover:bg-white/10'"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span>{{ item.name }}</span>
        </router-link>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { 
  HomeIcon, WalletIcon, UsersIcon, CreditCardIcon,
  BookOpenIcon, ClockIcon, BarChartIcon,
  UserIcon, BriefcaseIcon, GiftIcon, SettingsIcon, HeadphonesIcon
} from './Icons.js'

const route = useRoute()

const mainNav = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'Wallet', path: '/wallet', icon: WalletIcon },
  { name: 'My Groups', path: '/groups', icon: UsersIcon },
  { name: 'Transactions', path: '/transactions', icon: CreditCardIcon }
]

const activityNav = [
  { name: 'Blog', path: '/blog', icon: BookOpenIcon },
  { name: 'History', path: '/history', icon: ClockIcon },
  { name: 'Charts', path: '/charts', icon: BarChartIcon }
]

const accountNav = [
  { name: 'Profile', path: '/profile', icon: UserIcon },
  { name: 'Sub-accounts', path: '/sub-accounts', icon: BriefcaseIcon },
  { name: 'Referrals', path: '/referrals', icon: GiftIcon },
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
  { name: 'Support', path: '/support', icon: HeadphonesIcon }
]

const isActive = (path) => {
  return route.path === path
}
</script>
