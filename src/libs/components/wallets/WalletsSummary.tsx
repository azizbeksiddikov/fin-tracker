import React, { useRef } from "react";
import { Wallet, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/libs/components/ui/card";
import { Button } from "@/libs/components/ui/button";

const formatBalanceWithCurrency = (balance: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(balance);
};

interface WalletsSummaryProps {
  totalBalancesByCurrency: Record<string, number>;
}

export default function WalletsSummary({
  totalBalancesByCurrency,
}: WalletsSummaryProps) {
  const currencies = Object.entries(totalBalancesByCurrency);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (currencies.length === 0) return null;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -280, // Card width (256px) + gap (12px) + some extra
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 280, // Card width (256px) + gap (12px) + some extra
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Wallet className="h-4 w-4 text-blue-600" />
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Total Balance
        </h3>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Navigation Arrows */}
        {currencies.length > 3 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 rounded-full shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 rounded-full shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Smooth Scrollable Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 px-12"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {currencies.map(([currency, balance]) => {
            const isPositive = balance >= 0;

            return (
              <Card
                key={currency}
                className="flex-none w-64 shadow-sm hover:shadow-md transition-all duration-300 snap-center"
              >
                <CardContent className="p-4">
                  <div className="text-center">
                    <div
                      className={`text-lg font-bold mb-2 ${
                        isPositive
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formatBalanceWithCurrency(Math.abs(balance), currency)}
                    </div>

                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        isPositive
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {currency}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Scroll Hint */}
        {currencies.length > 3 && (
          <div className="text-center mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Use arrows or scroll horizontally to see more currencies
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
