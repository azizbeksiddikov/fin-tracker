"use client";

import React, { useState, useCallback } from "react";
import { Home, Wallet, ArrowUpDown, User, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "Wallets", icon: Wallet, href: "/wallets" },
  { label: "Transactions", icon: ArrowUpDown, href: "/transactions" },
  { label: "Profile", icon: User, href: "/profile" },
] as const;

export default function Footer() {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const handleTabClick = useCallback(
    (tabId: number) => {
      setActiveTab(tabId);
      router.push(navItems[tabId].href);
    },
    [router]
  );

  return (
    <footer className="bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
      <nav className="flex items-center justify-between max-w-md mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === index;

          return (
            <button
              key={item.href}
              onClick={() => handleTabClick(index)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-500 text-white scale-105"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
              aria-label={`Navigate to ${item.label}`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                size={24}
                className={`mb-1 ${isActive ? "stroke-2" : "stroke-1.5"}`}
                aria-hidden="true"
              />
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-white" : "text-gray-600"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </footer>
  );
}
