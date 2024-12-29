<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import { computed, ref } from 'vue'
import AppTransactionItem from '../components/base/AppTransactionItem.vue'
import BackButton from '../components/common/BackButton.vue'
import { useTransactionStore } from '../store/useStore'
import { useI18n } from 'vue-i18n'

const { getTransactions } = useTransactionStore()
const searchValue = ref<string>('')
const {t} = useI18n()

const translateSearchQuery = (query : string) => {
  return t(`category.${query}`);
};

const transactions = computed(() => {
  const allTransactions = getTransactions().sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return allTransactions.filter((transaction) => {
    const query = searchValue.value.toLowerCase()
    const reqqq = translateSearchQuery(query)
    console.log(reqqq)


    return (
      transaction.amount.toString().includes(query)
      || transaction.category.toLowerCase().includes(query)
    )
  })
})
</script>

<template>
  <div class="flex items-center gap-x-2 py-5">
    <BackButton />
    <div class="w-full flex items-center bg-transparent justify-center gap-3 h-[50px] rounded-[18px] border-2 border-[#252525] px-3">
      <Icon icon="solar:magnifer-outline" class="text-[#fff] size-6 cursor-pointer" />
      <input
        v-model="searchValue"
        type="text"
        placeholder="نام یا مبلغ تراکنش"
        class="flex-1 bg-transparent outline-none text-lg text-white placeholder:text-gray-500"
      >
    </div>
  </div>
  <Transition
    enter-from-class="opacity-50"
    leave-to-class="opacity-50"
    enter-active-class="duration-200 ease-in"
    leave-active-class="duration-200 ease-out"
    mode="out-in"
  >
    <p v-if="!transactions.length" class="text-white text-xl font-semibold text-center">
      تراکنشی پیدا نشد
    </p>
    <TransitionGroup
      v-else
      tag="div"
      class="space-y-4"
      name="fade"
    >
      <AppTransactionItem
        v-for="transaction in transactions"
        :key="transaction.id"
        :transaction="transaction"
      />
    </TransitionGroup>
  </Transition>
</template>

<style scoped>
/* تعریف افکت‌های ترنزیشن */
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
