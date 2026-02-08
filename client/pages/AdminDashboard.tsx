import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  Users,
  TrendingUp,
  Coins,
  Gift,
  AlertCircle,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface KPIs {
  totalUsers: number;
  activeUsers: number;
  totalGoldCoins: number;
  totalSweepCoins: number;
  pendingRedemptions: number;
}

export default function AdminDashboard() {
  const { token } = useAuth();
  const [kpis, setKpis] = useState<KPIs | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKPIs = async () => {
      if (!token) return;
      try {
        const response = await fetch("/api/admin/dashboard/kpis", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setKpis(data);
        }
      } catch (error) {
        console.error("Failed to fetch KPIs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKPIs();
  }, [token]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-300 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-400">
            Manage users, transactions, and platform settings
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Total Users */}
          <Card className="border-blue-400/30 bg-blue-900/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-100 text-sm font-medium">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-blue-300">
                  {kpis?.totalUsers || 0}
                </p>
                <Users className="w-5 h-5 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          {/* Active Users */}
          <Card className="border-green-400/30 bg-green-900/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-100 text-sm font-medium">
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-green-300">
                  {kpis?.activeUsers || 0}
                </p>
                <Activity className="w-5 h-5 text-green-400" />
              </div>
            </CardContent>
          </Card>

          {/* Gold Coins */}
          <Card className="border-amber-400/30 bg-amber-900/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-amber-100 text-sm font-medium">
                Total Gold Coins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-amber-300">
                  {(kpis?.totalGoldCoins || 0).toLocaleString()}
                </p>
                <Coins className="w-5 h-5 text-amber-400" />
              </div>
            </CardContent>
          </Card>

          {/* Sweep Coins */}
          <Card className="border-purple-400/30 bg-purple-900/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-100 text-sm font-medium">
                Total Sweep Coins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-purple-300">
                  {(kpis?.totalSweepCoins || 0).toLocaleString()}
                </p>
                <Gift className="w-5 h-5 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          {/* Pending Redemptions */}
          <Card className="border-red-400/30 bg-red-900/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-red-100 text-sm font-medium">
                Pending Redemptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-red-300">
                  {kpis?.pendingRedemptions || 0}
                </p>
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Users Management */}
          <Link to="/admin/users">
            <Card className="border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">
                  View and manage player accounts, balances, and status
                </p>
                <div className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
                  Manage Users
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Transactions */}
          <Link to="/admin/transactions">
            <Card className="border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">
                  View all player transactions and purchase history
                </p>
                <div className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium">
                  View Transactions
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Redemptions */}
          <Link to="/admin/redemptions">
            <Card className="border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-purple-400" />
                  Redemptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">
                  Manage redemption requests and prize fulfillment
                </p>
                <div className="flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium">
                  Manage Redemptions
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Packages */}
          <Link to="/admin/packages">
            <Card className="border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-amber-400" />
                  Coin Packages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">
                  Create and manage coin package offerings
                </p>
                <div className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium">
                  Manage Packages
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Promotions */}
          <Link to="/admin/promotions">
            <Card className="border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-pink-400" />
                  Promotions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">
                  Create and manage promotional campaigns and bonus codes
                </p>
                <div className="flex items-center gap-2 text-pink-400 hover:text-pink-300 text-sm font-medium">
                  Manage Promotions
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Games Management */}
          <Link to="/admin/games">
            <Card className="border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-cyan-400" />
                  Games
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-sm mb-4">
                  Manage game listings, settings, and metadata
                </p>
                <div className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                  Manage Games
                  <ArrowRight className="w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        <Card className="border-slate-700/50 bg-slate-800/30 mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-400 text-center py-8">
              <p className="text-sm">Activity log coming soon</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
