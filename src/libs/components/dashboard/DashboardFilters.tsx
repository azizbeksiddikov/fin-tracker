import { Filter, X } from "lucide-react";
import React from "react";

// shadcn UI components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/libs/components/ui/select";
import { Button } from "@/libs/components/ui/button";
import { Badge } from "@/libs/components/ui/badge";
import { ChartFilters } from "@/types/dashboard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/libs/components/ui/card";

// Sample data
import { walletSamples } from "@/data/wallets";
import { categorySamples } from "@/data/categories";

// Components
import MultiSelect from "@/libs/components/common/multi-select";

interface DashboardFiltersProps {
  chartFilters: ChartFilters;
  setChartFilters: React.Dispatch<React.SetStateAction<ChartFilters>>;
}

export default function DashboardFilters({
  chartFilters,
  setChartFilters,
}: DashboardFiltersProps) {
  const handleChartTypeChange = (value: string) => {
    setChartFilters((prev) => ({
      ...prev,
      chartType: value as "bar" | "pie",
    }));
  };

  const handleTimelineChange = (value: string) => {
    const now = new Date();
    let startDate: Date | null = null;
    let endDate: Date | null = new Date();

    switch (value) {
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        break;
      case "3months":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 3,
          now.getDate()
        );
        break;
      case "year":
        startDate = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate()
        );
        break;
      case "all":
        startDate = null;
        endDate = null;
        break;
    }

    setChartFilters((prev) => ({
      ...prev,
      startDate,
      endDate,
    }));
  };

  const clearAllFilters = () => {
    setChartFilters({
      chartType: "bar",
      wallets: null,
      incomeCategories: null,
      expenseCategories: null,
      startDate: null,
      endDate: null,
    });
  };

  const selectedWallets = chartFilters.wallets || [];
  const selectedIncomeCategories = chartFilters.incomeCategories || [];
  const selectedExpenseCategories = chartFilters.expenseCategories || [];
  const allSelectedCategories = [
    ...selectedIncomeCategories,
    ...selectedExpenseCategories,
  ];
  const hasActiveFilters =
    selectedWallets.length > 0 ||
    allSelectedCategories.length > 0 ||
    chartFilters.startDate ||
    chartFilters.endDate;

  // Transform data for MultiSelect component
  const walletOptions = walletSamples.map((wallet) => ({
    label: wallet.name,
    value: wallet.id,
  }));

  const categoryOptions = categorySamples.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const handleWalletsChange = (selectedWalletIds: string[]) => {
    setChartFilters((prev) => ({
      ...prev,
      wallets: selectedWalletIds.length > 0 ? selectedWalletIds : null,
    }));
  };

  const handleCategoriesChange = (selectedCategoryIds: string[]) => {
    // For now, we'll disable global category filtering since charts handle their own
    // This could be enhanced later to sync between charts and filters
    console.log(
      "Category filtering moved to individual charts",
      selectedCategoryIds
    );
  };

  const getTimelineValue = () => {
    if (!chartFilters.startDate || !chartFilters.endDate) return "all";

    const daysDiff = Math.floor(
      (chartFilters.endDate.getTime() - chartFilters.startDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (daysDiff <= 7) return "week";
    if (daysDiff <= 35) return "month";
    if (daysDiff <= 100) return "3months";
    if (daysDiff <= 370) return "year";
    return "custom";
  };

  return (
    <Card className="mb-8 border-0 shadow-xl bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-700/30 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg"></div>
      <CardHeader className="pb-6 relative">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur-sm opacity-20"></div>
              <div className="relative p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20 border border-blue-200/50 dark:border-blue-400/30">
                <Filter className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                Smart Filters
              </h3>
              {hasActiveFilters && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse"></div>
                  <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {(selectedWallets.length || 0) +
                      (allSelectedCategories.length || 0)}{" "}
                    active filters
                  </p>
                </div>
              )}
              {!hasActiveFilters && (
                <p className="text-sm text-muted-foreground">
                  Customize your data view
                </p>
              )}
            </div>
          </div>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="relative overflow-hidden group bg-white/50 dark:bg-gray-800/50 border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <X className="h-4 w-4 mr-2 relative z-10" />
              <span className="relative z-10">Clear All</span>
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Chart Type - Single Selection */}
          <div className="group space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                📊 Chart Type
              </label>
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 text-xs px-2 py-0.5"
              >
                Single
              </Badge>
            </div>
            <div className="relative">
              <Select
                value={chartFilters.chartType}
                onValueChange={handleChartTypeChange}
              >
                <SelectTrigger className="h-11 bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm">
                  <SelectValue className="font-medium" />
                </SelectTrigger>
                <SelectContent className="border-gray-200 dark:border-gray-700 shadow-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md">
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                    📈 Select visualization type
                  </div>
                  <SelectItem
                    value="bar"
                    className="py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:bg-blue-50 dark:focus:bg-blue-900/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-sm opacity-80"></div>
                      <span className="font-medium">Bar Chart</span>
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="pie"
                    className="py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-50 dark:focus:bg-purple-900/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-80"></div>
                      <span className="font-medium">Pie Chart</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Wallet Filter - Multiple Selection */}
          <div className="group space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                💳 Wallets
              </label>
              {selectedWallets.length > 0 && (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-0.5">
                  {selectedWallets.length} selected
                </Badge>
              )}
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs px-2 py-0.5"
              >
                Multi
              </Badge>
            </div>
            <div className="relative">
              <MultiSelect
                options={walletOptions}
                value={selectedWallets}
                onChange={handleWalletsChange}
                placeholder="Select wallets..."
                className="group-hover:shadow-md transition-shadow duration-200"
              />
            </div>
          </div>

          {/* Timeline Filter - Single Selection */}
          <div className="group space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                ⏰ Timeline
              </label>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-xs px-2 py-0.5"
              >
                Single
              </Badge>
            </div>
            <div className="relative">
              <Select
                value={getTimelineValue()}
                onValueChange={handleTimelineChange}
              >
                <SelectTrigger className="h-11 bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm">
                  <SelectValue className="font-medium" />
                </SelectTrigger>
                <SelectContent className="border-gray-200 dark:border-gray-700 shadow-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-md">
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
                    📅 Select time period
                  </div>
                  <SelectItem
                    value="week"
                    className="py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-50 dark:focus:bg-purple-900/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                      <span className="font-medium">Last Week</span>
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="month"
                    className="py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-50 dark:focus:bg-purple-900/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"></div>
                      <span className="font-medium">Last Month</span>
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="3months"
                    className="py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-50 dark:focus:bg-purple-900/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
                      <span className="font-medium">Last 3 Months</span>
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="year"
                    className="py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-50 dark:focus:bg-purple-900/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full"></div>
                      <span className="font-medium">Last Year</span>
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="all"
                    className="py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:bg-purple-50 dark:focus:bg-purple-900/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
                      <span className="font-medium">All Time</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {chartFilters.startDate && chartFilters.endDate && (
                <div className="mt-2 p-2 rounded-md bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
                  <div className="text-xs font-medium text-purple-700 dark:text-purple-300">
                    📅 {chartFilters.startDate.toLocaleDateString()} -{" "}
                    {chartFilters.endDate.toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category Filter - Multiple Selection */}
          <div className="group space-y-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                🏷️ Categories
              </label>
              {allSelectedCategories.length > 0 && (
                <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-2 py-0.5">
                  {allSelectedCategories.length} selected
                </Badge>
              )}
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs px-2 py-0.5"
              >
                Multi
              </Badge>
            </div>
            <div className="relative">
              <MultiSelect
                options={categoryOptions}
                value={[]}
                onChange={handleCategoriesChange}
                placeholder="Category filtering is done on individual charts..."
                className="group-hover:shadow-md transition-shadow duration-200 opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 dark:bg-gray-800/80 rounded-md">
                <span className="text-xs text-gray-600 dark:text-gray-400 text-center px-2">
                  📊 Use individual charts to filter categories
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
