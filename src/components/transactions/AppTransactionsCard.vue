<script lang="ts" setup>
import type { LoadingMode } from '../../types/commonTypes'
import type { TransactionType } from '../../types/storeTypes'
import { onMounted, ref } from 'vue'
import api from '../../server/api'
import { GET_TRANSACTIONS_URL } from '../../server/urls'
import AppTransactionItem from './AppTransactionItem.vue'

const transactions = ref<TransactionType[]>([])
const isLoading = ref<LoadingMode>('INITIAL')

async function fetchData() {
  isLoading.value = 'LOADING'
  try {
    const { data } = await api.get(GET_TRANSACTIONS_URL)
    transactions.value = data
    isLoading.value = 'RESOLVED'
  }
  catch {
    isLoading.value = 'FAILED'
  }
  finally {
    isLoading.value = 'INITIAL'
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div v-if="isLoading === 'LOADING'" class="mt-3 flex items-center justify-center">
    <h3 class="text-2xl animate-pulse font-semibold text-white">
      لطفا صبر کنید...
    </h3>
  </div>
  <TransitionGroup v-else tag="div" class="space-y-4" name="fade">
    <AppTransactionItem
      v-for="transaction in transactions"
      :key="transaction._id"
      :transaction="transaction"
    />
  </TransitionGroup>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease-in;
}

.fade-enter-from {
  opacity: 50;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 50;
  transform: translateY(-20px);
}
</style>
