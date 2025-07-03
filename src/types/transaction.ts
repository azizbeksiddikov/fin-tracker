import { RecurringInterval, TransactionType } from "@/enums/transaction.enum";

export interface Transaction {
  id: string;
  // Foreign keys
  user_id: string;
  wallet_id: string;
  category_id: string | null;
  // Transaction details
  type: TransactionType;
  title: string; // title of the transaction
  receiver: string; // other party involved in the transaction
  note: string; // desc by user
  amount: number;
  currency: string;
  exchange_rate: number | null;
  date: Date;

  // Recurrence
  is_recurring: boolean;
  recurring_interval: RecurringInterval | null;

  // Metadata
  input_source: string;
  created_at: Date;
  updated_at: Date;
}

export interface TransactionsByDate {
  list: { [key: string]: Transaction[] };
  totalCount: number;
}
