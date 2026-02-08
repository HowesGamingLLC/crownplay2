import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  Search,
  Lock,
  Unlock,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface User {
  id: string;
  email: string;
  role: string;
  status: string;
  profile?: {
    name?: string;
    kycStatus?: string;
  };
  wallet?: {
    goldCoins: number;
    sweepCoins: number;
  };
  createdAt: string;
}

export default function AdminUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editReason, setEditReason] = useState("");
  const [editType, setEditType] = useState<"gold" | "sweep">("gold");

  const limit = 10;

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const fetchUsers = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/users?search=${search}&limit=${limit}&offset=${page * limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await response.json();
      setUsers(data.users);
      setTotal(data.total);
    } catch (error) {
      console.error("Failed to load users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBalance = async () => {
    if (!selectedUser || !editAmount) {
      toast.error("Please enter an amount");
      return;
    }

    if (!token) return;

    try {
      const amount = parseFloat(editAmount);
      const data: any = {
        reason: editReason,
      };
      if (editType === "gold") {
        data.goldCoins = amount;
      } else {
        data.sweepCoins = amount;
      }

      const response = await fetch(
        `/api/admin/users/${selectedUser.id}/balance`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        toast.success("Balance updated successfully");
        setSelectedUser(null);
        setEditAmount("");
        setEditReason("");
        fetchUsers();
      } else {
        toast.error("Failed to update balance");
      }
    } catch (error) {
      toast.error("Error updating balance");
    }
  };

  const handleUpdateStatus = async (user: User, newStatus: string) => {
    if (!token) return;

    try {
      const response = await fetch(`/api/admin/users/${user.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        toast.success(`User ${newStatus.toLowerCase()}`);
        fetchUsers();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating user status");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-300 mb-4">
            User Management
          </h1>
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search by email or name..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
                className="pl-10 bg-slate-900/50 border-amber-400/30"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            {/* Users Table */}
            <Card className="border-slate-700/50 bg-slate-800/30 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="px-6 py-4 text-left font-semibold text-amber-300">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-amber-300">
                        Gold Coins
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-purple-300">
                        Sweep Coins
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        KYC
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-slate-700">
                        <td className="px-6 py-4 text-white">{user.email}</td>
                        <td className="px-6 py-4 text-slate-300">
                          {user.profile?.name || "-"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              user.role === "ADMIN"
                                ? "bg-red-900/30 text-red-300"
                                : "bg-blue-900/30 text-blue-300"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              user.status === "ACTIVE"
                                ? "bg-green-900/30 text-green-300"
                                : "bg-red-900/30 text-red-300"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-amber-300">
                          {(user.wallet?.goldCoins || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-purple-300">
                          {(user.wallet?.sweepCoins || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {user.profile?.kycStatus || "UNVERIFIED"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedUser(user)}
                              className="h-8 px-2"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            {user.status === "ACTIVE" ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleUpdateStatus(user, "LOCKED")
                                }
                                className="h-8 px-2 text-red-400"
                              >
                                <Lock className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleUpdateStatus(user, "ACTIVE")
                                }
                                className="h-8 px-2 text-green-400"
                              >
                                <Unlock className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
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
                  {Math.min((page + 1) * limit, total)} of {total} users
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
            {selectedUser && (
              <Card className="fixed inset-4 z-50 max-w-md mx-auto my-auto border-amber-400/40">
                <CardHeader>
                  <CardTitle>Update User Balance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-300 mb-2">
                      {selectedUser.email}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 block mb-2">
                      Adjustment Type
                    </label>
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value as any)}
                      className="w-full bg-slate-900/50 border border-amber-400/30 rounded px-3 py-2 text-white"
                    >
                      <option value="gold">Gold Coins</option>
                      <option value="sweep">Sweep Coins</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 block mb-2">
                      Amount (positive or negative)
                    </label>
                    <Input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      placeholder="100"
                      className="bg-slate-900/50 border-amber-400/30"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-300 block mb-2">
                      Reason
                    </label>
                    <Input
                      value={editReason}
                      onChange={(e) => setEditReason(e.target.value)}
                      placeholder="Admin adjustment..."
                      className="bg-slate-900/50 border-amber-400/30"
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handleUpdateBalance}
                      className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => setSelectedUser(null)}
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
