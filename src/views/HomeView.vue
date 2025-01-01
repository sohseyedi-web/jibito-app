<script lang="ts" setup>
import type { LoadingMode } from '../types/commonTypes'
import { Icon } from '@iconify/vue/dist/iconify.js'
import { onMounted, ref } from 'vue'
import AmountForm from '../components/AmountForm.vue'
import CardBalance from '../components/CardBalance.vue'
import HomeHeader from '../components/HomeHeader.vue'
import AppTransactionsCard from '../components/transactions/AppTransactionsCard.vue'
import { calculateBalance, calculateByType } from '../utils/calculateAmount'

const balance = ref<number>(0)
const incomeBalance = ref<number>(0)
const expenseBalance = ref<number>(0)
const isLoading = ref<LoadingMode>('INITIAL')

onMounted(async () => {
  isLoading.value = 'LOADING'
  try {
    balance.value = await calculateBalance()
    incomeBalance.value = await calculateByType('Income')
    expenseBalance.value = await calculateByType('Expense')
    isLoading.value = 'RESOLVED'
  }
  catch {
    isLoading.value = 'FAILED'
  }
  finally {
    isLoading.value = 'INITIAL'
  }
})
</script>

<template>
  <Transition
    leave-to-class="opacity-50"
    enter-active-class="duration-200 ease-in"
    leave-active-class="duration-200 ease-out"
    mode="out-in"
  >
    <div v-if="isLoading === 'LOADING'" class="flex items-center justify-center h-screen">
      <h3 class="text-2xl animate-pulse font-semibold text-white">
        لطفا صبر کنید...
      </h3>
    </div>
    <AmountForm v-else-if="balance === 0 && isLoading === 'RESOLVED'" />
    <main v-else>
      <HomeHeader />
      <div class="h-[80svh] overflow-y-auto">
        <CardBalance
          :loading="isLoading"
          :balance="balance"
          :expense="expenseBalance"
          :income="incomeBalance"
        />
        <p class="my-4 text-white font-semibold text-lg">
          تراکنش های اخیر
        </p>
        <AppTransactionsCard />
        <router-link to="/transaction">
          <div class="absolute bottom-5 size-9 flex items-center justify-center rounded-2xl z-[1] right-4 bg-[#a3e632] cursor-pointer">
            <Icon icon="mdi:add" class="size-7 text-black" />
          </div>
        </router-link>
      </div>
    </main>
  </Transition>
</template>
