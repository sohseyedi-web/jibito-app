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
    <div class="w-full flex items-center bg-transparent justify-center gap-3 lg:h-[55px] h-[50px] rounded-[18px] border-2 border-[#2c2c2c] px-3">
      <Icon :icon="icon" class="transition-all duration-300" width="22" height="22" :class="error && (isTouched || isSubmitted) ? 'text-red-600' : 'text-white'" />
      <input
        v-model="model"
        :type
        :placeholder
        class="flex-1 bg-transparent outline-none lg:text-lg text-white placeholder:text-gray-500"
        @input="isTouched = true"
      >
    </div>
    <p v-if="error && (isTouched || isSubmitted)" class="text-red-600 absolute top-1/2 -translate-y-1/2 left-2 font-semibold lg:text-base text-sm">
      {{ error }}
    </p>
  </div>
</template>
