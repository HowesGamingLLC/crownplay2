import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../server/lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  // Create or update admin user
  const adminEmail = process.env.ADMIN_EMAIL || "coinkrazy26@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  const passwordHash = await hashPassword(adminPassword);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
    },
    create: {
      email: adminEmail,
      passwordHash,
      role: "ADMIN",
      profile: {
        create: {
          name: "Admin User",
        },
      },
      wallet: {
        create: {
          goldCoins: 100000n,
          sweepCoins: 50000n,
        },
      },
    },
    include: {
      profile: true,
      wallet: true,
    },
  });

  console.log(`✓ Admin user created/updated: ${admin.email}`);

  // Create demo players
  const players = [
    {
      email: "player1@example.com",
      name: "John Doe",
      goldCoins: 10000n,
      sweepCoins: 5000n,
    },
    {
      email: "player2@example.com",
      name: "Jane Smith",
      goldCoins: 15000n,
      sweepCoins: 8000n,
    },
    {
      email: "player3@example.com",
      name: "Bob Johnson",
      goldCoins: 8000n,
      sweepCoins: 3000n,
    },
  ];

  for (const player of players) {
    const hash = await hashPassword("password123");
    await prisma.user.upsert({
      where: { email: player.email },
      update: {},
      create: {
        email: player.email,
        passwordHash: hash,
        role: "PLAYER",
        profile: {
          create: {
            name: player.name,
            kycStatus: "VERIFIED",
          },
        },
        wallet: {
          create: {
            goldCoins: player.goldCoins,
            sweepCoins: player.sweepCoins,
          },
        },
      },
    });
  }

  console.log(`✓ ${players.length} demo players created`);

  // Create coin packages
  const packages = [
    {
      name: "Bronze Pack",
      description: "Perfect for casual players",
      priceCents: 999, // $9.99
      goldAmount: 1000n,
      sweepAmount: 500n,
      bonusPercentage: 10,
    },
    {
      name: "Silver Pack",
      description: "Great value package",
      priceCents: 2499, // $24.99
      goldAmount: 3000n,
      sweepAmount: 1500n,
      bonusPercentage: 15,
    },
    {
      name: "Gold Pack",
      description: "Best value for high spenders",
      priceCents: 4999, // $49.99
      goldAmount: 7000n,
      sweepAmount: 3500n,
      bonusPercentage: 20,
    },
    {
      name: "Platinum Pack",
      description: "Ultimate player package",
      priceCents: 9999, // $99.99
      goldAmount: 15000n,
      sweepAmount: 7500n,
      bonusPercentage: 25,
    },
  ];

  for (const pkg of packages) {
    await prisma.package.upsert({
      where: { name: pkg.name },
      update: {},
      create: pkg,
    });
  }

  console.log(`✓ ${packages.length} coin packages created`);

  // Create promotions
  const now = new Date();
  const promotions = [
    {
      name: "Welcome Bonus",
      code: "WELCOME100",
      description: "Get 100 free sweep coins on signup",
      bonusType: "SWEEP_COINS" as const,
      bonusValue: 100n,
      startAt: now,
      endAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days
      maxUses: 1000,
    },
    {
      name: "25% Bonus",
      code: "BONUS25",
      description: "Get 25% bonus on your next purchase",
      bonusType: "PERCENTAGE" as const,
      bonusValue: 25n,
      startAt: now,
      endAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days
      maxUses: null,
    },
    {
      name: "Weekend Bonus",
      code: "WEEKEND50",
      description: "50 gold coins on weekends",
      bonusType: "GOLD_COINS" as const,
      bonusValue: 50n,
      startAt: now,
      endAt: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000), // 1 year
      maxUses: null,
    },
  ];

  for (const promo of promotions) {
    await prisma.promotion.upsert({
      where: { code: promo.code },
      update: {},
      create: promo,
    });
  }

  console.log(`✓ ${promotions.length} promotions created`);

  // Create games
  const games = [
    {
      name: "Diamond Rush",
      description: "Chase the diamonds and win big",
      thumbnail: "/games/diamond-rush.jpg",
      minWager: 10n,
      maxWager: 1000n,
      rtp: 96.5,
    },
    {
      name: "Lucky Sevens",
      description: "Classic slot with lucky sevens",
      thumbnail: "/games/lucky-sevens.jpg",
      minWager: 5n,
      maxWager: 500n,
      rtp: 95.0,
    },
    {
      name: "Mystical Runes",
      description: "Unlock ancient mysteries",
      thumbnail: "/games/mystical-runes.jpg",
      minWager: 10n,
      maxWager: 1000n,
      rtp: 97.0,
    },
    {
      name: "Gold Digger",
      description: "Dig for gold and treasure",
      thumbnail: "/games/gold-digger.jpg",
      minWager: 5n,
      maxWager: 500n,
      rtp: 94.5,
    },
  ];

  for (const game of games) {
    await prisma.game.upsert({
      where: { name: game.name },
      update: {},
      create: game,
    });
  }

  console.log(`✓ ${games.length} games created`);

  // Create content blocks
  const contentBlocks = [
    {
      key: "homepage_hero_title",
      title: "Hero Title",
      body: "Play Premium Casino Games & Win Real Prizes",
    },
    {
      key: "homepage_hero_subtitle",
      title: "Hero Subtitle",
      body:
        "Experience the thrill of crown-classic sweepstakes casino gaming with Gold Coins and Sweep Coins",
    },
    {
      key: "faq_how_to_play",
      title: "How to Play",
      body:
        "Create an account, purchase Gold Coins, and start playing your favorite games. Win Sweep Coins to redeem for prizes!",
    },
    {
      key: "terms_section",
      title: "Terms of Service",
      body:
        "By using CrownPlay, you agree to our terms and conditions. Players must be 18+ or the legal age of majority in their jurisdiction.",
    },
    {
      key: "privacy_section",
      title: "Privacy Policy",
      body:
        "We respect your privacy. Your personal information is encrypted and never shared with third parties.",
    },
  ];

  for (const block of contentBlocks) {
    await prisma.contentBlock.upsert({
      where: { key: block.key },
      update: {},
      create: block,
    });
  }

  console.log(`✓ ${contentBlocks.length} content blocks created`);

  console.log("\n✅ Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
