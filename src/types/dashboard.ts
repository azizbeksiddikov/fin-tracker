export interface MonthSummary {
  income: number;
  income_perc_change: number;
  expense: number;
  expense_perc_change: number;
  net: number;
  net_perc_change: number;
}

export interface ChartFilters {
  chartType: "bar" | "pie";
  wallets: string[] | null;
  incomeCategories: string[] | null;
  expenseCategories: string[] | null;
  startDate: Date | null;
  endDate: Date | null;
}
