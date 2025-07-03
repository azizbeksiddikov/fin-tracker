import React from "react";

export default function DashboardHeader() {
  return (
    <div className="bg-white dark:bg-gray-800 border-b px-4 py-6">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Track your income and expenses
        </p>
      </div>
    </div>
  );
}
