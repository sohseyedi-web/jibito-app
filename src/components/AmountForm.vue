<script setup lang="ts">
import type { LoadingMode } from '../types/commonTypes'
import type { TransactionType } from '../types/storeTypes'
import { onMounted, provide, ref, shallowRef } from 'vue'
import useValid, { amountSchema } from '../composable/useValid'
import api from '../server/api'
import { GET_TRANSACTIONS_URL, POST_TRANSACTIONS_URL } from '../server/urls'
import { showToast } from '../utils/showToast'
import AppButton from './base/AppButton.vue'
import AppForm from './base/AppForm.vue'
import AppInput from './base/AppInput.vue'

const isLoading = ref<LoadingMode>('INITIAL')
const isSubmitted = shallowRef<boolean>(false)
const transactions = ref<TransactionType[]>([])

async function fetchData() {
  try {
    const { data } = await api.get(GET_TRANSACTIONS_URL)
    transactions.value.push(data)
  }
  catch {
  }
}

const { errors, validateForm, values } = useValid({ amount: '' }, amountSchema)

async function onSubmit() {
  isLoading.value = 'LOADING'
  const isValid = validateForm()

  if (!isValid) {
    isSubmitted.value = true
    showToast('error', 'خطا در تکمیل فرم')
    isLoading.value = 'FAILED'
  }

  try {
    if (isValid) {
      const newItem = {
        amount: values.value.amount,
        category: 'Income',
        date: new Date().toString(),
        type: 'Income',
        wallet: 'کیف 1',
        description: 'موجودی اولیه',
      }
      await api.post(POST_TRANSACTIONS_URL, newItem)
      showToast('success', 'موجودی افزایش یافت')
      isLoading.value = 'RESOLVED'
    }
  }
  catch {
    // showerror
    // console.log(ex)
    isLoading.value = 'FAILED'
    showToast('error', 'خطا در افزایش موجودی ')
  }
  finally {
    isLoading.value = 'INITIAL'
  }
}
provide('isSubmitted', isSubmitted)

onMounted(() => {
  fetchData()
})
</script>

<template>
  <AppForm class="text-white space-y-3 lg:w-[75%] w-[95%] mx-auto flex items-center justify-center h-screen" @submit="onSubmit">
    <h2 class="text-xl font-semibold">
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
    <AppButton title="ثبت مبلغ" type="submit" :loading="isLoading" class="bg-[#a3e632]" />
    <router-link v-if="transactions.length" to="/all" class="w-full">
      <AppButton title="تاریخچه حساب" type="button" class="text-white bg-[#4C585B]" />
    </router-link>
  </AppForm>
</template>
