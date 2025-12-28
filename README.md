# 🚀 TanStack Start Project Boilerplate

A modern and complete boilerplate for building full-stack web applications with TanStack Start, designed for an optimal developer experience and focusing on business features.

## ✨ Main Features

### 🔐 Authentication & Authorization & Profile

- **Complete Authentication** with email/password (Better Auth)
- **Provider Connection** (Google, GitHub) with OAuth
- **Full User Profile Management**:
  - Email modification with notification
  - Secure password change + email notification
  - Username update + email notification
  - Profile picture upload and management (S3/Tigris)
  - Account deletion + email notification
- **Password Reset System** with unique email code (1h expiration)
- **Protected Routes** and secure session management
- **Role Management** (Admin/User) with middleware
- **Multi-session support**: Manage multiple active sessions (Better Auth)
- **CSRF Protection** and data validation
- **Integrated Rate Limiting**

### 📧 Transactional Email System

- **Customizable Email Templates** with React Email
- **Automatic Emails**:
  - Welcome on signup
  - Password change confirmation
  - Email change notification
  - Username change notification
  - Account deletion confirmation
  - Verification codes for sensitive actions
- **Gmail SMTP Support** with app passwords

### 💳 Payment & Subscription System

- **Full Stripe Integration**:
  - Monthly and annual subscriptions
  - Webhooks for payment synchronization
  - Customer portal for subscription management
  - Transaction history
- **Plan Management** (Free/Pro) with restrictions
- **Subscription Upgrades/Downgrades**
- **Automatic Revenue Calculations** and MRR

### 📊 Complete Admin Dashboard

- **Responsive Sidebar** with intuitive navigation
- **Real-time Statistics**:
  - Total users
  - Pro subscribers
  - Total Revenue and MRR (Monthly Recurring Revenue)
  - Average Revenue Per User (ARPU)
  - Monthly/Annual subscription distribution
- **User Management**:
  - Table with dynamic pagination (TanStack Table)
  - Advanced filters (Admin, Subscription, Subscription Type)
  - Real-time username search
  - User role modification (Admin plugin)
  - Ban/Unban system with optional expiration
  - Bulk user deletion
- **Modern Interface** with loading states and animations

### 📁 Storage & Upload System

- **S3/Tigris Integration** for file storage
- **Profile Picture Upload** with:
  - Intuitive drag & drop
  - Real-time preview
  - Automatic compression and optimization
  - Secure deletion of old files
- **Pre-signed URLs** for secure uploads
- **Error Handling** and file type validation

### 🎨 Modern User Interface

- **Responsive Design** with Tailwind CSS
- **Reusable Components** with shadcn/ui:
  - Forms with validation (React Hook Form + Zod)
  - Elegant Toast notifications
  - Modals and dialogs
  - Badges and status indicators
  - Avatars with online/offline states
- **Dark/Light Theme** with generic theme provider
- **Fluid Animations** with Framer Motion
- **Loading States** and skeletons
- **User-friendly Error Handling**

### 🛡️ Security & Performance

- **Integrated XSS Protection**
- **API Rate Limiting**
- **Server and Client Validation** with Zod (TanStack Start Server Functions)
- **Optimized Security Headers**
- **Secure Sessions** with Better Auth
- **Route Protection Middleware**
- **Secure Password Hashing** (Argon2)
- **Centralized Error Handling**

## 🛠️ Tech Stack

### Frontend

- **TanStack Start** with TanStack Router
- **TypeScript** for type safety
- **React 19** with latest features
- **Tailwind CSS 4** for styling
- **shadcn/ui** for UI components
- **React Hook Form** + **Zod** for validation
- **TanStack Query** for server state management
- **Framer Motion** for animations
- **Lucide React** for icons
- **Better Auth Client** for frontend authentication
- **React Dropzone** for uploads
- **React Hot Toast** for notifications

### Backend & Database

- **TanStack Start Server Functions** for backend logic
- **Prisma ORM** with Neon adapter
- **PostgreSQL** as main database
- **Better Auth** for modern authentication
- **Argon2** for password hashing
- **Integrated Rate Limiting**

### External Services

- **Stripe** for payments and subscriptions
- **AWS S3/Tigris** for file storage
- **Gmail SMTP** for sending emails
- **React Email** for email templates
- **OAuth** (Google, GitHub) for social auth

### Developer Tools

- **ESLint** for code quality
- **Vitest** for testing
- **Docker** for containerization
- **Prisma Studio** for database management

## 📦 Installation

### Prerequisites

- Node.js 18+ (or Bun)
- PostgreSQL
- Stripe Account
- Gmail Account

### Initial Configuration

1. **Clone and install**

```bash
git clone [your-repo]
cd [project-name]
bun install # Recommended
# or npm install
```

2. **Environment Variable Configuration**

```bash
cp .env.example .env
```

3. **Required Environment Variables**

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"

# Auth
AUTH_SECRET="your-secret"
BETTER_AUTH_URL="http://localhost:3000" # Updated for Better Auth

# Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Email
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="app-password"
# OR
RESEND_API_KEY=""

# Stripe
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
STRIPE_PRICE_ID=""

# App
VITE_APP_URL="http://localhost:3000"
```

### Database Configuration

1. **Initialize Prisma**

```bash
bunx prisma generate
bunx prisma db push
```

### Service Configuration

#### 1. Stripe

- Create a Stripe account
- Configure a subscription product
- Note the PRICE_ID
- Configure the webhook (URL: `/api/webhooks/stripe`)

#### 2. Email

**Gmail Option:**

- Enable 2FA
- Generate an App Password

#### 3. Tigris Storage (S3)

**Required configuration for file upload:**

1. **Create Tigris Account**
   - Go to [fly.io/docs/reference/tigris/](https://fly.io/docs/reference/tigris/)
   - Create an account and bucket

2. **Get API Keys**
   - In Tigris dashboard, go to "Access Keys"
   - Create new access key
   - Note `Access Key ID` and `Secret Access Key`

3. **⚠️ MANDATORY CORS Configuration**

   ```json
   {
     "CORSRules": [
       {
         "AllowedOrigins": ["http://localhost:3000", "https://your-domain.com"],
         "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
         "AllowedHeaders": ["*"],
         "MaxAgeSeconds": 3000
       }
     ]
   }
   ```

   **Without this CORS config, uploads will not work!**

4. **Tigris Environment Variables**
   ```env
   AWS_ACCESS_KEY_ID="your-access-key-id"
   AWS_SECRET_ACCESS_KEY="your-secret-access-key"
   AWS_REGION="auto"
   AWS_ENDPOINT_URL_S3="https://fly.storage.tigris.dev"
   S3_BUCKET_NAME="your-bucket-name"
   ```

## Start

1. **Development**

```bash
bun dev
```

2. **Stripe Webhook (Development)**

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Customization

### Modifying Email Templates

Templates are in `emails/` (check project structure).

```tsx
// Example modification
<Text>Customize your message here</Text>
```

### Adding Subscription Plans

1. Create plan in Stripe
2. Add plan in `prisma/schema.prisma`
3. Update UI components

### Adding Stripe Products

1. Go to Stripe Dashboard -> Product Catalog
2. Click Create Product
3. Copy Product/Price ID
4. Add to `.env` (e.g., `STRIPE_MONTHLY_PRICE_ID`)
5. Use `process.env.STRIPE_MONTHLY_PRICE_ID` in code

## Documentation

For more details, check:

- [TanStack Start](https://tanstack.com/start/latest)
- [Better Auth](https://better-auth.com/)
- [Prisma](https://www.prisma.io/docs/)
- [Stripe](https://stripe.com/docs)

## Support

For any questions:

1. Check GitHub issues
2. Create a new issue
3. Check package documentation

## 📝 License

MIT
