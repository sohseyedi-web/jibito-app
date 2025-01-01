export interface TransactionType {
  _id: string
  type: string
  wallet: string
  date: string
  category: string
  amount: string
  description?: string
}
