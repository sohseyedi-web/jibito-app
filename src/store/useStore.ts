import { defineStore } from "pinia";
import { ref } from "vue";
import type { TransactionType } from "../types/storeTypes";

export const useTransactionStore = defineStore("transaction", () => {
  const transactions = ref<TransactionType[]>([]);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  const addTransaction = (transaction: Omit<TransactionType, "id">) => {
    const newTransaction = {
      id: generateId(),
      ...transaction,
    };

    transactions.value.push(newTransaction);
  };

  const removeTransaction = (index: number) => {
    transactions.value.splice(index, 1);
  };

  const getTransactions = () => {
    return transactions.value;
  };

  return {
    transactions,
    addTransaction,
    removeTransaction,
    getTransactions,
  };
});
