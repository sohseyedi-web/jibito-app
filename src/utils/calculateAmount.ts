import type { TransactionType } from '../types/storeTypes'
import api from '../server/api'
import { GET_TRANSACTIONS_URL } from '../server/urls'

async function getTransactions(): Promise<TransactionType[]> {
  try {
    const { data } = await api.get(GET_TRANSACTIONS_URL)
    return data
  }
  catch (error) {
    console.error('Error fetching transactions:', error)
    return []
  }
}

export async function calculateByType(type: string): Promise<number> {
  const array = await getTransactions()

  const sum = array
    .filter(item => item.type === type)
    .reduce((sum, item) => sum + Number.parseFloat(item.amount), 0)

  return sum
}

export async function calculateBalance() {
  const incomeVal = await calculateByType('Income')
  const expenseVal = await calculateByType('Expense')
  const balance = incomeVal - expenseVal
  return balance
}
