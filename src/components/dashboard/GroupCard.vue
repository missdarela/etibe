<template>
  <div
    @click="$emit('click')"
    class="flex flex-col items-center flex-shrink-0 cursor-pointer"
  >
    <div class="relative mb-2">
      <svg class="w-20 h-20 -rotate-90">
        <circle cx="40" cy="40" r="36" stroke="#E5E7EB" stroke-width="4" fill="none" />
        <circle
          cx="40"
          cy="40"
          r="36"
          :stroke="progressColor"
          stroke-width="4"
          fill="none"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          stroke-linecap="round"
          class="transition-all duration-300"
        />
      </svg>
      <img
        :src="group.avatar"
        :alt="group.name"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full object-cover border-2 transition-all duration-200"
        :class="isActive ? 'border-ajo-gold' : 'border-white'"
      />
      <span
        v-if="group.hasNotification"
        class="absolute top-0 right-0 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"
      />
    </div>
    <p
      class="text-xs text-center max-w-[80px] truncate transition-colors"
      :class="isActive ? 'text-ajo-gold font-semibold' : 'text-gray-700'"
    >
      {{ group.name }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  group: { type: Object, required: true },
  isActive: { type: Boolean, default: false }
})

defineEmits(['click'])

const circumference = 2 * Math.PI * 36

const dashOffset = computed(() =>
  circumference - (props.group.progress / 100) * circumference
)

const progressColor = computed(() => {
  if (props.group.progress >= 80) return '#10B981'
  if (props.group.progress >= 50) return '#F59E0B'
  return '#EF4444'
})
</script>
