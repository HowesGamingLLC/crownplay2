import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Gift,
  Gamepad2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  const goldCoins = user?.wallet?.goldCoins || 0;
  const sweepCoins = user?.wallet?.sweepCoins || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-300 mb-2">
            Welcome back, {user?.profile?.name || user?.email}!
          </h1>
          <p className="text-slate-400">
            View your wallet balance and continue your winning streak
          </p>
        </div>

        {/* Wallet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Gold Coins Card */}
          <Card className="border-amber-400/30 bg-gradient-to-br from-amber-900/30 to-amber-800/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-amber-100">Gold Coins</CardTitle>
                  <p className="text-sm text-slate-400 mt-1">
                    For Premium Games
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-xl">⭐</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-4xl font-bold text-amber-300">
                  {goldCoins.toLocaleString()}
                </p>
              </div>
              <Link to="/purchase">
                <Button className="w-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 hover:from-amber-300 hover:to-yellow-300">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Buy Gold Coins
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Sweep Coins Card */}
          <Card className="border-purple-400/30 bg-gradient-to-br from-purple-900/30 to-purple-800/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-purple-100">Sweep Coins</CardTitle>
                  <p className="text-sm text-slate-400 mt-1">
                    Redeem for Prizes
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-xl">💎</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-4xl font-bold text-purple-300">
                  {sweepCoins.toLocaleString()}
                </p>
              </div>
              {sweepCoins > 0 && (
                <Link to="/redeem">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500">
                    <Gift className="w-4 h-4 mr-2" />
                    Redeem Coins
                  </Button>
                </Link>
              )}
              {sweepCoins === 0 && (
                <p className="text-sm text-slate-400 text-center py-2">
                  Play games to earn sweep coins
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Play Games */}
          <Card className="border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition cursor-pointer">
            <CardContent className="pt-6">
              <Link
                to="/games"
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1">Play Games</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Explore our game library
                </p>
                <Button
                  variant="ghost"
                  className="text-blue-400 hover:text-blue-300 gap-2"
                >
                  Play Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Promotions */}
          <Card className="border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition cursor-pointer">
            <CardContent className="pt-6">
              <Link
                to="/promotions"
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1">Promotions</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Claim free bonuses
                </p>
                <Button
                  variant="ghost"
                  className="text-green-400 hover:text-green-300 gap-2"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Transactions */}
          <Card className="border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition cursor-pointer">
            <CardContent className="pt-6">
              <Link
                to="/transactions"
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1">Transactions</h3>
                <p className="text-sm text-slate-400 mb-4">View your history</p>
                <Button
                  variant="ghost"
                  className="text-orange-400 hover:text-orange-300 gap-2"
                >
                  View <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Featured Game Banner */}
        <Card className="border-amber-400/30 bg-gradient-to-r from-amber-900/40 via-slate-800/40 to-purple-900/40 overflow-hidden">
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Diamond Rush 💎
                </h3>
                <p className="text-slate-300 mb-4">
                  This week's hottest game - Chase diamonds and multiply your
                  coins!
                </p>
                <div className="flex gap-3">
                  <Link to="/games/diamond-rush">
                    <Button className="bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 hover:from-amber-300 hover:to-yellow-300">
                      Play Now
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="text-6xl">🎰</div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
