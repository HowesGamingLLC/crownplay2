import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-300 mb-2">
            Terms of Service
          </h1>
          <p className="text-slate-400">Last updated: January 2024</p>
        </div>

        {/* Content */}
        <Card className="border-slate-700/50 bg-slate-800/30">
          <CardContent className="space-y-6 pt-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
              <p className="text-slate-300">
                By accessing and using CrownPlay, you agree to be bound by these
                Terms of Service. If you do not agree to these terms, do not use
                our service. We reserve the right to modify these terms at any
                time, and your continued use constitutes acceptance of changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">
                2. Eligibility
              </h2>
              <p className="text-slate-300">
                You must be at least 18 years of age (or the legal age of majority
                in your jurisdiction) to use CrownPlay. By using our service, you
                represent and warrant that you meet these eligibility requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. Account Responsibility</h2>
              <p className="text-slate-300">
                You are responsible for maintaining the confidentiality of your
                account credentials and password. You agree to accept responsibility
                for all activities that occur under your account. Notify us
                immediately of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Coin Purchases</h2>
              <ul className="text-slate-300 space-y-2 list-disc list-inside">
                <li>All coin purchases are final and non-refundable</li>
                <li>Coins do not expire and maintain their value indefinitely</li>
                <li>We reserve the right to adjust coin values or availability</li>
                <li>Promotional bonuses are subject to specific terms and conditions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. Fair Play and Games</h2>
              <p className="text-slate-300">
                All games use certified random number generators and are regularly
                audited. The RTP (Return to Player) percentage for each game is
                displayed and represents the long-term expected payout. CrownPlay
                prohibits cheating, collusion, and fraudulent activity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Responsible Gaming</h2>
              <p className="text-slate-300 mb-3">
                CrownPlay is committed to responsible gaming. We encourage players to:
              </p>
              <ul className="text-slate-300 space-y-2 list-disc list-inside">
                <li>Set spending limits and stick to them</li>
                <li>Take regular breaks from gaming</li>
                <li>Never chase losses</li>
                <li>Use the self-exclusion feature if needed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. Limitation of Liability</h2>
              <p className="text-slate-300">
                CrownPlay is provided "as is" without warranties. We are not liable
                for any indirect, incidental, or consequential damages arising from
                your use of our service. Your remedy is limited to the amount paid
                through our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. Termination</h2>
              <p className="text-slate-300">
                We reserve the right to terminate or suspend your account for
                violations of these terms, illegal activity, or for any reason at
                our discretion. Upon termination, your right to use the service
                immediately ceases.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">9. Governing Law</h2>
              <p className="text-slate-300">
                These Terms are governed by and construed in accordance with the
                laws of the jurisdiction in which CrownPlay operates, and you
                irrevocably submit to the exclusive jurisdiction of the courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">10. Contact Us</h2>
              <p className="text-slate-300">
                If you have questions about these Terms, please contact us at
                legal@crownplay.com or by mail at the address provided in our
                Privacy Policy.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
