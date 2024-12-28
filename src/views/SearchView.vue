<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import BackButton from '../components/common/BackButton.vue';
import AppTransactionItem from '../components/base/AppTransactionItem.vue';
import { useTransactionStore } from '../store/useStore';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const {getTransactions} = useTransactionStore()

const searchValue = ref<string>("")
const {t} = useI18n()



const transactions = computed(() => {
  const allTransactions = getTransactions().sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return allTransactions.filter((transaction) => {
    const query = searchValue.value.toLowerCase();
    console.log(t(`category.${query}`,query))

    return (
      transaction.amount.toString().includes(query) ||
      transaction.category.toLowerCase().includes(query)
    );
  });
});

</script>
<template>
    <div class="flex items-center gap-x-2 py-5">
        <BackButton/>
        <div class="w-full flex items-center bg-transparent justify-center gap-3 h-[50px] rounded-[18px] border-2 border-[#252525] px-3">
      <Icon icon="solar:magnifer-outline" class="text-[#fff] size-6 cursor-pointer" />
      <input
        v-model="searchValue"
        type="text"
        placeholder="نام یا مبلغ تراکنش"
        class="flex-1 bg-transparent outline-none text-lg text-white placeholder:text-gray-500">
    </div>
    </div>
    <AppTransactionItem v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" />
</template>
