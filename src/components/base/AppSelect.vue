<!-- <script setup lang="ts">
import type { SelectFieldTypes } from '@/types/SelectFieldType'
import { Icon } from '@iconify/vue'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'
import { inject, ref, watch } from 'vue'

defineProps<SelectFieldTypes>()
const model = defineModel<string>()
const isTouched = ref(false)
const isOpen = ref<true | false>(true)
const isSubmitted = inject('isSubmitted', false)

watch(isOpen, (newValue) => {
  if (!newValue && !model.value) {
    isTouched.value = true
  }
})
</script>

<template>
  <div class="w-full">
    <SelectRoot v-model="model">
      <SelectTrigger
        class="w-full flex items-center relative bg-transparent justify-between h-[55px] rounded-[18px] border-2 border-[#9c9c9c] px-3"
        aria-label="Customise options"
      >
        <div class="flex items-center gap-x-2 relative">
          <Icon :icon="icon" width="24" height="24" />
          <SelectValue :placeholder class="text-gray-500" />
        </div>
        <Icon
          icon="radix-icons:chevron-down"
          class="h-3.5 w-3.5"
        />
      </SelectTrigger>

      <SelectPortal class="relative">
        <SelectContent
          class="w-full bg-[#161616] rounded-[18px] border-2 border-[#9c9c9c] py-3 absolute left-0"
        >
          <SelectViewport class="w-full">
            <SelectGroup class="w-full">
              <SelectItem
                v-for="(option, index) in options"
                :key="index"
                class="text-lg my-2 leading-none text-white rounded-[3px] flex items-center gap-x-2 h-[25px] p-3 relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-slate-900 cursor-pointer data-[highlighted]:text-green1"
                :value="option"
              >
                <SelectItemText>
                  {{ option }}
                </SelectItemText>
                <SelectItemIndicator class=" text-green-500">
                  <Icon icon="solar:check-circle-broken" class="size-5" />
                </SelectItemIndicator>
              </SelectItem>
            </SelectGroup>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
    <p v-if="error && (isTouched || isSubmitted)" class="text-red-600 text-left text-sm my-2 ml-3 font-semibold">
      {{ error }}
    </p>
  </div>
</template> -->

<script lang="ts" setup>
import type { SelectFieldTypes } from '../../types/fieldTypes'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { inject, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { name } = defineProps<SelectFieldTypes>()
const model = defineModel<string>()
const { t } = useI18n()
const isTouched = ref(false)
const isSubmitted = inject('isSubmitted', false)
</script>

<template>
  <div class="relative w-full">
    <div class="absolute right-3.5 top-1/2 pointer-events-none">
      <Icon :icon="icon" width="24" height="24" />
    </div>

    <select
      v-model="model"
      :class="!model ? 'text-gray-500' : 'text-white'"
      class="w-full pr-12 appearance-none outline-none bg-transparent h-[55px] rounded-[18px] border-2 border-[#9c9c9c] px-3"
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

    <p v-if="error && (isTouched || isSubmitted)" class="text-red-600 text-right py-3 mr-3 font-semibold">
      {{ t(error) }}
    </p>
  </div>
</template>
