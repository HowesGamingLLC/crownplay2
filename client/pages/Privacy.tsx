import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-300 mb-2">
            Privacy Policy
          </h1>
          <p className="text-slate-400">Last updated: January 2024</p>
        </div>

        {/* Content */}
        <Card className="border-slate-700/50 bg-slate-800/30">
          <CardContent className="space-y-6 pt-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">1. Information We Collect</h2>
              <p className="text-slate-300 mb-3">
                We collect information you provide directly to us, including:
              </p>
              <ul className="text-slate-300 space-y-2 list-disc list-inside">
                <li>Account information (email, password, name)</li>
                <li>
                  Profile information (date of birth, address, phone number)
                </li>
                <li>Payment information (processed securely by Square)</li>
                <li>KYC information for compliance and verification</li>
                <li>
                  Gaming activity and transaction history
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">2. How We Use Your Information</h2>
              <ul className="text-slate-300 space-y-2 list-disc list-inside">
                <li>To create and maintain your account</li>
                <li>To process payments and transactions</li>
                <li>To comply with legal obligations (KYC/AML)</li>
                <li>To prevent fraud and ensure security</li>
                <li>To improve our services and user experience</li>
                <li>To send you updates about your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. Data Security</h2>
              <p className="text-slate-300">
                We use industry-standard encryption (SSL/TLS) to protect your
                information during transmission. Your passwords are hashed using
                bcryptjs. Payment information is processed through PCI-DSS compliant
                providers. However, no method of transmission over the internet is
                100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Data Sharing</h2>
              <p className="text-slate-300">
                We do not sell or share your personal information with third parties
                for marketing purposes. We may share information with:
              </p>
              <ul className="text-slate-300 space-y-2 list-disc list-inside">
                <li>Payment processors (Square) for payment processing</li>
                <li>
                  KYC providers for identity verification
                </li>
                <li>Legal authorities when required by law</li>
                <li>Service providers under strict confidentiality agreements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. Your Rights</h2>
              <p className="text-slate-300">
                You have the right to:
              </p>
              <ul className="text-slate-300 space-y-2 list-disc list-inside">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of communications</li>
                <li>Request a data portability report</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Cookies and Tracking</h2>
              <p className="text-slate-300">
                We use cookies to maintain your session and improve your experience.
                You can control cookie settings through your browser. We do not use
                tracking pixels for advertising purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. Data Retention</h2>
              <p className="text-slate-300">
                We retain your information for as long as your account is active.
                Transaction records are kept for regulatory compliance (typically
                5-7 years). You can request data deletion subject to legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. Children's Privacy</h2>
              <p className="text-slate-300">
                CrownPlay is not intended for children under 18. We do not knowingly
                collect information from children. If we learn we have collected
                information from a child, we will delete it immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">9. Policy Changes</h2>
              <p className="text-slate-300">
                We may update this Privacy Policy periodically. We will notify you
                of material changes via email or prominent notice on our website.
                Your continued use constitutes acceptance of changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">10. Contact Us</h2>
              <p className="text-slate-300">
                For privacy-related questions, contact us at privacy@crownplay.com
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
