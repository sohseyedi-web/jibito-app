<script setup lang="ts">
import type { LoadingMode } from '../types/commonTypes'
import { Icon } from '@iconify/vue'
import { computed, provide, ref, shallowRef, watch } from 'vue'
import DatePicker from 'vue3-persian-datetime-picker'
import { useRouter } from 'vue-router'
import AppButton from '../components/base/AppButton.vue'
import AppForm from '../components/base/AppForm.vue'
import AppInput from '../components/base/AppInput.vue'
import AppSelect from '../components/base/AppSelect.vue'
import BackButton from '../components/common/BackButton.vue'
import useValid, { transactionSchema } from '../composable/useValid'
import { ENUM_CATEGORY_VALUE, ENUM_TYPE_VALUE, ENUM_WALLET_VALUE } from '../constant/optionsValue'
import { useTransactionStore } from '../store/useStore'
import { calculateBalance } from '../utils/calculateAmount'
import { showToast } from '../utils/showToast'

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
const isOpen = shallowRef<boolean>(false)
const isActive = shallowRef<boolean>(false)

const onOpen = () => isOpen.value = !isOpen.value

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
      showToast('error', 'خطا در ثبت تراکنش')
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
      showToast('success', 'تراکنش با موفقیت ثبت شد')
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

watch(isActive, (newVal) => {
  if (newVal === true) {
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <header class="py-5 flex items-center justify-center">
    <BackButton class="absolute right-3" />
    <h5 class="text-white font-semibold text-xl">
      ایجاد تراکنش
    </h5>
  </header>
  <AppForm class=" my-5 text-white" @submit="onSubmit">
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
      icon="solar:wallet-money-broken"
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
      v-model="values.amount"
      :error="errors.amount"
      type="text"
      placeholder="مبلغ"
      icon="solar:dollar-broken"
      name="amount"
    />
    <div class="relative my-3 flex items-center justify-center w-full bg-[#2c2c2c] cursor-pointer" @click="onOpen">
      <div class="w-full h-[1px]" />
      <div class="absolute bg-[#161616] rounded-full p-2">
        <Icon :class="isOpen ? 'rotate-180' : 'rotate-0'" icon="solar:round-double-alt-arrow-down-broken" width="32" height="32" class="text-gray-500 transition-all duration-300" />
      </div>
    </div>
    <Transition
      enter-from-class="opacity-50"
      leave-to-class="opacity-50"
      enter-active-class="duration-300 ease-in"
      leave-active-class="duration-300 ease-out"
      mode="out-in"
    >
      <div v-if="isOpen" class="w-full space-y-5">
        <AppInput
          id="date"
          v-model="values.date"
          :error="errors.date"
          type="text"
          placeholder="تاریخ : امروز "
          icon="solar:calendar-broken"
          name="date"
        />
        <DatePicker v-model="values.date" element="date" class="text-[#161616]" color="#161616" format="jYYYY/jMM/jDD" />

        <AppInput
          v-model="values.description"
          :error="errors.description"
          type="text"
          placeholder="توضیحات"
          icon="solar:document-text-broken"
          name="description"
        />
      </div>
    </Transition>
    <!-- <BottomSheet :is-active="isActive" :on-close="onActive" /> -->
    <AppButton title="ثبت اطلاعات" type="submit" :loading="isLoading" class="bg-gradient-to-r from-[#ff3939] to-[#ff212d]" />
  </AppForm>
</template>
