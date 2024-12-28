<script setup lang="ts">
import { computed, provide, ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import useValid, { transactionSchema } from '../composable/useValid'
import type { LoadingMode } from '../types/commonTypes'
import { useTransactionStore } from '../store/useStore'
import { calculateBalance } from '../utils/calculateAmount'
import { showToast } from '../utils/showToast'
import { ENUM_CATEGORY_VALUE, ENUM_TYPE_VALUE, ENUM_WALLET_VALUE } from '../constant/optionsValue'
import BackButton from '../components/common/BackButton.vue'
import AppSelect from '../components/base/AppSelect.vue'
import AppForm from '../components/base/AppForm.vue'
import AppInput from '../components/base/AppInput.vue'
import AppButton from '../components/base/AppButton.vue'

const { values, errors, validateForm } = useValid({
  type: '',
  wallet: '',
  category: '',
  amount: '',
  description: '',
  date: '',
}, transactionSchema)

const isLoading = ref<LoadingMode>('INITIAL')
const isSubmitted = shallowRef<boolean>(false)
const router = useRouter()

const { addTransaction, getTransactions } = useTransactionStore()
const transactions = computed(() => getTransactions())
const balance = computed(() => calculateBalance(transactions.value))

async function onSubmit() {
  isLoading.value = 'LOADING'
  const isValid = validateForm()
  const isBalance
    = values.value.type === 'Expense'
    && Number(values.value.amount) > Number(balance.value)

  try {
    if (!isValid) {
      isSubmitted.value = true
      toast.error('Error in recording transaction', {
        duration: 2000,
        style: {
          padding: '1rem',
          fontSize: '1.1rem',
        },
      })
      isLoading.value = 'FAILED'
    }

    if (isBalance) {
      isSubmitted.value = true
      showToast('error', 'موجودی کافی نیست')
      isLoading.value = 'FAILED'
      return
    }
    if (isValid) {
      addTransaction(values.value)
      toast.success('Transaction successfully', {
        duration: 2000,
        style: {
          padding: '1rem',
          fontSize: '1.1rem',
        },
      })
      isLoading.value = 'RESOLVED'
      router.push('/')
    }
  }
  catch {
    isLoading.value = 'FAILED'
  }
  finally {
    isLoading.value = 'INITIAL'
  }
}
provide('isSubmitted', isSubmitted)
</script>

<template>
  <header class="py-5 flex items-center justify-center">
    <BackButton class="absolute right-3" />
    <h5 class="text-white font-semibold text-xl">
     ایجاد تراکنش
    </h5>
  </header>
  <AppForm  class=" my-5 text-white" @submit="onSubmit">
    <AppSelect
      v-model="values.type"
      :error="errors.type"
      placeholder="هزینه | درآمد"
      icon="hugeicons:circle-arrow-up-down"
      :options="ENUM_TYPE_VALUE"
      name="type"
    />
    <AppSelect
      v-model="values.wallet"
      :error="errors.wallet"
      placeholder="کیف پول"
      icon="solar:wallet-2-outline"
      :options="ENUM_WALLET_VALUE"
      name="wallet"
    />
    <AppSelect
      v-model="values.category"
      :error="errors.category"
      placeholder="دسته بندی"
      icon="solar:layers-minimalistic-linear"
      :options="ENUM_CATEGORY_VALUE"
      name="category"
    />
    <AppInput
      v-model="values.date"
      :error="errors.date"
      type="text"
      placeholder="تاریخ : به صورت پیش فرض تاریخ امروز "
      icon="solar:calendar-broken"
    />

    <AppInput
      v-model="values.amount"
      :error="errors.amount"
      type="text"
      placeholder="مبلغ"
      icon="solar:dollar-broken"
    />
    <AppInput
      v-model="values.description"
      :error="errors.description"
      type="text"
      placeholder="توضیحات"
      icon="solar:document-text-linear"
    />
    <AppButton title="ثبت اطلاعات" type="submit" :loading="isLoading" class="bg-[#a3e632]"/>
  </AppForm>
</template>
