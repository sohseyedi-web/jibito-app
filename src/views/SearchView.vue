<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import { computed, ref } from 'vue'
import BackButton from '../components/common/BackButton.vue'
import AppTransactionsCard from '../components/transactions/AppTransactionsCard.vue'
import { useTransactionStore } from '../store/useStore'

const { getTransactions } = useTransactionStore()
const searchValue = ref<string>('')

const transactions = computed(() => {
  const allTransactions = getTransactions().sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return allTransactions.filter((transaction) => {
    const query = searchValue.value.toLowerCase()

    return (
      transaction.amount.toString().includes(query)
      || transaction.category.toLowerCase().includes(query)
    )
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
