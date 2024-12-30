import type { TransactionType } from "../types/storeTypes";
import { defineStore } from "pinia";
import { ref } from "vue";

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

  const removeTransaction = (id: string) => {
    transactions.value = transactions.value.filter(
      (transaction) => transaction.id !== id
    );
  };

  const getTransactions = () => {
    return transactions.value.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  return {
    transactions,
    addTransaction,
    removeTransaction,
    getTransactions,
  };
});
