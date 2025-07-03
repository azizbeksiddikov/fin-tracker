import { WalletType } from "@/enums/wallet.enum";

export interface Wallet {
  id: string;
  name: string;
  type: WalletType;
  balance: number;
  currency: string;
  icon: string; // URL or path to the wallet icon
  color: string; // Color code for the wallet, e.g., hex code

  // Metadata
  created_at: Date;
  updated_at: Date;
}
