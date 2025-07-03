"use client";

// fake data import
import { walletSamples } from "@/data/wallets";

// Components
import WalletsHeader from "@/libs/components/wallets/WalletsHeader";
import WalletsSummary from "@/libs/components/wallets/WalletsSummary";
import WalletsList from "@/libs/components/wallets/WalletsList";

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

export default function Wallets() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto">
      {/* Header */}
      <WalletsHeader />

      {/* Total Balances by Currency */}
      <WalletsSummary totalBalancesByCurrency={getTotalBalancesByCurrency()} />

      {/* Cards List */}
      <WalletsList walletsList={walletSamples} />
    </div>
  );
}
