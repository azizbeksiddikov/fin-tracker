"use client";

import { useRouter } from "next/navigation";
import { Plus, User } from "lucide-react";

// shadcn/ui imports
import { Button } from "@/libs/components/ui/button";
import { Card, CardContent } from "@/libs/components/ui/card";

// Types and Enums
import type { WalletType } from "@/enums/wallet.enum";

// fake data import
import { walletSamples } from "@/data/wallets";

export default function Wallets() {
  const router = useRouter();

  const handleWalletClick = (walletId: string) => {
    router.push(`/transactions`);
  };

  const formatBalance = (balance: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(balance);
  };

  const getTotalBalancesByCurrency = () => {
    const balancesByCurrency: Record<string, number> = {};

    walletSamples.forEach((wallet) => {
      if (!balancesByCurrency[wallet.currency]) {
        balancesByCurrency[wallet.currency] = 0;
      }
      balancesByCurrency[wallet.currency] += wallet.balance;
    });

    return balancesByCurrency;
  };

  const formatBalanceWithCurrency = (balance: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(balance);
  };

  const getWalletIcon = (type: WalletType, color: string) => {
    return (
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
        style={{ backgroundColor: color }}
      >
        {type.charAt(0)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gray-100 px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white shadow-sm"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Cards</h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full overflow-hidden"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>

        {/* Total Balances by Currency */}
        <div className="text-center mb-8">
          {Object.entries(getTotalBalancesByCurrency()).map(
            ([currency, balance], index) => (
              <div key={currency} className={index > 0 ? "mt-3" : ""}>
                <div className="text-4xl font-bold text-black mb-1">
                  {formatBalanceWithCurrency(balance, currency)}
                </div>
                <div className="text-gray-500 text-sm">
                  Total balance in{" "}
                  <span className="text-blue-600 font-semibold">
                    {currency}
                  </span>
                </div>
              </div>
            )
          )}
          {Object.keys(getTotalBalancesByCurrency()).length > 1 && (
            <div className="text-xs text-gray-400 mt-2">
              {Object.keys(getTotalBalancesByCurrency()).length} currencies
            </div>
          )}
        </div>
      </div>

      {/* Cards List */}
      <div className="px-4 space-y-3">
        {walletSamples.map((wallet) => (
          <Card
            key={wallet.id}
            className="cursor-pointer transition-all hover:shadow-md active:scale-[0.98] bg-white border-0 shadow-sm"
            onClick={() => handleWalletClick(wallet.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getWalletIcon(wallet.type, wallet.color)}
                  <div>
                    <div className="font-semibold text-black">{wallet.id}</div>
                    <div className="text-sm text-gray-500">Card number</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-black">
                    {formatBalance(wallet.balance, wallet.currency)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom spacing for mobile */}
      <div className="h-20" />
    </div>
  );
}
