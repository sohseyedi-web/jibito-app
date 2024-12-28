<script setup lang="ts">
import type { TransactionType } from '../../types/storeTypes'
import { useI18n } from 'vue-i18n'
import { toPersianNumbersWithComma as TPNWC } from '../../utils/toPersianNumbers'
import CategoryIcon from '../common/CategoryIcon.vue'

defineProps<{ transaction: TransactionType }>()
const { t } = useI18n()

function onConvertShort(date?: string) {
  const validDate = date && !new Date(date).getTime() ? new Date(date) : new Date()

  return validDate.toLocaleDateString('fa-IR', { day: 'numeric', month: 'short' })
}
</script>

<template>
  <div :key="transaction.id" class="flex items-center justify-between bg-black p-2 rounded-2xl my-2">
    <div class="flex items-center gap-x-2">
      <CategoryIcon :category="transaction.category" />
      <div class="text-white">
        <h5 class="text-lg font-semibold">
          {{ t(`category.${transaction.category}`) }}
        </h5>
        <span class="text-gray-500 text-sm">{{ transaction.description || "توضیحی وارد نشده" }}</span>
      </div>
    </div>
    <div class="flex flex-col items-center">
      <span class="text-xl font-semibold" :class="transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'">
        {{ transaction.type === 'Income' ? '+' : '-' }} {{ TPNWC(transaction.amount) }}
      </span>
      <span class="text-gray-500">{{ onConvertShort(transaction.date) }}</span>
    </div>
  </div>
</template>
