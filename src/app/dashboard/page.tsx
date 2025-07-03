"use client";

import { useState } from "react";

import { monthSummarySample } from "@/data/dashboard";
import DashboardHeader from "@/libs/components/dashboard/DashboardHeader";
import Summary from "@/libs/components/dashboard/Summary";
import DashboardFilters from "@/libs/components/dashboard/DashboardFilters";
import Charts from "@/libs/components/dashboard/Charts";
import { ChartFilters } from "@/types/dashboard";

export default function Dashboard() {
  const [chartFilters, setChartFilters] = useState<ChartFilters>({
    chartType: "bar",
    wallets: null,
    incomeCategories: null,
    expenseCategories: null,
    startDate: null,
    endDate: null,
  });

  return (
    <div className="min-h-screen max-w-6xl mx-auto">
      {/* Header */}
      <DashboardHeader />

      {/* Summary Cards */}
      <Summary monthSummary={monthSummarySample} />

      {/* Filters */}
      <DashboardFilters
        chartFilters={chartFilters}
        setChartFilters={setChartFilters}
      />

      {/* Charts */}
      <Charts chartFilters={chartFilters} setChartFilters={setChartFilters} />
    </div>
  );
}
