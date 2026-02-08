import { Header } from "@/components/header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export default function FAQ() {
  const faqs = [
    {
      question: "What are Gold Coins and Sweep Coins?",
      answer:
        "Gold Coins are used to play our premium casino games. Sweep Coins are earned when you win or purchase packages, and can be redeemed for prizes and rewards. Every Gold Coin purchase includes free Sweep Coins as a bonus!",
    },
    {
      question: "How do I purchase Gold Coins?",
      answer:
        "Visit the Coin Store in your Dashboard and select a package. We accept all major credit cards and payment methods through our secure Square payment processor. Your coins are instantly credited to your account.",
    },
    {
      question: "Can I refund my coins?",
      answer:
        "All coin purchases are final. However, you can use your coins to play games and earn Sweep Coins, which can be redeemed for prizes. Please review our Terms of Service for more information.",
    },
    {
      question: "How do I redeem Sweep Coins?",
      answer:
        "Once you have Sweep Coins, navigate to the Redeem section and submit a redemption request. Our team will review your request and process your redemption within 3-5 business days.",
    },
    {
      question: "What is KYC and why is it required?",
      answer:
        "KYC (Know Your Customer) is a standard industry requirement for sweepstakes platforms. It helps us verify your identity and prevent fraud. You'll be asked to provide basic information like your name and address.",
    },
    {
      question: "Are the games fair?",
      answer:
        "Yes! All our games use certified random number generators (RNG) and are regularly audited for fairness. Each game displays its RTP (Return to Player) percentage, which represents the long-term payout rate.",
    },
    {
      question: "Is there a minimum age requirement?",
      answer:
        "Yes, you must be at least 18 years old (or the legal age of majority in your jurisdiction) to use CrownPlay. We verify this during account creation.",
    },
    {
      question: "How do promotions and bonuses work?",
      answer:
        "We regularly offer promotions that provide extra coins or bonus percentages. Check the Promotions page for current offers. Bonus terms and conditions apply - see full details on each promotion.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), as well as other payment methods through Square. All transactions are secure and encrypted.",
    },
    {
      question: "Can I close my account?",
      answer:
        "Yes, you can request account closure from your Profile Settings. Any remaining Sweep Coins will be forfeited. We may request this for responsible gaming purposes.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-amber-300 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 text-lg">
            Find answers to common questions about CrownPlay
          </p>
        </div>

        {/* FAQs */}
        <Card className="border-slate-700/50 bg-slate-800/30">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-slate-700"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:bg-slate-800/50 transition">
                  <span className="text-white font-semibold">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-slate-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Contact Support */}
        <div className="mt-12 bg-blue-900/20 border border-blue-400/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Didn't find what you're looking for?
          </h2>
          <p className="text-blue-300 mb-6">
            Our support team is here to help! Contact us at
            support@crownplay.com
          </p>
          <a
            href="mailto:support@crownplay.com"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-blue-500 transition"
          >
            Send us an Email
          </a>
        </div>
      </main>
    </div>
  );
}
