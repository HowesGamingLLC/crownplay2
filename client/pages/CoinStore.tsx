import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Check, Zap, Gift } from "lucide-react";

interface Package {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  goldAmount: number;
  sweepAmount: number;
  bonusPercentage: number;
  isActive: boolean;
}

declare global {
  interface Window {
    Square?: any;
  }
}

export default function CoinStore() {
  const { token, user } = useAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [processing, setProcessing] = useState(false);
  const [web, setWeb] = useState<any>(null);

  // Load packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/packages");
        const data = await response.json();
        setPackages(data.packages);
      } catch (error) {
        console.error("Failed to load packages:", error);
        toast.error("Failed to load coin packages");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Initialize Square
  useEffect(() => {
    if (!process.env.REACT_APP_SQUARE_APP_ID) {
      console.warn("Square App ID not configured");
      return;
    }

    // Load Square Web Payments SDK from CDN
    const script = document.createElement("script");
    script.src = "https://web.squarecdn.com/v1/square.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = async () => {
      if (window.Square) {
        try {
          const web = await window.Square.Web.payments(
            process.env.REACT_APP_SQUARE_APP_ID,
          );
          setWeb(web);
        } catch (error) {
          console.error("Square initialization failed:", error);
        }
      }
    };
  }, []);

  const handlePurchase = async (pkg: Package) => {
    if (!token || !web || !selectedPackage) {
      toast.error("Unable to process payment");
      return;
    }

    setProcessing(true);

    try {
      // Create payment method
      const paymentMethod = await web.paymentMethods.card();
      const token_result = await paymentMethod.tokenize();

      if (token_result.status === "OK") {
        const response = await fetch("/api/payment/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            sourceId: token_result.token,
            packageId: pkg.id,
            amount: pkg.priceCents,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(
            `Successfully purchased ${pkg.name}! 🎉 Check your wallet for the coins!`,
          );
          setSelectedPackage(null);
          // Could refresh user wallet here
        } else {
          toast.error(data.error || "Payment failed");
        }
      } else {
        toast.error("Card validation failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        error instanceof Error ? error.message : "Payment processing failed",
      );
    } finally {
      setProcessing(false);
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
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-amber-300 mb-4">
            Gold Coin Store
          </h1>
          <p className="text-slate-400 text-lg">
            Purchase Gold Coins to play premium games. Bonus: Get free Sweep
            Coins with every purchase! 🎁
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`border-2 transition-all cursor-pointer ${
                selectedPackage?.id === pkg.id
                  ? "border-amber-400 bg-amber-900/30 shadow-lg shadow-amber-400/30"
                  : "border-amber-400/20 bg-slate-800/30 hover:border-amber-400/50"
              }`}
              onClick={() => setSelectedPackage(pkg)}
            >
              <CardHeader>
                <CardTitle className="text-amber-300 mb-2">
                  {pkg.name}
                </CardTitle>
                <p className="text-2xl font-bold text-white">
                  ${(pkg.priceCents / 100).toFixed(2)}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-300">
                    <Zap className="w-4 h-4" />
                    <span>{pkg.goldAmount.toLocaleString()} Gold Coins</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-300">
                    <Gift className="w-4 h-4" />
                    <span>
                      +{pkg.sweepAmount.toLocaleString()} Sweep Coins FREE
                    </span>
                  </div>
                  {pkg.bonusPercentage > 0 && (
                    <div className="flex items-center gap-2 text-green-300 text-sm bg-green-900/30 px-2 py-1 rounded">
                      <Check className="w-4 h-4" />
                      <span>{pkg.bonusPercentage}% Bonus</span>
                    </div>
                  )}
                </div>

                <Button
                  className={
                    selectedPackage?.id === pkg.id
                      ? "w-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900"
                      : "w-full border-amber-400/50 text-amber-300"
                  }
                  variant={
                    selectedPackage?.id === pkg.id ? "default" : "outline"
                  }
                  disabled={processing}
                >
                  {selectedPackage?.id === pkg.id
                    ? "Selected ✓"
                    : "Select Package"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Section */}
        {selectedPackage && (
          <Card className="border-amber-400/40 bg-gradient-to-br from-amber-900/30 via-slate-800 to-slate-900/50 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-amber-300">
                Complete Your Purchase
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Summary */}
              <div className="bg-slate-900/50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-white">Order Summary</h3>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Package:</span>
                  <span className="text-white">{selectedPackage.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Gold Coins:</span>
                  <span className="text-amber-300">
                    {selectedPackage.goldAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    Free Sweep Coins Bonus:
                  </span>
                  <span className="text-purple-300">
                    +{selectedPackage.sweepAmount.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-slate-700 pt-3 flex justify-between font-bold">
                  <span className="text-white">Total:</span>
                  <span className="text-amber-300">
                    ${(selectedPackage.priceCents / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Card Input Placeholder */}
              <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-4">
                <p className="text-blue-300 text-sm mb-3">
                  <strong>Note:</strong> Card payment form would load here with
                  your Square Application ID configured.
                </p>
                <p className="text-slate-400 text-xs">
                  To enable: Set REACT_APP_SQUARE_APP_ID environment variable
                </p>
              </div>

              {/* Terms */}
              <div className="text-xs text-slate-400">
                <p>
                  By completing this purchase, you agree to our Terms of
                  Service. All sales are final. Coins never expire.
                </p>
              </div>

              {/* Purchase Button */}
              <Button
                onClick={() => handlePurchase(selectedPackage)}
                disabled={processing || !web}
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 font-semibold py-3 hover:from-amber-300 hover:to-yellow-300 disabled:opacity-50"
              >
                {processing
                  ? "Processing Payment..."
                  : `Pay $${(selectedPackage.priceCents / 100).toFixed(2)}`}
              </Button>

              {/* Cancel */}
              <Button
                onClick={() => setSelectedPackage(null)}
                variant="outline"
                className="w-full border-slate-600 text-slate-300"
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-blue-400/20 bg-blue-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-blue-300">Gold Coins</h3>
              </div>
              <p className="text-sm text-slate-300">
                Use Gold Coins to play premium games. No real money risk.
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-400/20 bg-purple-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Gift className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold text-purple-300">Sweep Coins</h3>
              </div>
              <p className="text-sm text-slate-300">
                Free with every purchase! Redeem for real prizes and rewards.
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-400/20 bg-green-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Check className="w-5 h-5 text-green-400" />
                <h3 className="font-semibold text-green-300">Safe & Secure</h3>
              </div>
              <p className="text-sm text-slate-300">
                Payments processed securely by Square. Your data is protected.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
