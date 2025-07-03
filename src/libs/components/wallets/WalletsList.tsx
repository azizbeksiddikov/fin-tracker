import React from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Wallet as WalletIcon, ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/libs/components/ui/card";

// Types and Enums
import type { WalletType } from "@/enums/wallet.enum";
import { Wallet } from "@/types/wallet";

interface WalletsListProps {
  walletsList: Wallet[];
}

export default function WalletsList({ walletsList }: WalletsListProps) {
  const router = useRouter();
  const handleWalletClick = (walletId: string) => {
    console.log(`Navigating to wallet details for ${walletId}`);
    router.push(`/transactions`);
  };

  const formatBalance = (balance: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(balance);
  };

  const getWalletIcon = (type: WalletType, color: string) => {
    const IconComponent = type.toLowerCase().includes("card")
      ? CreditCard
      : WalletIcon;

    return (
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
        style={{ backgroundColor: color }}
      >
        <IconComponent className="w-6 h-6" />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {walletsList.map((wallet) => {
        const isPositive = wallet.balance >= 0;

        return (
          <Card
            key={wallet.id}
            className="cursor-pointer transition-all duration-200 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-750 border border-gray-200 dark:border-gray-700 overflow-hidden"
            onClick={() => handleWalletClick(wallet.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getWalletIcon(wallet.type, wallet.color)}
                  <div className="flex-1">
                    <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                      {wallet.id}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <span className="capitalize">
                        {wallet.type.replace("_", " ")}
                      </span>
                      <span>•</span>
                      <span>{wallet.currency}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div
                      className={`font-bold text-xl mb-1 ${
                        isPositive
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formatBalance(Math.abs(wallet.balance), wallet.currency)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Current balance
                    </div>
                  </div>

                  <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
