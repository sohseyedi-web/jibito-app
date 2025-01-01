<script setup lang="ts">
import type { TransactionType } from '../types/storeTypes'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BackButton from '../components/common/BackButton.vue'
import AppTransactionsCard from '../components/transactions/AppTransactionsCard.vue'
import api from '../server/api'
import { GET_TRANSACTIONS_URL } from '../server/urls'

const searchValue = ref<string>('')
const transactionsList = ref<TransactionType[]>([])
const { tm } = useI18n()

async function fetchData() {
  try {
    const { data } = await api.get(GET_TRANSACTIONS_URL)
    transactionsList.value = data
  }
  catch {

  }
}

onMounted(() => {
  fetchData()
})

const transactions = computed(() => {
  const allTransactions = transactionsList.value
  const query = searchValue.value.toLowerCase()

  const translateSearchTerm = (searchQuery: string): string => {
    const enWords = tm('category')
    return Object.entries(enWords).reduce((acc, [key, value]) => {
      if (value.toLowerCase().includes(searchQuery)) {
        return key
      }
      return acc
    }, searchQuery)
  }

  const englishSearchTerm = translateSearchTerm(query)

  return allTransactions.filter((transaction) => {
    const amount = transaction.amount.toString()
    const category = transaction.category.toLowerCase()

    return amount.includes(query)
      || category.includes(englishSearchTerm.toLowerCase())
  })
})
</script>

<template>
  <div class="flex items-center gap-x-2 py-5">
    <BackButton />
    <div class="w-full flex items-center bg-transparent justify-center gap-3 h-[50px] rounded-[18px] border-2 border-[#252525] px-3">
      <Icon icon="solar:magnifer-outline" class="text-[#fff] size-6 cursor-pointer" />
      <input
        v-model="searchValue"
        type="text"
        placeholder="نام یا مبلغ تراکنش"
        class="flex-1 bg-transparent outline-none text-lg text-white placeholder:text-gray-500"
      >
    </div>
  </div>
  <Transition
    enter-from-class="opacity-50"
    leave-to-class="opacity-50"
    enter-active-class="duration-200 ease-in"
    leave-active-class="duration-200 ease-out"
    mode="out-in"
  >
    <p v-if="!transactions.length" class="text-white text-xl font-semibold text-center">
      تراکنشی پیدا نشد
    </p>
    <AppTransactionsCard v-else />
  </Transition>
</template>
