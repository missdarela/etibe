<template>
  <svg :width="size" :height="size" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" :stroke="color" stroke-width="2"/>
    <path d="M20 8L24 16L32 18L26 24L28 32L20 28L12 32L14 24L8 18L16 16L20 8Z" :fill="color" opacity="0.3"/>
    <circle cx="20" cy="20" r="6" :stroke="color" stroke-width="1.5"/>
    <path d="M20 14V26M14 20H26" :stroke="color" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 40
  },
  color: {
    type: String,
    default: '#C8A96A'
  }
})
</script>
