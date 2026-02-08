import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Gift, Clock, Zap } from "lucide-react";

interface Promotion {
  id: string;
  name: string;
  description: string;
  code: string;
  bonusType: string;
  bonusValue: number;
  startAt: string;
  endAt: string;
  maxUses?: number;
  currentUses: number;
}

export default function Promotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await fetch("/api/promotions");
      const data = await response.json();
      setPromotions(data.promotions || []);
    } catch (error) {
      console.error("Failed to load promotions:", error);
      toast.error("Failed to load promotions");
    } finally {
      setLoading(false);
    }
  };

  const handleClaimPromotion = (promo: Promotion) => {
    toast.success(
      `Promotion code "${promo.code}" saved! Enter it during checkout.`,
    );
  };

  const getBonusIcon = (bonusType: string) => {
    switch (bonusType) {
      case "GOLD_COINS":
        return "⭐";
      case "SWEEP_COINS":
        return "💎";
      case "PERCENTAGE":
        return "📈";
      default:
        return "🎁";
    }
  };

  const getBonusLabel = (bonusType: string, value: number) => {
    switch (bonusType) {
      case "GOLD_COINS":
        return `+${value.toLocaleString()} Gold Coins`;
      case "SWEEP_COINS":
        return `+${value.toLocaleString()} Sweep Coins`;
      case "PERCENTAGE":
        return `${value}% Bonus`;
      default:
        return `Bonus: ${value}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-300 mb-4">Promotions</h1>
          <p className="text-slate-400 text-lg">
            Check out our current offers and exclusive bonus codes
          </p>
        </div>

        {/* Active Promotions */}
        {promotions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promo) => (
              <Card
                key={promo.id}
                className="border-amber-400/30 bg-gradient-to-br from-amber-900/30 to-slate-800/30 hover:border-amber-400/50 transition-all"
              >
                <CardHeader>
                  <CardTitle className="flex items-start justify-between mb-2">
                    <span className="text-amber-300">{promo.name}</span>
                    <span className="text-2xl">
                      {getBonusIcon(promo.bonusType)}
                    </span>
                  </CardTitle>
                  <p className="text-slate-400 text-sm">{promo.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Bonus */}
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <p className="text-sm text-slate-400 mb-1">Bonus</p>
                    <p className="text-xl font-bold text-white">
                      {getBonusLabel(promo.bonusType, Number(promo.bonusValue))}
                    </p>
                  </div>

                  {/* Code */}
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <p className="text-sm text-slate-400 mb-1">Promo Code</p>
                    <p className="text-lg font-mono font-bold text-amber-300">
                      {promo.code}
                    </p>
                  </div>

                  {/* Validity */}
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>
                      Valid until {new Date(promo.endAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Claim Button */}
                  <Button
                    onClick={() => handleClaimPromotion(promo)}
                    className="w-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 hover:from-amber-300 hover:to-yellow-300 font-semibold"
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Copy Code & Play
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-slate-700/50 bg-slate-800/30">
            <CardContent className="py-12 text-center">
              <Zap className="w-12 h-12 text-amber-400/50 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                No Active Promotions
              </h3>
              <p className="text-slate-400">
                Check back soon for exciting new offers and bonus codes!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        <Card className="mt-12 border-blue-400/30 bg-blue-900/20">
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold text-blue-300 mb-3">
              How to Use Promotions
            </h3>
            <ol className="text-blue-200 space-y-2 list-decimal list-inside text-sm">
              <li>Find a promotion you like and copy the promo code</li>
              <li>Visit the Coin Store and select a package</li>
              <li>Enter the code during checkout for instant bonuses</li>
              <li>Your bonus coins will be credited immediately!</li>
            </ol>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
