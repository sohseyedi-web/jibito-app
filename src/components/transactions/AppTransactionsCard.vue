<script lang="ts" setup>
import { computed } from 'vue'
import { useTransactionStore } from '../../store/useStore'
import AppTransactionItem from './AppTransactionItem.vue'

const { getTransactions } = useTransactionStore()

const transactions = computed(() => getTransactions())
</script>

<template>
  <TransitionGroup tag="div" class="space-y-4" name="fade">
    <AppTransactionItem
      v-for="transaction in transactions"
      :key="transaction.id"
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
