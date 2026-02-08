import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      await signup(email, password, name);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-400/40">
              <span className="text-3xl">👑</span>
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200 mb-2">
              CrownPlay
            </h1>
            <p className="text-slate-400">Create your account and start playing</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-slate-300 mb-2 block">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-900/50 border-amber-400/30 text-white placeholder:text-slate-500"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-slate-300 mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-900/50 border-amber-400/30 text-white placeholder:text-slate-500"
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-slate-300 mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-900/50 border-amber-400/30 text-white placeholder:text-slate-500"
              />
              <p className="text-xs text-slate-400 mt-1">
                Min. 8 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-slate-300 mb-2 block"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-slate-900/50 border-amber-400/30 text-white placeholder:text-slate-500"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) =>
                  setAgreeTerms(checked === true)
                }
                className="mt-1 border-amber-400/50 bg-slate-900/50"
              />
              <label htmlFor="terms" className="text-sm text-slate-400 leading-tight">
                I agree to the{" "}
                <Link to="/terms" className="text-amber-400 hover:text-amber-300">
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link
                  to="/privacy"
                  className="text-amber-400 hover:text-amber-300"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 font-semibold py-3 rounded-lg hover:from-amber-300 hover:to-yellow-300 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-amber-400/40 disabled:opacity-50 mt-6"
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800/50 text-slate-400">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link to="/login">
            <Button
              variant="outline"
              className="w-full border-amber-400/30 text-amber-300 hover:bg-amber-400/10"
            >
              Sign In Instead
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-400 text-xs mt-6">
          We respect your privacy. Your information is secure and never shared.
        </p>
      </div>
    </div>
  );
}
