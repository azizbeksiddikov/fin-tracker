import React from "react";
import { Card, CardContent } from "@/libs/components/ui/card";
import { MonthSummary } from "@/types/dashboard";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface SummaryProps {
  monthSummary: MonthSummary;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatPercentage = (percentage: number) => {
  return `${percentage >= 0 ? "+" : ""}${percentage.toFixed(1)}%`;
};

const PercentageChange = ({ percentage }: { percentage: number }) => {
  const isPositive = percentage >= 0;
  const isZero = percentage === 0;

  if (isZero) {
    return (
      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
        <span>No change</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center text-xs font-medium ${
        isPositive
          ? "text-green-600 dark:text-green-400"
          : "text-red-600 dark:text-red-400"
      }`}
    >
      {isPositive ? (
        <ArrowUpRight className="h-3 w-3 mr-1" />
      ) : (
        <ArrowDownRight className="h-3 w-3 mr-1" />
      )}
      <span>{formatPercentage(percentage)}</span>
    </div>
  );
};

export default function Summary({ monthSummary }: SummaryProps) {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 hover:shadow-xl transition-shadow duration-300 mb-8">
      <CardContent className="flex flex-row md:items-center justify-between p-4 md:p-6">
        {/* Income */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-1 mb-4 md:mb-0">
          <div className="p-2 md:p-3 bg-green-100 dark:bg-green-900/50 rounded-xl">
            <TrendingUp className="h-4 w-4 md:h-6 md:w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium text-green-700 dark:text-green-300 mb-1">
              Total Income
            </p>
            <p className="text-lg md:text-2xl lg:text-3xl font-bold text-green-800 dark:text-green-200">
              {formatCurrency(monthSummary.income)}
            </p>
            <PercentageChange percentage={monthSummary.income_perc_change} />
          </div>
        </div>

        {/* Separator */}
        <div className="hidden md:block w-px h-16 bg-gray-200 dark:bg-gray-700 mx-4"></div>

        {/* Expenses */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-1 mb-4 md:mb-0">
          <div className="p-2 md:p-3 bg-red-100 dark:bg-red-900/50 rounded-xl">
            <TrendingDown className="h-4 w-4 md:h-6 md:w-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p className="text-xs md:text-sm font-medium text-red-700 dark:text-red-300 mb-1">
              Total Expenses
            </p>
            <p className="text-lg md:text-2xl lg:text-3xl font-bold text-red-800 dark:text-red-200">
              {formatCurrency(monthSummary.expense)}
            </p>
            <PercentageChange percentage={monthSummary.expense_perc_change} />
          </div>
        </div>

        {/* Separator */}
        <div className="hidden md:block w-px h-16 bg-gray-200 dark:bg-gray-700 mx-4"></div>

        {/* Net Income */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-1">
          <div
            className={`p-2 md:p-3 rounded-xl ${
              monthSummary.net >= 0
                ? "bg-blue-100 dark:bg-blue-900/50"
                : "bg-orange-100 dark:bg-orange-900/50"
            }`}
          >
            <DollarSign
              className={`h-4 w-4 md:h-6 md:w-6 ${
                monthSummary.net >= 0
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-orange-600 dark:text-orange-400"
              }`}
            />
          </div>
          <div>
            <p
              className={`text-xs md:text-sm font-medium mb-1 ${
                monthSummary.net >= 0
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-orange-700 dark:text-orange-300"
              }`}
            >
              Net Income
            </p>
            <p
              className={`text-lg md:text-2xl lg:text-3xl font-bold ${
                monthSummary.net >= 0
                  ? "text-blue-800 dark:text-blue-200"
                  : "text-orange-800 dark:text-orange-200"
              }`}
            >
              {formatCurrency(monthSummary.net)}
            </p>
            <PercentageChange percentage={monthSummary.net_perc_change} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
