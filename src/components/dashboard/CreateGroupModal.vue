<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="close"
      >
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="close" />

        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10">
          <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">Create a Group</h2>
              <p class="text-xs text-gray-500 mt-0.5">Start a new ajo savings group</p>
            </div>
            <button
              @click="close"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XIcon class="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="px-6 py-5 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Group Name</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="e.g. Money Monday Crew"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ajo-gold/30 focus:border-ajo-gold text-sm transition-colors"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Contribution Amount (₦)</label>
              <input
                v-model.number="form.contributionAmount"
                type="number"
                placeholder="e.g. 50000"
                min="1000"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ajo-gold/30 focus:border-ajo-gold text-sm transition-colors"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Frequency</label>
              <select
                v-model="form.frequency"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ajo-gold/30 focus:border-ajo-gold text-sm transition-colors bg-white"
                required
              >
                <option value="" disabled>Select frequency</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Cycle Length (# of cycles)</label>
              <input
                v-model.number="form.cycleLength"
                type="number"
                placeholder="e.g. 10"
                min="2"
                max="52"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-ajo-gold/30 focus:border-ajo-gold text-sm transition-colors"
                required
              />
              <p class="text-xs text-gray-500 mt-1">How many contributions the schedule generates.</p>
            </div>

            <div v-if="error" class="text-sm text-red-500 bg-red-50 px-4 py-2.5 rounded-lg">
              {{ error }}
            </div>

            <div class="flex gap-3 pt-2">
              <button
                type="button"
                @click="close"
                class="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex-1 px-4 py-2.5 rounded-lg bg-ajo-green text-white text-sm font-medium hover:bg-ajo-green/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting">Creating...</span>
                <span v-else>Create Group</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useGroupsStore } from '../../stores/groups'
import { XIcon } from '../layout/Icons.js'

const props = defineProps({
  isOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])

const groupsStore = useGroupsStore()

const isSubmitting = ref(false)
const error = ref('')

const form = reactive({
  name: '',
  contributionAmount: '',
  frequency: '',
  cycleLength: ''
})

const resetForm = () => {
  form.name = ''
  form.contributionAmount = ''
  form.frequency = ''
  form.cycleLength = ''
  error.value = ''
}

const close = () => {
  resetForm()
  emit('close')
}

const handleSubmit = async () => {
  error.value = ''

  if (!form.name.trim()) {
    error.value = 'Group name is required.'
    return
  }
  if (form.contributionAmount < 1000) {
    error.value = 'Minimum contribution is ₦1,000.'
    return
  }
  if (!form.frequency) {
    error.value = 'Please select a frequency.'
    return
  }
  if (!form.cycleLength || form.cycleLength < 2) {
    error.value = 'Cycle length must be at least 2.'
    return
  }

  isSubmitting.value = true

  await new Promise(resolve => setTimeout(resolve, 600))

  groupsStore.createGroup({
    name: form.name.trim(),
    contributionAmount: form.contributionAmount,
    cycleLength: form.cycleLength,
    frequency: form.frequency
  })

  isSubmitting.value = false
  close()
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(10px);
}
</style>
