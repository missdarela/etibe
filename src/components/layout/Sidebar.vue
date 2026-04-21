<template>
  <aside class="w-44 bg-ajo-green text-white flex flex-col h-screen fixed left-0 top-0">
    <div class="p-6">
      <div class="flex items-center gap-3 mb-1">
        <AjoLogo :size="32" />
        <span class="text-xl font-semibold">Sujo</span>
      </div>
      <p class="text-xs text-white/70 ml-11">We rise together</p>
    </div>

    <nav class="flex-1 px-3 space-y-1">
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

    <div class="h-20 relative overflow-hidden">
      <svg class="w-full h-full" viewBox="0 0 176 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="zigzag" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 L10 0 L20 10 L10 20 Z" fill="#C8A96A" opacity="0.15"/>
        </pattern>
        <rect width="176" height="80" fill="url(#zigzag)"/>
        <path d="M0 20 L20 0 L40 20 L60 0 L80 20 L100 0 L120 20 L140 0 L160 20 L176 10" 
              stroke="#C8A96A" stroke-width="2" opacity="0.3" fill="none"/>
      </svg>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import AjoLogo from '../../assets/icons/AjoLogo.vue'
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
