# 🚀 Netlify Deployment Guide — SUPER PARENT Gurukul

This project is pre-configured with **Netlify Serverless Functions** + **React Vite SPA** so that the entire full-stack application (frontend + backend APIs) runs seamlessly on Netlify with zero server maintenance.

---

## ⚡ Quick Deployment (Step-by-Step)

### Option 1: Deploy via GitHub (Recommended)
1. **Push your code to GitHub**:
   - In Google AI Studio, click the **Export to GitHub** or download as ZIP and push to your GitHub repo.
2. **Log in to Netlify**:
   - Go to [https://app.netlify.com/](https://app.netlify.com/).
3. **Add New Site**:
   - Click **"Add new site"** > **"Import an existing project"** > Choose **GitHub**.
   - Select your repository.
4. **Build & Deploy Configuration** (Auto-detected via `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`
5. **Environment Variables**:
   - Under **Site configuration** > **Environment variables**, add:
     - `GEMINI_API_KEY`: *(Your Google AI Studio Gemini API Key)*
     - `NODE_VERSION`: `20`
6. **Click "Deploy Site"**:
   - Netlify will build your React frontend and package the Express backend into `/.netlify/functions/api`.

---

### Option 2: Deploy via Netlify CLI

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login to your Netlify account
netlify login

# 3. Initialize and link site
netlify init

# 4. Deploy to production
netlify deploy --prod --build
```

---

## 🛠️ Architecture on Netlify

- **Frontend**: High-speed CDN serving React 19 + Tailwind CSS from `/dist`.
- **Backend API**: All `/api/*` routes (Auth, OTP, Admin Verification, AI Multi-Experts, Payment Verification, Diagnostics) are automatically routed through `netlify/functions/api.ts` using `serverless-http`.
- **SPA Fallback**: Configured via `netlify.toml` and `public/_redirects` to route all page paths to `index.html`.

---

## 🔑 Key API Routes Supported

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/auth/otp/send` | POST | Sends 6-digit OTP for Mobile Login |
| `/api/auth/otp/verify` | POST | Verifies OTP and activates user |
| `/api/auth/admin/login` | POST | Admin login authentication |
| `/api/payment/verify-and-activate` | POST | Payment verification and software unlock |
| `/api/ask-super-ai` | POST | Multi-persona Gemini AI engine |
| `/api/test/run-all-checks` | POST | 100% Platform Diagnostics Suite |
| `/api/health` | GET | Server health status |
