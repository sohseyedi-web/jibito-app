<script setup lang="ts">
import type { CardBalanceTypes } from '../types/commonTypes'
import { Icon } from '@iconify/vue'
import { toPersianNumbersWithComma as TPNWC } from '../utils/toPersianNumbers'

defineProps<CardBalanceTypes>()
</script>

<template>
  <div class="bg-black rounded-2xl p-4 text-white">
    <template v-if="loading === 'LOADING'">
      <div class="animate-pulse">
        <div class="h-6 w-1/3 bg-gray-900 rounded mb-4" />
        <div class="h-12 w-2/3 bg-gray-900 rounded mb-5" />
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-x-2">
            <div class="h-8 w-8 bg-gray-900 rounded-full" />
            <div class="h-6 w-20 bg-gray-900 rounded" />
          </div>
          <div class="flex items-center gap-x-2">
            <div class="h-8 w-8 bg-gray-900 rounded-full" />
            <div class="h-6 w-20 bg-gray-900 rounded" />
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex items-center justify-between text-white">
        <h4>موجودی</h4>
        <span>
          <Icon icon="solar:menu-dots-bold" class="text-[#fff] size-6 cursor-pointer text-xl font-semibold" />
        </span>
      </div>
      <div class="font-bold text-white text-4xl my-5">
        {{ TPNWC(String(balance)) }} تومان
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-x-1">
          <div class="rounded-2xl p-1.5 bg-[#161616]">
            <Icon icon="solar:arrow-to-top-left-bold" class="text-green-600 size-6" />
          </div>
          <span class="font-semibold text-xl text-green-600">
            {{ TPNWC(String(income)) }} تومان
          </span>
        </div>
        <div class="flex items-center gap-x-1">
          <div class="rounded-2xl p-1.5 bg-[#161616]">
            <Icon icon="solar:arrow-to-down-right-linear" class="text-red-600 size-6" />
          </div>
          <span class="font-semibold text-xl text-red-600">
            {{ TPNWC(String(expense)) }} تومان
          </span>
        </div>
      </div>
    </template>
  </div>
</template>
