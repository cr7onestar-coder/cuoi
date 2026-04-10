export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  date: string;
  note: string;
  userId: string;
}

export interface FinancialReport {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  byCategory: {
    categoryId: string;
    amount: number;
  }[];
}
