<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 8C6 6.89543 6.89543 6 8 6H16C17.1046 6 18 6.89543 18 8V9H6V8Z" :fill="color" opacity="0.3"/>
    <path d="M5 9H19C19.5523 9 20 9.44772 20 10V18C20 19.6569 18.6569 21 17 21H7C5.34315 21 4 19.6569 4 18V10C4 9.44772 4.44772 9 5 9Z" :stroke="color" stroke-width="2" stroke-linecap="round"/>
    <path d="M9 3V6M15 3V6" :stroke="color" stroke-width="2" stroke-linecap="round"/>
    <circle cx="12" cy="15" r="1.5" :fill="color"/>
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 24
  },
  color: {
    type: String,
    default: 'currentColor'
  }
})
</script>
