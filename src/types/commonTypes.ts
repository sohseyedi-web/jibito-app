export type LoadingMode = 'INITIAL' | 'LOADING' | 'RESOLVED' | 'FAILED'

export interface CategoryStyleTypes {
  icon: string
  bgColor: string
}

export interface CardBalanceTypes {
  loading: LoadingMode
  balance: number
  expense: number
  income: number
}
