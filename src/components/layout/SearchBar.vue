<template>
  <div class="relative flex-1 max-w-xl" ref="containerRef">
    <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Find a group, name, admin or invite code..."
      class="w-full pl-10 pr-10 py-2.5 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ajo-gold/30 text-sm"
      @focus="showResults = true"
    />
    <button
      v-if="searchQuery"
      @click="clearSearch"
      class="absolute right-3 top-1/2 -translate-y-1/2"
    >
      <XIcon class="w-4 h-4 text-gray-400 hover:text-gray-600" />
    </button>

    <Transition name="dropdown">
      <div
        v-if="showResults && searchQuery"
        class="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden"
      >
        <div v-if="filteredGroups.length > 0">
          <p class="px-4 pt-3 pb-1 text-xs font-medium text-gray-400 uppercase tracking-wider">Groups</p>
          <div
            v-for="group in filteredGroups"
            :key="group.id"
            @click="selectGroup(group)"
            class="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <img :src="group.avatar" :alt="group.name" class="w-8 h-8 rounded-full object-cover" />
            <div>
              <p class="text-sm font-medium text-gray-900">{{ group.name }}</p>
              <p class="text-xs text-gray-500">
                {{ group.members }} members · ₦{{ group.contributionAmount.toLocaleString('en-NG') }}/{{ group.frequency }}
              </p>
            </div>
          </div>
        </div>

        <div v-else class="px-4 py-6 text-center">
          <p class="text-sm text-gray-500">No results for "{{ searchQuery }}"</p>
          <p class="text-xs text-gray-400 mt-1">Try searching by group name or member name</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGroupsStore } from '../../stores/groups'
import { SearchIcon, XIcon } from './Icons.js'

const groupsStore = useGroupsStore()
const searchQuery = ref('')
const showResults = ref(false)
const containerRef = ref(null)

const filteredGroups = computed(() => {
  if (!searchQuery.value.trim()) return []
  const q = searchQuery.value.toLowerCase()
  return groupsStore.groups.filter(g =>
    g.name.toLowerCase().includes(q) ||
    g.nextPayoutUser?.toLowerCase().includes(q)
  )
})

function selectGroup(group) {
  groupsStore.setActiveGroup(group.id)
  searchQuery.value = ''
  showResults.value = false
}

function clearSearch() {
  searchQuery.value = ''
  showResults.value = false
}

const handleClickOutside = (e) => {
  if (containerRef.value && !containerRef.value.contains(e.target)) {
    showResults.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
