<script setup lang="ts">
import type { TextFieldTypes } from '../../types/fieldTypes'
import { Icon } from '@iconify/vue'
import { computed, inject, ref } from 'vue'

const { error } = defineProps<TextFieldTypes>()
const model = defineModel<string>()

const isTouched = ref(false)
const isSubmitted = inject<boolean>('isSubmitted', false)

const borderClass = computed(() =>
  error && (isTouched.value || isSubmitted)
    ? 'border-red-600'
    : 'border-[#9c9c9c]',
)

const iconClass = computed(() =>
  error && (isTouched.value || isSubmitted)
    ? 'text-red-600'
    : 'text-white',
)
</script>

<template>
  <div class="w-full relative">
    <div
      class="w-full flex items-center bg-transparent transition-all duration-300 ease-out justify-center gap-3 h-[55px] rounded-[18px] border-2 px-3"
      :class="borderClass"
    >
      <Icon
        :icon="icon"
        width="24"
        height="24"
        class="transition-all duration-300 ease-out"
        :class="iconClass"
      />
      <input
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        class="flex-1 bg-transparent outline-none text-lg text-white placeholder:text-gray-500"
        @input="isTouched = true"
      >
    </div>
    <p
      v-if="error && (isTouched || isSubmitted)"
      class="text-red-600 absolute top-1/2 -translate-y-1/2 left-2 font-semibold"
    >
      {{ error }}
    </p>
  </div>
</template>
