import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";

interface Redemption {
  id: string;
  userId: string;
  amount: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    email: string;
    profile?: {
      name?: string;
    };
  };
}

export default function AdminRedemptions() {
  const { token } = useAuth();
  const [redemptions, setRedemptions] = useState<Redemption[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [selectedRedemption, setSelectedRedemption] =
    useState<Redemption | null>(null);
  const [newStatus, setNewStatus] = useState("APPROVED");
  const [notes, setNotes] = useState("");

  const limit = 20;

  useEffect(() => {
    fetchRedemptions();
  }, [page, statusFilter]);

  const fetchRedemptions = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/redemptions?status=${statusFilter}&limit=${limit}&offset=${page * limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();
      setRedemptions(data.redemptions);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to load redemptions:", error);
      toast.error("Failed to load redemptions");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRedemption = async () => {
    if (!selectedRedemption || !token) return;

    try {
      const response = await fetch(
        `/api/admin/redemptions/${selectedRedemption.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
            notes: notes,
          }),
        },
      );

      if (response.ok) {
        toast.success("Redemption updated successfully");
        setSelectedRedemption(null);
        setNotes("");
        fetchRedemptions();
      } else {
        toast.error("Failed to update redemption");
      }
    } catch (error) {
      toast.error("Error updating redemption");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-900/30 text-yellow-300";
      case "APPROVED":
        return "bg-green-900/30 text-green-300";
      case "REJECTED":
        return "bg-red-900/30 text-red-300";
      case "COMPLETED":
        return "bg-blue-900/30 text-blue-300";
      default:
        return "bg-slate-700/30 text-slate-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-300 mb-4">
            Redemption Requests
          </h1>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
              className="bg-slate-900/50 border border-amber-400/30 rounded px-3 py-2 text-white"
            >
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
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
                      <th className="px-6 py-4 text-left font-semibold text-purple-300">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Notes
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {redemptions.map((redemption) => (
                      <tr
                        key={redemption.id}
                        className="border-b border-slate-700"
                      >
                        <td className="px-6 py-4 text-slate-300">
                          {new Date(redemption.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white text-sm">
                              {redemption.user.profile?.name ||
                                redemption.user.email}
                            </p>
                            <p className="text-slate-400 text-xs">
                              {redemption.user.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-purple-300">
                          {(
                            BigInt(redemption.amount) / 1000000000000000000n
                          ).toString()}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(redemption.status)}`}
                          >
                            {redemption.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-xs max-w-xs truncate">
                          {redemption.notes || "-"}
                        </td>
                        <td className="px-6 py-4">
                          {redemption.status === "PENDING" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedRedemption(redemption);
                                setNewStatus("APPROVED");
                                setNotes("");
                              }}
                              className="h-8 px-2"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
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
                  {Math.min((page + 1) * limit, total)} of {total} redemptions
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

            {/* Edit Modal */}
            {selectedRedemption && (
              <Card className="fixed inset-4 z-50 max-w-md mx-auto my-auto border-amber-400/40">
                <CardHeader>
                  <CardTitle>Update Redemption Request</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-300 mb-2">
                      {selectedRedemption.user.email}
                    </p>
                    <p className="text-sm text-slate-400">
                      Amount:{" "}
                      {(
                        BigInt(selectedRedemption.amount) / 1000000000000000000n
                      ).toString()}{" "}
                      Sweep Coins
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 block mb-2">
                      Status
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full bg-slate-900/50 border border-amber-400/30 rounded px-3 py-2 text-white"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 block mb-2">
                      Notes
                    </label>
                    <Input
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add notes..."
                      className="bg-slate-900/50 border-amber-400/30"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handleUpdateRedemption}
                      className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => setSelectedRedemption(null)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
}
