import type { TransactionType } from '../types/storeTypes'

export function calculateByType(
  array: TransactionType[],
  type: string,
): number {
  const sum = array
    .filter(item => item.type === type)
    .reduce((sum, item) => sum + Number.parseFloat(item.amount), 0)

  return sum
}

export function calculateBalance(array: TransactionType[]) {
  const incomeVal = calculateByType(array, 'Income') || 0
  const expenseVal = calculateByType(array, 'Expense') || 0
  const balance = incomeVal - expenseVal
  return balance
}
