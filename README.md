# SUPER PARENT — SaaS Dashboard & All-in-One Gurukul LMS

**SUPER PARENT** is a complete Gurukul Learning Ecosystem and SaaS platform for Students (LKG to 10th Class), Parents, and Administrators.

---

## 🌟 Key Upgrades in SaaS Dashboard V2

1. **Professional Left-Sidebar SaaS Layout (`SoftwareShell.tsx`)**:
   - High-contrast, icon-based navigation with grouping across Core Workspaces, Learning & Practice, Culture & Innovation, and Analytics & Ecosystem.
   - Quick command search (`⌘K`) and collapsible sidebar.
   - Live Status Bar: Streak Days Counter, Gurukul XP Points, Super AI quick launcher, Theme Selector palette, and user profile management.

2. **Workspace Switcher**:
   - 👨‍👩‍👧 **Parent Workspace**: Growth map, parenting master guides, talent marketplace approvals, and family settings.
   - 👦 **Student Workspace**: LKG–10th lessons, practice master quizzes, 700 Bhagavad Gita shlokas with audio, Chandamama stories, and robotics projects.
   - 🛡️ **Admin Workspace**: Centralized system management for Users, Payments, Plans, Courses, Audit Logs, and Diagnostics.

3. **Secure Payment & Subscription Lifecycle**:
   - **Pricing → Login/OTP → Select Plan → Payment Gateway → Razorpay Verification → Subscription Activated → Full Access**.
   - Server-side cryptographic HMAC SHA-256 signature verification (`/api/razorpay/verify-payment`) ensuring tokens are never faked on the client.
   - Flexible Gurukul fee tiers: **Kids Mode (₹600)**, **Parent Mode (₹1,000)**, and **Super Parent VIP (₹1,500)** with verified coupon codes (`SUPER600`, `PARENT1000`, `SUPER1500`).

4. **Production Security & Environment Variables**:
   - `ADMIN_ID` and `ADMIN_PASSWORD` stored securely in backend environment variables.
   - Production flags `DEMO_MODE=false` and `SYSTEM_MASTER_ACCESS=false` for strict production deployments.

5. **Culture & Heritage Hub (`StoriesHub.tsx`)**:
   - Bilingual support (Telugu & English).
   - Chandamama & Balamitra archives, Andhra Pradesh cultural heritage video galleries, Dasubhashitham audiobook links, and free digital library access.

---

## 🚀 Environment Configuration (`.env`)

Configure the following environment variables in `.env` or in your Cloud Run / Hosting environment:

```env
# Gemini AI Multi-Expert Secret Key
GEMINI_API_KEY=your_gemini_api_key_here

# Razorpay Payment Gateway Credentials
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Admin Protected Credentials
ADMIN_ID=admin
ADMIN_PASSWORD=your_secure_admin_password

# System Security & Demo Flags (Set to false for strict live mode)
DEMO_MODE=false
SYSTEM_MASTER_ACCESS=false

# App URL
APP_URL=https://superparent.in
```

---

## 🛠️ Development & Production Commands

- **Start Development Server**:
  ```bash
  npm run dev
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```
- **Start Production Server**:
  ```bash
  npm start
  ```

---

## 🛡️ Admin Login Credentials

- **Default Route**: Switch workspace to **Admin Workspace** or go to Login → **Admin Login** tab.
- **Default ID**: Set via `ADMIN_ID` in `.env` (default: `admin`)
- **Default Password**: Set via `ADMIN_PASSWORD` in `.env` (default: `admin123`)
