<script lang="ts" setup>
import { Icon } from '@iconify/vue/dist/iconify.js'
import { computed } from 'vue'
import AmountForm from '../components/AmountForm.vue'
import AppTransactionItem from '../components/base/AppTransactionItem.vue'
import HomeHeader from '../components/HomeHeader.vue'
import { useTransactionStore } from '../store/useStore'
import { calculateBalance, calculateByType } from '../utils/calculateAmount'
import { toPersianNumbersWithComma as TPNWC } from '../utils/toPersianNumbers'

const { getTransactions } = useTransactionStore()

const transactions = computed(() => getTransactions().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
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
      <div class="h-[90svh] overflow-y-auto">
        <div class="bg-black rounded-2xl px-4 py-5 text-white">
          <div class="flex items-center justify-between text-white">
            <h4>موجودی</h4>
            <span>
              <Icon icon="solar:menu-dots-bold" class="text-[#fff] size-6 cursor-pointer text-xl font-semibold" />
            </span>
          </div>
          <div class="font-bold text-white text-4xl my-5">
            {{ TPNWC(String(calculateBalance(transactions))) }} تومان
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-x-1">
              <div class="rounded-2xl p-1.5 bg-[#161616]">
                <Icon icon="solar:arrow-to-top-left-bold" class="text-green-600 size-6" />
              </div>
              <span class="font-semibold text-xl text-green-600">{{ TPNWC(String(calculateByType(transactions, "Income"))) }} تومان</span>
            </div>
            <div class="flex items-center gap-x-1">
              <div class="rounded-2xl p-1.5 bg-[#161616]">
                <Icon icon="solar:arrow-to-down-right-linear" class="text-red-600 size-6" />
              </div>
              <span class="font-semibold text-xl text-red-600">{{ TPNWC(String(calculateByType(transactions, "Expense"))) }} تومان</span>
            </div>
          </div>
        </div>
        <p class="my-4 text-white font-semibold text-lg">
          تراکنش های اخیر
        </p>
        <AppTransactionItem v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" />
        <router-link to="/transaction">
          <div class="absolute bottom-4 size-9 flex items-center justify-center rounded-2xl z-[1] right-4 bg-[#a3e632] cursor-pointer">
            <Icon icon="mdi:add" class="size-7 text-black" />
          </div>
        </router-link>
      </div>
    </main>
  </Transition>
</template>
