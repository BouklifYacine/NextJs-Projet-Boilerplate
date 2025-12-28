# Features Product Map

> [!NOTE]
> This document tracks the **State of the Product**. ALL features must be listed here.
> Statuses: 🔴 Planned | 🟡 In Progress | 🟢 Done | 🔵 Verify (Needs Testing)

## 🔐 Authentication & Security

**Status**: 🟢 Done

- [x] Email/Password Login & Register (Better Auth)
- [x] Social Providers:
  - [x] GitHub
  - [x] Google
- [x] Route Protection (`beforeLoad`) middleware
- [x] Multi-session Support (up to 3 concurrent sessions)
- [x] Forgot Password Flow (Email OTP)
- [x] Rate Limiting (100 requests / 10s window)
- [x] Secure Sessions (HttpOnly cookies)

## 👤 User Profile

**Status**: 🟢 Done

- [x] Profile Dashboard Layout
- [x] Edit Personal Details (Name, Username)
- [x] Account Security:
  - [x] Email Change (with verification)
  - [x] Password Change
- [x] Account Management:
  - [x] Account Deletion
- [x] Avatar Management:
  - [x] Image Upload (Drag & Drop)
  - [x] S3/Tigris Storage integration
  - [x] Image Optimization & Deletion

## 📊 Admin Dashboard

**Status**: 🟢 Done

- [x] User Management Table (TanStack Table)
- [x] Filtering & Search:
  - [x] Search by Username
  - [x] Filter by Role/Subscription
- [x] Moderation Tools:
  - [x] Ban/Unban System (with expiration)
  - [x] Role Modification (Admin/User)
  - [x] Bulk Delete Users
- [x] Statistics Overview:
  - [x] Total Users / Revenue / MRR
  - [x] Subscription Distribution
- [x] Sidebar Navigation (Mobile Responsive)

## 💳 Billing & Subscriptions (Stripe)

**Status**: 🟡 In Progress

- [x] Pricing Page (Landing Page component)
- [x] Webhook System:
  - [x] Checkout Session Completed handler
  - [x] Subscription Updated handler
  - [x] Subscription Deleted/Canceled handler
- [ ] Stripe Customer Portal
- [ ] Subscription Tiers logic (Free/Pro/Enterprise)

## 📧 Transactional Emails (Resend/SMTP)

**Status**: 🟢 Done

- [x] React Email Templates:
  - [x] Welcome Email
  - [x] Password Reset Code
  - [x] Email Change Verification
  - [x] Password Change Notification
  - [x] Account Deletion Confirmation
  - [x] Subscription Confirmation
- [x] Resend / SMTP Integration

## 📁 Storage & Media

**Status**: 🟢 Done

- [x] S3/Tigris Integration
- [x] Presigned URLs for Secure Uploads
- [x] Metadata Management
- [x] Automatic Cleanup of orphan files

## 🛠️ Infrastructure & DX

**Status**: 🟢 Done

- [x] TanStack Start (Single-file server functions)
- [x] Prisma ORM (PostgreSQL)
- [x] Dockerization (Dockerfile.dev, docker-compose)
- [x] Tailwind CSS 4 Integration
- [x] Shadcn/UI Component Library
- [ ] Unit Testing (Vitest scaffolded)
