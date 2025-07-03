import React from "react";
import { ChartFilters } from "@/types/dashboard";
import PieChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";
import { Card, CardContent } from "@/libs/components/ui/card";

interface ChartsProps {
  chartFilters: ChartFilters;
  setChartFilters: (filters: ChartFilters) => void;
}

export default function Charts({ chartFilters, setChartFilters }: ChartsProps) {
  // Determine which chart component to use based on user selection
  const ChartComponent = chartFilters.chartType === "pie" ? PieChart : BarChart;

  const handleCategorySelect = (
    type: "income" | "expense",
    categoryIds: string | string[]
  ) => {
    // Handle both single category selection and multiple category selection
    let newCategories: string[];

    if (typeof categoryIds === "string") {
      // Single category toggle (legacy behavior)
      const currentCategories =
        type === "income"
          ? chartFilters.incomeCategories || []
          : chartFilters.expenseCategories || [];

      if (currentCategories.includes(categoryIds)) {
        newCategories = currentCategories.filter((id) => id !== categoryIds);
      } else {
        newCategories = [...currentCategories, categoryIds];
      }
    } else {
      // Multiple categories (new behavior)
      newCategories = categoryIds;
    }

    // Update the chart filters for the specific type
    if (type === "income") {
      setChartFilters({
        ...chartFilters,
        incomeCategories: newCategories.length > 0 ? newCategories : null,
      });
    } else {
      setChartFilters({
        ...chartFilters,
        expenseCategories: newCategories.length > 0 ? newCategories : null,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6">
        {/* Income Chart */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <ChartComponent
              type="income"
              period="month"
              walletIds={chartFilters.wallets || undefined}
              categoryIds={chartFilters.incomeCategories || undefined}
              onCategorySelect={(categoryIds) =>
                handleCategorySelect("income", categoryIds)
              }
            />
          </CardContent>
        </Card>

        {/* Expense Chart */}
        <Card className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-6">
            <ChartComponent
              type="expense"
              period="month"
              walletIds={chartFilters.wallets || undefined}
              categoryIds={chartFilters.expenseCategories || undefined}
              onCategorySelect={(categoryIds) =>
                handleCategorySelect("expense", categoryIds)
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
