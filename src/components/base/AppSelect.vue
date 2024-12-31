<script lang="ts" setup>
import type { SelectFieldTypes } from '../../types/fieldTypes'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { name, error } = defineProps<SelectFieldTypes>()
const model = defineModel<string>()
const { t } = useI18n()
const isTouched = ref(false)
const isSubmitted = inject('isSubmitted', false)
</script>

<template>
  <div class="relative w-full">
    <div class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
      <Icon
        :icon="icon"
        width="24"
        height="24"
      />
    </div>

    <select
      v-model="model"
      :class="[!model ? 'text-gray-500' : 'text-white']"
      class="w-full pr-12 appearance-none outline-none bg-transparent h-[55px] transition-all duration-300 ease-out rounded-[18px] border-2 px-3"
      @change="isTouched = true"
    >
      <option value="" class="bg-[#161616]" disabled selected>
        {{ placeholder }}
      </option>
      <option
        v-for="(item, index) in options"
        :key="index"
        class="bg-[#161616] text-white cursor-pointer"
        :value="item"
      >
        {{ t(`${name}.${item}`) }}
      </option>
    </select>

    <p v-if="error && (isTouched || isSubmitted)" class="text-red-600 absolute top-1/2 -translate-y-1/2 left-2 font-semibold">
      {{ t(error) }}
    </p>
  </div>
</template>
