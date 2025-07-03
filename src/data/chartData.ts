// Sample chart data that would come from backend APIs
// This simulates processed data for different chart types and filters

export interface CategoryChartData {
  id: string;
  name: string;
  color: string;
  total: number;
  percentage: number;
  transactionCount: number;
}

export interface ChartDataResponse {
  categories: CategoryChartData[];
  totalAmount: number;
  period: string;
  currency: string;
}

// Sample Income Chart Data by Category
export const sampleIncomeChartData: ChartDataResponse = {
  categories: [
    {
      id: "cat_salary",
      name: "Salary",
      color: "#10B981", // emerald-500
      total: 3500000,
      percentage: 70.0,
      transactionCount: 2,
    },
    {
      id: "cat_freelance",
      name: "Freelance",
      color: "#3B82F6", // blue-500
      total: 800000,
      percentage: 16.0,
      transactionCount: 4,
    },
    {
      id: "cat_investment",
      name: "Investment Returns",
      color: "#8B5CF6", // violet-500
      total: 450000,
      percentage: 9.0,
      transactionCount: 3,
    },
    {
      id: "cat_bonus",
      name: "Bonus",
      color: "#F59E0B", // amber-500
      total: 250000,
      percentage: 5.0,
      transactionCount: 1,
    },
  ],
  totalAmount: 5000000,
  period: "Last 30 days",
  currency: "KRW",
};

// Sample Expense Chart Data by Category
export const sampleExpenseChartData: ChartDataResponse = {
  categories: [
    {
      id: "cat_food",
      name: "Food & Dining",
      color: "#EF4444", // red-500
      total: 450000,
      percentage: 28.1,
      transactionCount: 15,
    },
    {
      id: "cat_transport",
      name: "Transportation",
      color: "#F97316", // orange-500
      total: 320000,
      percentage: 20.0,
      transactionCount: 8,
    },
    {
      id: "cat_shopping",
      name: "Shopping",
      color: "#EC4899", // pink-500
      total: 280000,
      percentage: 17.5,
      transactionCount: 6,
    },
    {
      id: "cat_utilities",
      name: "Utilities",
      color: "#06B6D4", // cyan-500
      total: 220000,
      percentage: 13.8,
      transactionCount: 4,
    },
    {
      id: "cat_entertainment",
      name: "Entertainment",
      color: "#8B5CF6", // violet-500
      total: 180000,
      percentage: 11.3,
      transactionCount: 7,
    },
    {
      id: "cat_healthcare",
      name: "Healthcare",
      color: "#10B981", // emerald-500
      total: 150000,
      percentage: 9.3,
      transactionCount: 3,
    },
  ],
  totalAmount: 1600000,
  period: "Last 30 days",
  currency: "KRW",
};

// Sample data for different time periods (simulating backend responses)
export const chartDataByPeriod = {
  week: {
    income: {
      categories: [
        {
          id: "cat_salary",
          name: "Salary",
          color: "#10B981",
          total: 875000,
          percentage: 87.5,
          transactionCount: 1,
        },
        {
          id: "cat_freelance",
          name: "Freelance",
          color: "#3B82F6",
          total: 125000,
          percentage: 12.5,
          transactionCount: 1,
        },
      ],
      totalAmount: 1000000,
      period: "Last 7 days",
      currency: "KRW",
    },
    expense: {
      categories: [
        {
          id: "cat_food",
          name: "Food & Dining",
          color: "#EF4444",
          total: 85000,
          percentage: 34.0,
          transactionCount: 5,
        },
        {
          id: "cat_transport",
          name: "Transportation",
          color: "#F97316",
          total: 65000,
          percentage: 26.0,
          transactionCount: 3,
        },
        {
          id: "cat_shopping",
          name: "Shopping",
          color: "#EC4899",
          total: 50000,
          percentage: 20.0,
          transactionCount: 2,
        },
        {
          id: "cat_entertainment",
          name: "Entertainment",
          color: "#8B5CF6",
          total: 50000,
          percentage: 20.0,
          transactionCount: 2,
        },
      ],
      totalAmount: 250000,
      period: "Last 7 days",
      currency: "KRW",
    },
  },
  month: {
    income: sampleIncomeChartData,
    expense: sampleExpenseChartData,
  },
  "3months": {
    income: {
      categories: [
        {
          id: "cat_salary",
          name: "Salary",
          color: "#10B981",
          total: 10500000,
          percentage: 70.0,
          transactionCount: 6,
        },
        {
          id: "cat_freelance",
          name: "Freelance",
          color: "#3B82F6",
          total: 2400000,
          percentage: 16.0,
          transactionCount: 12,
        },
        {
          id: "cat_investment",
          name: "Investment Returns",
          color: "#8B5CF6",
          total: 1350000,
          percentage: 9.0,
          transactionCount: 9,
        },
        {
          id: "cat_bonus",
          name: "Bonus",
          color: "#F59E0B",
          total: 750000,
          percentage: 5.0,
          transactionCount: 3,
        },
      ],
      totalAmount: 15000000,
      period: "Last 3 months",
      currency: "KRW",
    },
    expense: {
      categories: [
        {
          id: "cat_food",
          name: "Food & Dining",
          color: "#EF4444",
          total: 1350000,
          percentage: 28.1,
          transactionCount: 45,
        },
        {
          id: "cat_transport",
          name: "Transportation",
          color: "#F97316",
          total: 960000,
          percentage: 20.0,
          transactionCount: 24,
        },
        {
          id: "cat_shopping",
          name: "Shopping",
          color: "#EC4899",
          total: 840000,
          percentage: 17.5,
          transactionCount: 18,
        },
        {
          id: "cat_utilities",
          name: "Utilities",
          color: "#06B6D4",
          total: 660000,
          percentage: 13.8,
          transactionCount: 12,
        },
        {
          id: "cat_entertainment",
          name: "Entertainment",
          color: "#8B5CF6",
          total: 540000,
          percentage: 11.3,
          transactionCount: 21,
        },
        {
          id: "cat_healthcare",
          name: "Healthcare",
          color: "#10B981",
          total: 450000,
          percentage: 9.3,
          transactionCount: 9,
        },
      ],
      totalAmount: 4800000,
      period: "Last 3 months",
      currency: "KRW",
    },
  },
  year: {
    income: {
      categories: [
        {
          id: "cat_salary",
          name: "Salary",
          color: "#10B981",
          total: 42000000,
          percentage: 70.0,
          transactionCount: 24,
        },
        {
          id: "cat_freelance",
          name: "Freelance",
          color: "#3B82F6",
          total: 9600000,
          percentage: 16.0,
          transactionCount: 48,
        },
        {
          id: "cat_investment",
          name: "Investment Returns",
          color: "#8B5CF6",
          total: 5400000,
          percentage: 9.0,
          transactionCount: 36,
        },
        {
          id: "cat_bonus",
          name: "Bonus",
          color: "#F59E0B",
          total: 3000000,
          percentage: 5.0,
          transactionCount: 12,
        },
      ],
      totalAmount: 60000000,
      period: "Last 12 months",
      currency: "KRW",
    },
    expense: {
      categories: [
        {
          id: "cat_food",
          name: "Food & Dining",
          color: "#EF4444",
          total: 5400000,
          percentage: 28.1,
          transactionCount: 180,
        },
        {
          id: "cat_transport",
          name: "Transportation",
          color: "#F97316",
          total: 3840000,
          percentage: 20.0,
          transactionCount: 96,
        },
        {
          id: "cat_shopping",
          name: "Shopping",
          color: "#EC4899",
          total: 3360000,
          percentage: 17.5,
          transactionCount: 72,
        },
        {
          id: "cat_utilities",
          name: "Utilities",
          color: "#06B6D4",
          total: 2640000,
          percentage: 13.8,
          transactionCount: 48,
        },
        {
          id: "cat_entertainment",
          name: "Entertainment",
          color: "#8B5CF6",
          total: 2160000,
          percentage: 11.3,
          transactionCount: 84,
        },
        {
          id: "cat_healthcare",
          name: "Healthcare",
          color: "#10B981",
          total: 1800000,
          percentage: 9.3,
          transactionCount: 36,
        },
      ],
      totalAmount: 19200000,
      period: "Last 12 months",
      currency: "KRW",
    },
  },
  all: {
    income: {
      categories: [
        {
          id: "cat_salary",
          name: "Salary",
          color: "#10B981",
          total: 84000000,
          percentage: 70.0,
          transactionCount: 48,
        },
        {
          id: "cat_freelance",
          name: "Freelance",
          color: "#3B82F6",
          total: 19200000,
          percentage: 16.0,
          transactionCount: 96,
        },
        {
          id: "cat_investment",
          name: "Investment Returns",
          color: "#8B5CF6",
          total: 10800000,
          percentage: 9.0,
          transactionCount: 72,
        },
        {
          id: "cat_bonus",
          name: "Bonus",
          color: "#F59E0B",
          total: 6000000,
          percentage: 5.0,
          transactionCount: 24,
        },
      ],
      totalAmount: 120000000,
      period: "All time",
      currency: "KRW",
    },
    expense: {
      categories: [
        {
          id: "cat_food",
          name: "Food & Dining",
          color: "#EF4444",
          total: 10800000,
          percentage: 28.1,
          transactionCount: 360,
        },
        {
          id: "cat_transport",
          name: "Transportation",
          color: "#F97316",
          total: 7680000,
          percentage: 20.0,
          transactionCount: 192,
        },
        {
          id: "cat_shopping",
          name: "Shopping",
          color: "#EC4899",
          total: 6720000,
          percentage: 17.5,
          transactionCount: 144,
        },
        {
          id: "cat_utilities",
          name: "Utilities",
          color: "#06B6D4",
          total: 5280000,
          percentage: 13.8,
          transactionCount: 96,
        },
        {
          id: "cat_entertainment",
          name: "Entertainment",
          color: "#8B5CF6",
          total: 4320000,
          percentage: 11.3,
          transactionCount: 168,
        },
        {
          id: "cat_healthcare",
          name: "Healthcare",
          color: "#10B981",
          total: 3600000,
          percentage: 9.3,
          transactionCount: 72,
        },
      ],
      totalAmount: 38400000,
      period: "All time",
      currency: "KRW",
    },
  },
};

// Helper function to get chart data based on filters (simulating API call)
export function getChartData(
  period: string = "month",
  type: "income" | "expense" = "income"
): ChartDataResponse {
  const periodKey = period as keyof typeof chartDataByPeriod;

  if (chartDataByPeriod[periodKey]) {
    return chartDataByPeriod[periodKey][type];
  }

  // Default to month data
  return type === "income" ? sampleIncomeChartData : sampleExpenseChartData;
}

// Simulate filtered data by wallet or category (would come from backend)
export function getFilteredChartData(
  period: string = "month",
  type: "income" | "expense" = "income",
  walletIds?: string[],
  categoryIds?: string[]
): ChartDataResponse {
  let data = getChartData(period, type);

  // If category filter is applied, filter the categories
  if (categoryIds && categoryIds.length > 0) {
    const filteredCategories = data.categories.filter((cat) =>
      categoryIds.includes(cat.id)
    );

    const filteredTotal = filteredCategories.reduce(
      (sum, cat) => sum + cat.total,
      0
    );

    // Recalculate percentages
    const updatedCategories = filteredCategories.map((cat) => ({
      ...cat,
      percentage: (cat.total / filteredTotal) * 100,
    }));

    data = {
      ...data,
      categories: updatedCategories,
      totalAmount: filteredTotal,
    };
  }

  return data;
}
