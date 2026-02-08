# CrownPlay - Sweepstakes Casino MVP

A production-ready full-stack sweepstakes casino application featuring player gaming, dual currency system (Gold Coins and Sweep Coins), and a comprehensive admin panel.

## Tech Stack

- **Frontend**: React 18 + React Router 6 + TypeScript + Vite + TailwindCSS
- **Backend**: Express.js + Node.js + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT-based authentication with bcryptjs password hashing
- **Package Manager**: pnpm

## Features

### Player Features

- ✅ User authentication (signup, login, logout)
- ✅ Dual wallet system (Gold Coins + Sweep Coins)
- ✅ Coin package purchases
- ✅ Sweep coin redemption requests
- ✅ Transaction history
- ✅ Profile management
- ✅ Game library browsing
- ✅ Active promotions
- ✅ KYC status tracking

### Admin Features

- ✅ Dashboard with KPIs (users, coins, redemptions)
- ✅ User management (view, search, lock/unlock)
- ✅ Balance adjustment with audit logging
- ✅ Transaction management
- ✅ Redemption request management
- ✅ Coin package CRUD
- ✅ Promotion CRUD
- ✅ Content management (FAQ, Terms, Privacy)

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- Docker (optional, for running PostgreSQL)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Database

**Option A: Using Docker Compose**

```bash
docker-compose up -d
```

**Option B: Manual PostgreSQL Setup**
Create a PostgreSQL database named `crownplay_db` with user `postgres` and password `postgres`.

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and update as needed:

```bash
cp .env.example .env
```

Key variables:

- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens (change in production)
- `APP_URL`: Frontend URL (default: http://localhost:5173)

### 4. Initialize Database

Run migrations and seed with demo data:

```bash
pnpm run db:migrate
pnpm run db:seed
```

Or in one command:

```bash
pnpm run db:setup
```

### 5. Start Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

## Development Commands

```bash
# Start dev server (both frontend and backend)
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Type check
pnpm typecheck

# Database commands
pnpm db:migrate       # Run pending migrations
pnpm db:migrate:dev   # Create and run new migration
pnpm db:seed         # Run seed script
pnpm db:studio       # Open Prisma Studio GUI

# Format code
pnpm format.fix
```

## Default Credentials

### Admin Account

- Email: `coinkrazy26@gmail.com`
- Password: `admin123`

### Demo Player Accounts

- Email: `player1@example.com` / Password: `password123`
- Email: `player2@example.com` / Password: `password123`
- Email: `player3@example.com` / Password: `password123`

## Project Structure

```
├── client/                   # React frontend
│   ├── pages/               # Route pages
│   ├── components/          # Reusable components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities
│   ├── App.tsx             # Router configuration
│   └── global.css          # TailwindCSS theme
├── server/                  # Express backend
│   ├── routes/             # API endpoints
│   ├── lib/                # Server utilities
│   └── index.ts            # Server setup
├── prisma/                  # Database schema
│   ├── schema.prisma       # Data models
│   └── seed.ts             # Seed script
├── shared/                  # Shared types
└── README.md               # This file
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new account
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout (client-side)
- `GET /api/auth/me` - Get current user info

### Player Routes (Protected)

- `GET /api/player/transactions` - Get user transactions
- `POST /api/player/purchase` - Purchase coin package
- `POST /api/player/redemption/request` - Request sweep coin redemption
- `GET /api/player/redemptions` - Get redemption requests

### Public Routes

- `GET /api/games` - List active games
- `GET /api/promotions` - List active promotions
- `GET /api/packages` - List coin packages

### Admin Routes (Protected + Admin role required)

- `GET /api/admin/dashboard/kpis` - Dashboard statistics
- `GET /api/admin/users` - List users with search/pagination
- `PATCH /api/admin/users/:userId/balance` - Update user balance
- `PATCH /api/admin/users/:userId/status` - Lock/unlock user
- `GET /api/admin/transactions` - List all transactions
- `GET /api/admin/redemptions` - List redemption requests
- `PATCH /api/admin/redemptions/:redemptionId` - Update redemption status

## Database Models

### User

- id, email, passwordHash, role, status
- Relations: Profile, Wallet, Transactions, RedemptionRequests

### Profile

- userId, name, dob, address, city, state, postal code, country
- kycStatus: UNVERIFIED, PENDING, VERIFIED, REJECTED

### Wallet

- userId, goldCoins, sweepCoins

### Transaction

- id, userId, type (PURCHASE, REDEMPTION, BONUS, ADJUSTMENT, GAME_RESULT)
- amount, currencyType (GOLD, SWEEP), metadata

### RedemptionRequest

- id, userId, amount, status (PENDING, APPROVED, REJECTED, COMPLETED)

### Package

- id, name, description, priceCents, goldAmount, sweepAmount
- bonusPercentage, isActive

### Promotion

- id, name, code, bonusType, bonusValue, startAt, endAt
- maxUses, currentUses, isActive

### Game

- id, name, description, thumbnail
- minWager, maxWager, rtp (Return to Player %), isActive

### AuditLog

- id, adminId, action, targetType, targetId, metadata

## Security Considerations

1. **Passwords**: Hashed with bcryptjs (10 salt rounds)
2. **JWT**: 7-day expiry, stored in localStorage
3. **CORS**: Configured for development
4. **Validation**: Zod schema validation on all inputs
5. **Authorization**: Role-based access control for admin routes
6. **Audit Logging**: All admin actions logged for compliance

## Deployment

### Prerequisites for Production

1. Set strong `JWT_SECRET` environment variable
2. Update database connection string to production database
3. Set `NODE_ENV=production`
4. Configure CORS origins appropriately
5. Enable HTTPS

### Build

```bash
pnpm build
```

### Run Production

```bash
pnpm start
```

### Docker Deployment

```bash
docker build -t crownplay .
docker run -p 3000:3000 crownplay
```

## Testing

Basic unit tests are included for core services:

```bash
pnpm test
```

## Monitoring & Logging

- Server logs all API errors and important events
- Audit logs track all admin actions
- Transaction history provides complete player activity trail

## Support

For issues or questions:

- Email: support@crownplay.com
- Check FAQ at `/faq` on the app

## License

Proprietary - CrownPlay 2024

## Next Steps for Production

1. **Payment Integration**: Integrate real payment processor (Stripe, etc.)
2. **Email Notifications**: Configure email service for verification and notifications
3. **KYC Verification**: Integrate real KYC provider
4. **Analytics**: Add user analytics and game performance tracking
5. **Responsible Gaming**: Add self-exclusion and spending limits
6. **Legal Compliance**: Ensure compliance with local gaming regulations
7. **Content Security**: Add CSP headers and security best practices
8. **Performance**: Add caching, CDN, and database optimization
9. **Mobile**: Develop native mobile apps
10. **Support System**: Implement customer support ticketing

---

Built with ❤️ for a premium gaming experience
