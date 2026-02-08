import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  userId: string;
  type: string;
  amount: string;
  currencyType: string;
  createdAt: string;
  user: {
    email: string;
    profile?: {
      name?: string;
    };
  };
}

export default function AdminTransactions() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const limit = 20;

  useEffect(() => {
    fetchTransactions();
  }, [page]);

  const fetchTransactions = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/transactions?limit=${limit}&offset=${page * limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();
      setTransactions(data.transactions);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to load transactions:", error);
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-300 mb-2">
            Transactions
          </h1>
          <p className="text-slate-400">
            All player transactions and purchases
          </p>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <Card className="border-slate-700/50 bg-slate-800/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        User
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Currency
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-slate-700">
                        <td className="px-6 py-4 text-slate-300">
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white text-sm">
                              {tx.user.profile?.name || tx.user.email}
                            </p>
                            <p className="text-slate-400 text-xs">
                              {tx.user.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              tx.type === "PURCHASE"
                                ? "bg-blue-900/30 text-blue-300"
                                : tx.type === "BONUS"
                                  ? "bg-green-900/30 text-green-300"
                                  : "bg-slate-700/30 text-slate-300"
                            }`}
                          >
                            {tx.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white font-semibold">
                          {(
                            BigInt(tx.amount) / 1000000000000000000n
                          ).toString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={
                              tx.currencyType === "GOLD"
                                ? "text-amber-300"
                                : "text-purple-300"
                            }
                          >
                            {tx.currencyType}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-slate-700 flex justify-between items-center">
                <p className="text-sm text-slate-400">
                  Showing {page * limit + 1} to{" "}
                  {Math.min((page + 1) * limit, total)} of {total} transactions
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={(page + 1) * limit >= total}
                    onClick={() => setPage(page + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
