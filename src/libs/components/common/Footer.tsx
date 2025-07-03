"use client";

import { useCallback, useMemo } from "react";
import { Home, Wallet, ArrowUpDown, User, type LucideIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/libs/utils";

interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  matchPaths?: string[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "Wallets", icon: Wallet, href: "/wallets" },
  { label: "Transactions", icon: ArrowUpDown, href: "/transactions" },
  { label: "Profile", icon: User, href: "/profile" },
] as const;

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  // Improved active state detection
  const getIsActive = useCallback(
    (item: NavItem): boolean => {
      // Exact match
      if (pathname === item.href) return true;

      // Check if current path starts with the item's href (for nested routes)
      if (pathname.startsWith(item.href + "/")) return true;

      // Check additional match paths
      if (item.matchPaths) {
        return item.matchPaths.some(
          (path) => pathname === path || pathname.startsWith(path + "/")
        );
      }

      return false;
    },
    [pathname]
  );

  const handleTabClick = useCallback(
    (href: string) => {
      // Only navigate if not already on the target path
      if (pathname !== href) {
        router.push(href);
      }
    },
    [router, pathname]
  );

  // Memoize the navigation items with their active states
  const navigationItems = useMemo(
    () =>
      navItems.map((item) => ({
        ...item,
        isActive: getIsActive(item),
      })),
    [getIsActive]
  );

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200/80 shadow-lg">
      <nav
        className="flex items-center justify-between max-w-md mx-auto px-4 py-2"
        role="navigation"
        aria-label="Main navigation"
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.href}
              onClick={() => handleTabClick(item.href)}
              className={cn(
                "group relative flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 ease-out",
                "hover:scale-105 active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2",
                item.isActive
                  ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50/80"
              )}
              aria-label={`Navigate to ${item.label}`}
              aria-current={item.isActive ? "page" : undefined}
            >
              {/* Active indicator dot */}
              {item.isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-white rounded-full animate-pulse" />
              )}

              <Icon
                size={22}
                className={cn(
                  "mb-1 transition-all duration-300",
                  item.isActive
                    ? "stroke-2 drop-shadow-sm"
                    : "stroke-1.5 group-hover:stroke-2"
                )}
                aria-hidden="true"
              />

              <span
                className={cn(
                  "text-xs font-medium transition-all duration-300",
                  item.isActive
                    ? "text-white font-semibold"
                    : "text-gray-600 group-hover:text-gray-800"
                )}
              >
                {item.label}
              </span>

              {/* Hover effect background */}
              <div
                className={cn(
                  "absolute inset-0 rounded-xl transition-opacity duration-300",
                  "bg-gradient-to-br from-blue-50 to-blue-100/50 opacity-0",
                  !item.isActive && "group-hover:opacity-100"
                )}
              />
            </button>
          );
        })}
      </nav>
    </footer>
  );
}
