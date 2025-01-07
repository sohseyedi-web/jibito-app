<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js'
import { computed } from 'vue'
import AmountForm from '../components/AmountForm.vue'
import HomeHeader from '../components/HomeHeader.vue'
import AppTransactionsCard from '../components/transactions/AppTransactionsCard.vue'
import { useTransactionStore } from '../store/useStore'
import { calculateBalance, calculateByType } from '../utils/calculateAmount'
import { toPersianNumbersWithComma as TPNWC } from '../utils/toPersianNumbers'

const { getTransactions } = useTransactionStore()

const transactions = computed(() => getTransactions())
const balance = computed(() => calculateBalance(transactions.value))

</script>

<template>
  <Transition
    enter-from-class="opacity-50"
    leave-to-class="opacity-50"
    enter-active-class="duration-200 ease-in"
    leave-active-class="duration-200 ease-out"
    mode="out-in"
  >
    <AmountForm v-if="balance === 0" />
    <main v-else>
      <HomeHeader />
      <div class="h-[80svh] overflow-y-auto pb-2 relative">
        <div class="bg-black rounded-2xl p-4 text-white">
          <div class="flex items-center justify-between text-white">
            <h4>موجودی</h4>
            <span>
              <Icon icon="solar:menu-dots-bold" class="text-[#fff] size-6 cursor-pointer text-xl font-semibold" />
            </span>
          </div>
          <div class="font-bold text-white lg:text-4xl text-2xl my-5">
            {{ TPNWC(String(calculateBalance(transactions))) }} تومان
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-x-1">
              <div class="rounded-2xl p-1.5 bg-[#161616]">
                <Icon icon="solar:arrow-to-top-left-bold" class="text-green-600 size-6" />
              </div>
              <span class="font-semibold lg:text-xl text-green-600">{{ TPNWC(String(calculateByType(transactions, "Income"))) }} تومان</span>
            </div>
            <div class="flex items-center gap-x-1">
              <div class="rounded-2xl p-1.5 bg-[#161616]">
                <Icon icon="solar:arrow-to-down-right-linear" class="text-red-600 size-6" />
              </div>
              <span class="font-semibold lg:text-xl text-red-600">{{ TPNWC(String(calculateByType(transactions, "Expense"))) }} تومان</span>
            </div>
          </div>
        </div>
        <p class="my-4 text-white font-semibold text-lg">
          تراکنش های اخیر
        </p>
        <AppTransactionsCard />
        <router-link to="/transaction">
          <div class="fixed bottom-5 size-9 flex items-center justify-center rounded-2xl z-[1]  -translate-x-1 bg-gradient-to-r from-[#ff3939] to-[#ff212d] cursor-pointer">
            <Icon icon="mdi:add" class="size-7 text-black" />
          </div>
        </router-link>
      </div>
    </main>
  </Transition>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 18px;
}

::-webkit-scrollbar-thumb {
  background: #a3e632;
  border-radius: 18px;
}

::-webkit-scrollbar-thumb:hover {
  background: #8acc29;
}
</style>
