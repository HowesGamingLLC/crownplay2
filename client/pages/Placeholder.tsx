import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description?: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-amber-400/40">
            <Zap className="w-10 h-10 text-slate-900" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h1>

          <p className="text-lg text-slate-400 max-w-2xl mb-8">
            {description ||
              "This page is coming soon! We're building an amazing feature for you. Check back soon!"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/">
              <Button className="gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 hover:from-amber-300 hover:to-yellow-300">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="outline"
                className="border-amber-400/30 text-amber-300 hover:bg-amber-400/10"
              >
                Go to Dashboard
              </Button>
            </Link>
          </div>

          <div className="mt-16 p-8 bg-slate-800/50 border border-amber-400/20 rounded-2xl max-w-md">
            <h3 className="text-amber-300 font-semibold mb-3">
              Want to help us build this?
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              We're constantly improving CrownPlay. If you have suggestions for
              this page, let us know!
            </p>
            <a
              href="mailto:feedback@crownplay.com"
              className="text-amber-400 hover:text-amber-300 text-sm font-medium"
            >
              Send us your feedback →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
