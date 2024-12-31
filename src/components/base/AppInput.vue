<script setup lang="ts">
import type { TextFieldTypes } from '../../types/fieldTypes'
import { Icon } from '@iconify/vue'
import { inject, ref } from 'vue'

defineProps<TextFieldTypes>()
const model = defineModel<string>()
const isTouched = ref(false)
const isSubmitted = inject('isSubmitted', false)
</script>

<template>
  <div class="w-full relative">
    <div class="w-full flex items-center bg-transparent justify-center gap-3 h-[55px] rounded-[18px] border-2 border-[#9c9c9c] px-3">
      <Icon :icon="icon" width="24" height="24" />
      <input
        v-model="model"
        :type
        :placeholder
        class="flex-1 bg-transparent outline-none text-lg text-white placeholder:text-gray-500"
        @input="isTouched = true"
      >
    </div>
    <p v-if="error && (isTouched || isSubmitted)" class="text-red-600 absolute top-1/2 -translate-y-1/2 left-2 font-semibold">
      {{ error }}
    </p>
  </div>
</template>
