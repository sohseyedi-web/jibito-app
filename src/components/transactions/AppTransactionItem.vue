<script setup lang="ts">
import type { TransactionType } from '../../types/storeTypes'
import { Icon } from '@iconify/vue'
import { shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTransactionStore } from '../../store/useStore'
import { showToast } from '../../utils/showToast'
import { toPersianNumbersWithComma as TPNWC } from '../../utils/toPersianNumbers'
import CategoryIcon from '../common/CategoryIcon.vue'

defineProps<{ transaction: TransactionType }>()
const { t } = useI18n()
const isOpen = shallowRef<boolean>(false)
const { removeTransaction } = useTransactionStore()

function onConvertShort(date?: string) {
  const validDate = date && !new Date(date).getTime() ? new Date(date) : new Date()

  return validDate.toLocaleDateString('fa-IR', { day: 'numeric', month: 'short' })
}

const onToggleOpen = () => isOpen.value = !isOpen.value

function onRemoveTransaction(item: string) {
  removeTransaction(item)
  showToast('success', 'تراکنش حذف شد')
}
</script>

<template>
  <div
    :key="transaction.id"
    class="bg-black p-2 rounded-2xl my-2 relative transition-all duration-300"
    :class="{ 'pl-20 ': isOpen }"
  >
    <div
      :class="{ 'opacity-50': isOpen }"
      class="flex items-center justify-between cursor-pointer"
      @click="onToggleOpen"
    >
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
        <span
          class="lg:text-xl font-semibold"
          :class="transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'"
        >
          {{ transaction.type === 'Income' ? '+' : '-' }} {{ TPNWC(transaction.amount) }} ت
        </span>
        <span class="text-gray-500">{{ onConvertShort(transaction.date) }}</span>
      </div>
    </div>
    <div
      v-if="isOpen"
      class="absolute top-1/2 left-2 -translate-y-1/2 flex items-center"
    >
      <button
        class="transition bg-red-600 size-11 flex items-center justify-center rounded-2xl"
        @click.stop="onRemoveTransaction(transaction.id)"
      >
        <Icon icon="solar:trash-bin-trash-broken" class="size-9 text-white cursor-pointer" />
      </button>
    </div>
  </div>
</template>
