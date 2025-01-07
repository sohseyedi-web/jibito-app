<script setup lang="ts">
import type { LoadingMode } from '../types/commonTypes'
import { computed, provide, ref, shallowRef } from 'vue'
import useValid, { amountSchema } from '../composable/useValid'
import { useTransactionStore } from '../store/useStore'
import { showToast } from '../utils/showToast'
import AppButton from './base/AppButton.vue'
import AppForm from './base/AppForm.vue'
import AppInput from './base/AppInput.vue'

const { addTransaction, getTransactions } = useTransactionStore()
const isLoading = ref<LoadingMode>('INITIAL')
const isSubmitted = shallowRef<boolean>(false)

const transactions = computed(() => getTransactions())

const { errors, validateForm, values } = useValid({ amount: '' }, amountSchema)

async function onSubmit() {
  isLoading.value = 'LOADING'
  const isValid = validateForm()

  if (!isValid) {
    isSubmitted.value = true
    isLoading.value = 'FAILED'
  }

  try {
    if (isValid) {
      addTransaction({
        amount: values.value.amount,
        category: 'Income',
        date: new Date().toString(),
        type: 'Income',
        wallet: 'کیف 1',
        description: 'موجودی اولیه',
      })
      showToast('success', 'موجودی افزایش یافت')
      isLoading.value = 'RESOLVED'
    }
  }
  catch {
    // showerror
    // console.log(ex)
    isLoading.value = 'FAILED'
  }
  finally {
    isLoading.value = 'INITIAL'
  }
}
provide('isSubmitted', isSubmitted)
</script>

<template>
  <img src="@/assets/jibito-logo.png" class="size-16 absolute rounded-2xl top-2 left-1/2 -translate-x-1/2" alt="jibito">
  <AppForm class="text-white space-y-3 lg:w-[75%] w-[95%] mx-auto flex items-center justify-center h-screen" @submit="onSubmit">
    <h2 class="lg:text-xl text-lg font-semibold">
      افزایش موجودی
    </h2>
    <AppInput
      v-model="values.amount"
      :error="errors.amount"
      type="text"
      placeholder="مبلغ"
      icon="solar:dollar-broken"
      name="amount"
    />
    <AppButton title="ثبت مبلغ" type="submit" :loading="isLoading" class="bg-gradient-to-r from-[#ff3939] to-[#ff212d]" />
    <router-link v-if="transactions.length" to="/all" class="w-full">
      <AppButton title="تاریخچه حساب" type="button" class="text-white bg-[#4C585B]" />
    </router-link>
  </AppForm>
</template>
