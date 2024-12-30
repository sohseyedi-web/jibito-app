<script setup lang="ts">
import type { CategoryStyleTypes } from '../../types/commonTypes'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const { category } = defineProps<{ category: string }>()

const categoryStyles: Record<string, CategoryStyleTypes> = {
  health: {
    icon: 'solar:heart-bold',
    bgColor: 'bg-red-600',
  },
  travel: {
    icon: 'hugeicons:travel-bag',
    bgColor: 'bg-blue-600',
  },
  shopping: {
    icon: 'solar:bag-4-broken',
    bgColor: 'bg-purple-600',
  },
  entertainment: {
    icon: 'solar:emoji-funny-circle-linear',
    bgColor: 'bg-yellow-500',
  },
  bill: {
    icon: 'solar:bill-check-linear',
    bgColor: 'bg-orange-600',
  },
  loan: {
    icon: 'proicons:bank',
    bgColor: 'bg-indigo-600',
  },
  others: {
    icon: 'solar:hashtag-bold',
    bgColor: 'bg-gray-700',
  },
  food: {
    icon: 'fluent:food-32-filled',
    bgColor: 'bg-[#ff00a6]',
  },
  salary: {
    icon: 'hugeicons:work-update',
    bgColor: 'bg-emerald-600',
  },
  income: {
    icon: 'iconoir:coins',
    bgColor: 'bg-green-500',
  },
  rent: {
    icon: 'mdi:bed-king-outline',
    bgColor: 'bg-[#8D0B41]',
  },
}

const categoryStyle = computed(() => {
  return categoryStyles[category.toLowerCase()] || categoryStyles.others
})
</script>

<template>
  <div class="rounded-2xl size-12 flex items-center justify-center" :class="[categoryStyle.bgColor]">
    <Icon :icon="categoryStyle.icon" class="text-white size-8" />
  </div>
</template>
