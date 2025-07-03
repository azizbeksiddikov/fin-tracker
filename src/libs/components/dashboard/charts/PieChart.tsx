"use client";

import React, { useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { getFilteredChartData } from "@/data/chartData";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/libs/components/ui/button";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  type: "income" | "expense";
  period?: string;
  walletIds?: string[];
  categoryIds?: string[];
  onCategorySelect?: (categoryIds: string | string[]) => void;
}

export default function PieChart({
  type,
  period = "month",
  walletIds,
  categoryIds,
  onCategorySelect,
}: PieChartProps) {
  // State for pending category selections (before applying)
  const [pendingSelections, setPendingSelections] = useState<string[]>(
    categoryIds || []
  );

  // Update pending selections when external categoryIds change
  React.useEffect(() => {
    setPendingSelections(categoryIds || []);
  }, [categoryIds]);

  // Handle category selection toggle (for pending state)
  const handleCategoryToggle = (categoryId: string) => {
    setPendingSelections((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // Apply the pending selections
  const handleApplyFilters = () => {
    if (onCategorySelect) {
      // Pass the array of selected categories to the parent
      onCategorySelect(pendingSelections);
    }
  };

  // Clear all selections (both pending and applied)
  const handleClearSelections = () => {
    setPendingSelections([]);
    if (onCategorySelect) {
      onCategorySelect([]); // Clear applied selections immediately
    }
  };

  // Check if there are changes to apply
  const hasChanges =
    JSON.stringify(pendingSelections.sort()) !==
    JSON.stringify((categoryIds || []).sort());

  // Check if there are any selections (applied or pending) to show clear button
  const hasAnySelections =
    (categoryIds && categoryIds.length > 0) || pendingSelections.length > 0;

  const chartData = useMemo(() => {
    // Get filtered chart data from our data layer (simulating backend call)
    const data = getFilteredChartData(period, type, walletIds, categoryIds);

    const categoryDetails = data.categories;
    const totalAmount = data.totalAmount;

    return {
      labels: categoryDetails.map((cat) => cat.name),
      datasets: [
        {
          data: categoryDetails.map((cat) => cat.total),
          backgroundColor: categoryDetails.map((cat) => cat.color),
          borderColor: categoryDetails.map((cat) => cat.color),
          borderWidth: 2,
          hoverBorderWidth: 3,
          hoverOffset: 8,
        },
      ],
      categoryDetails,
      totalAmount,
    };
  }, [type, period, walletIds, categoryIds]);

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        const categoryId = chartData.categoryDetails[elementIndex].id;
        handleCategoryToggle(categoryId);
      }
    },
    plugins: {
      legend: {
        display: false, // We'll create a custom legend
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function (context) {
            const value = context.parsed;
            const total = chartData.totalAmount;
            const percentage = ((value / total) * 100).toFixed(1);
            const formattedValue = new Intl.NumberFormat("ko-KR", {
              style: "currency",
              currency: "KRW",
              minimumFractionDigits: 0,
            }).format(value);
            return `${context.label}: ${formattedValue} (${percentage}%)`;
          },
          afterLabel: function () {
            return "Click to select category";
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: "easeOutQuart",
    },
  };

  // Theme configuration based on type
  const isIncome = type === "income";
  const themeConfig = {
    icon: isIncome ? TrendingUp : TrendingDown,
    secondaryIcon: isIncome ? DollarSign : CreditCard,
    colors: {
      primary: isIncome ? "green" : "red",
      iconBg: isIncome
        ? "bg-green-100 dark:bg-green-900/30"
        : "bg-red-100 dark:bg-red-900/30",
      iconColor: isIncome
        ? "text-green-600 dark:text-green-400"
        : "text-red-600 dark:text-red-400",
      title: isIncome
        ? "text-green-800 dark:text-green-200"
        : "text-red-800 dark:text-red-200",
      subtitle: isIncome
        ? "text-green-700 dark:text-green-300"
        : "text-red-700 dark:text-red-300",
      secondaryIconColor: isIncome
        ? "text-green-600 dark:text-green-400"
        : "text-red-600 dark:text-red-400",
      legendValue: isIncome
        ? "text-green-700 dark:text-green-300"
        : "text-red-700 dark:text-red-300",
      legendPercentage: isIncome
        ? "text-green-600 dark:text-green-400"
        : "text-red-600 dark:text-red-400",
      border: isIncome
        ? "border-green-200 dark:border-green-700"
        : "border-red-200 dark:border-red-700",
    },
    title: isIncome ? "Income by Category" : "Expenses by Category",
  };

  const Icon = themeConfig.icon;
  const SecondaryIcon = themeConfig.secondaryIcon;

  if (chartData.categoryDetails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-gray-500 dark:text-gray-400">
        <Icon className="h-12 w-12 mb-4 opacity-50" />
        <h3 className="text-lg font-semibold mb-2">
          No {isIncome ? "Income" : "Expense"} Data
        </h3>
        <p className="text-sm text-center">
          No {isIncome ? "income" : "expense"} transactions found for the
          selected filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${themeConfig.colors.iconBg}`}>
          <Icon className={`h-6 w-6 ${themeConfig.colors.iconColor}`} />
        </div>
        <div>
          <h3
            className={`text-lg font-bold ${themeConfig.colors.title} flex items-center gap-2`}
          >
            {themeConfig.title}
            {categoryIds && categoryIds.length > 0 && (
              <span
                className={`text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}
              >
                {categoryIds.length} applied
              </span>
            )}
            {hasChanges && (
              <span
                className={`text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`}
              >
                {pendingSelections.length} pending
              </span>
            )}
          </h3>
          <div className="flex items-center gap-2">
            <SecondaryIcon
              className={`h-4 w-4 ${themeConfig.colors.secondaryIconColor}`}
            />
            <span
              className={`text-sm font-semibold ${themeConfig.colors.subtitle}`}
            >
              Total:{" "}
              {new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
                minimumFractionDigits: 0,
              }).format(chartData.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="xl:col-span-2 h-80">
          <Pie data={chartData} options={options} />
        </div>

        {/* Custom Legend */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">
              Category Breakdown
            </h4>
            <div className="flex gap-2">
              {hasAnySelections && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleClearSelections}
                  className="h-7 text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
              {hasChanges && (
                <Button
                  size="sm"
                  onClick={handleApplyFilters}
                  className="h-7 text-xs"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Apply
                </Button>
              )}
            </div>
          </div>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {chartData.categoryDetails.map((category) => {
              const percentage = (
                (category.total / chartData.totalAmount) *
                100
              ).toFixed(1);
              const isSelected = categoryIds?.includes(category.id) || false;
              const isPendingSelected = pendingSelections.includes(category.id);
              const hasChange = isSelected !== isPendingSelected;

              return (
                <div
                  key={category.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                    isPendingSelected
                      ? `bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 border-2 shadow-md`
                      : `bg-white/50 dark:bg-gray-800/50 ${themeConfig.colors.border} hover:bg-white/80 dark:hover:bg-gray-800/80`
                  } ${
                    hasChange
                      ? "ring-2 ring-yellow-300 dark:ring-yellow-600"
                      : ""
                  }`}
                  onClick={() => handleCategoryToggle(category.id)}
                  title={
                    isPendingSelected ? "Click to deselect" : "Click to select"
                  }
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                      {category.name}
                    </span>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-bold ${themeConfig.colors.legendValue}`}
                    >
                      {new Intl.NumberFormat("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                        minimumFractionDigits: 0,
                      }).format(category.total)}
                    </div>
                    <div
                      className={`text-xs ${themeConfig.colors.legendPercentage}`}
                    >
                      {percentage}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
