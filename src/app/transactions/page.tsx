"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  FileText,
  File,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// shadcn/ui imports
import { Button } from "@/libs/components/ui/button";
import { Input } from "@/libs/components/ui/input";
import { Badge } from "@/libs/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/libs/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/libs/components/ui/dialog";
import { Separator } from "@/libs/components/ui/separator";

// Types and Enums
import { WalletType } from "@/enums/wallet.enum";

// Sample Data Imports
import { transactionsByDate } from "@/data/transactions";
import { walletSamples } from "@/data/wallets";
import { categorySamples } from "@/data/categories";

export default function Transactions() {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedWallets, setSelectedWallets] = useState<string[]>([]);
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  // const [dateRange, setDateRange] = useState({ from: "", to: "" });
  // const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Pagination
  const totalPages = Math.ceil(transactionsByDate.totalCount / itemsPerPage);

  const getWalletById = (id: string) => walletSamples.find((w) => w.id === id);
  const getCategoryById = (id: string) =>
    categorySamples.find((c) => c.id === id);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage all your financial transactions
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4 py-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Plus className="h-6 w-6" />
                Manual Entry
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="h-6 w-6" />
                Import CSV/Excel
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <File className="h-6 w-6" />
                Image OCR
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button variant="outline" className="relative">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* 
    Choose Wallets: select ALL, or separate wallets.
    Choose Categories: select ALL, or separate categories.
    Choose Date Range: from date to date, or ALL dates.
    Choose Transaction Type: INCOME, EXPENSE, BETWEEN_CARDS.
    Search Transactions: by title AND note.
   */}

      {/* Transactions List */}
      <div className="space-y-6">
        {transactionsByDate?.totalCount ? (
          Object.entries(transactionsByDate.list).map(
            ([date, transactions]) => (
              <Card key={date}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg"> {date} </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction, index) => {
                      const wallet = getWalletById(transaction.wallet_id);
                      const category = getCategoryById(
                        transaction.category_id || ""
                      );

                      return (
                        <div key={transaction.id}>
                          <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                            <div className="flex items-center space-x-4">
                              <div className="text-2xl">{wallet?.icon}</div>
                              <div className="space-y-1">
                                <div className="font-medium">
                                  {transaction.title}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {transaction.receiver} • {wallet?.name} •{" "}
                                  {formatTime(transaction.date)}
                                </div>
                                {transaction.note && (
                                  <div className="text-sm text-muted-foreground">
                                    {transaction.note}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center space-x-4">
                              {category && <Badge>{category.name}</Badge>}
                              <div className="text-right">
                                <div className="font-semibold">
                                  {transaction.amount}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {transaction.currency}
                                </div>
                              </div>
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                {wallet?.type === WalletType.CASH && (
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                          {index < transactions.length - 1 && (
                            <Separator className="my-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )
          )
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="text-lg font-medium text-muted-foreground">
                  No transactions found
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your filters or search terms
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 4. Add Transaction Modal */}
      {/* 
  Floating “+ Add Transaction” button
  AddTransactionModal
   
   + Add Transaction (form/modal)

  Upload from:
  CSV/XLSX
  Image (OCR) */}
    </div>
  );

  /*
  BE:
  For each date: multiple transactions.
  No transactions => no date displayed. 
  */
}
