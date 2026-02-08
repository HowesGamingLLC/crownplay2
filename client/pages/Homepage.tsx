import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Zap,
  Trophy,
  Users,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Homepage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-amber-400/20 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center font-bold text-slate-900 group-hover:shadow-lg group-hover:shadow-amber-400/50 transition-all">
                👑
              </div>
              <span className="text-xl font-bold text-amber-300 hidden sm:inline">
                CrownPlay
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="#features"
                className="text-slate-300 hover:text-amber-300 transition"
              >
                Features
              </Link>
              <Link
                to="/faq"
                className="text-slate-300 hover:text-amber-300 transition"
              >
                FAQ
              </Link>
              <Link
                to="/terms"
                className="text-slate-300 hover:text-amber-300 transition"
              >
                Terms
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 font-semibold hover:from-amber-300 hover:to-yellow-300"
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/login")}
                    className="hidden sm:inline-flex border-amber-400/30 text-amber-300 hover:bg-amber-400/10"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => navigate("/signup")}
                    className="bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 font-semibold hover:from-amber-300 hover:to-yellow-300"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Animated background elements */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl opacity-20 animate-pulse"></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-full">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-sm text-amber-300">
                  Join 50,000+ Players Today
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300">
                Play Premium
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-purple-300">
                Casino Games & Win
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Experience the thrill of sweepstakes casino gaming with two coin
              systems:
              <br />
              <span className="text-amber-300">Gold Coins</span> for premium
              games and <span className="text-purple-300">Sweep Coins</span> to
              redeem amazing prizes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                onClick={() =>
                  navigate(isAuthenticated ? "/dashboard" : "/signup")
                }
                className="bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 font-semibold py-6 text-lg px-8 rounded-lg hover:from-amber-300 hover:to-yellow-300 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-amber-400/40 gap-2"
              >
                {isAuthenticated ? "Go to Dashboard" : "Start Playing"}
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-amber-400/30 text-amber-300 hover:bg-amber-400/10 py-6 text-lg px-8"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div>
                <p className="text-3xl font-bold text-amber-300">50K+</p>
                <p className="text-sm text-slate-400">Active Players</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-300">$5M+</p>
                <p className="text-sm text-slate-400">Prizes Awarded</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-300">100+</p>
                <p className="text-sm text-slate-400">Games</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-slate-900/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose CrownPlay?
            </h2>
            <p className="text-xl text-slate-400">
              Everything you need for an amazing gaming experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-amber-400/20 bg-slate-800/50 hover:bg-slate-800/80 transition-all hover:border-amber-400/40">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-slate-900" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Secure & Licensed
                </h3>
                <p className="text-slate-400">
                  Play with confidence on our fully licensed and encrypted
                  gaming platform
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-purple-400/20 bg-slate-800/50 hover:bg-slate-800/80 transition-all hover:border-purple-400/40">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Dual Currency System
                </h3>
                <p className="text-slate-400">
                  Gold Coins for premium play, Sweep Coins for real prize
                  redemptions
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-blue-400/20 bg-slate-800/50 hover:bg-slate-800/80 transition-all hover:border-blue-400/40">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Big Win Potential
                </h3>
                <p className="text-slate-400">
                  Win amazing prizes and climb the leaderboards for exclusive
                  rewards
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-green-400/20 bg-slate-800/50 hover:bg-slate-800/80 transition-all hover:border-green-400/40">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Social Gaming
                </h3>
                <p className="text-slate-400">
                  Compete with friends and join tournaments for epic gaming
                  sessions
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-orange-400/20 bg-slate-800/50 hover:bg-slate-800/80 transition-all hover:border-orange-400/40">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Daily Bonuses
                </h3>
                <p className="text-slate-400">
                  Collect free coins daily and unlock exclusive promotions
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-red-400/20 bg-slate-800/50 hover:bg-slate-800/80 transition-all hover:border-red-400/40">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  100+ Games
                </h3>
                <p className="text-slate-400">
                  Enjoy a vast library of exciting games from classic to modern
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-900/40 via-purple-900/40 to-amber-900/40 border border-amber-400/30 rounded-2xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-purple-400/5 rounded-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Winning?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Join thousands of players enjoying the best sweepstakes casino
              experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() =>
                  navigate(isAuthenticated ? "/dashboard" : "/signup")
                }
                className="bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 font-semibold py-6 text-lg px-8 hover:from-amber-300 hover:to-yellow-300 gap-2"
              >
                {isAuthenticated ? "Go to Dashboard" : "Create Account Now"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded text-slate-900 flex items-center justify-center text-sm font-bold">
                  👑
                </div>
                <span className="font-bold text-amber-300">CrownPlay</span>
              </div>
              <p className="text-sm text-slate-400">
                Premium sweepstakes casino gaming platform
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Games</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link to="/games" className="hover:text-amber-300">
                    All Games
                  </Link>
                </li>
                <li>
                  <Link to="/promotions" className="hover:text-amber-300">
                    Promotions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link to="/faq" className="hover:text-amber-300">
                    FAQ
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@crownplay.com"
                    className="hover:text-amber-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <Link to="/terms" className="hover:text-amber-300">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-amber-300">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8">
            <p className="text-center text-sm text-slate-400">
              © 2024 CrownPlay. All rights reserved. Must be 18+ to play.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
