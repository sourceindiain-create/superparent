# Kids World (Super Parent Gurukul) - Fullstack Deployment Guide

This fullstack application features a high-performance **React 19 + Vite frontend** coupled with an **Express.js backend**, integrated with **Google Cloud Firestore Database** (`kidsworld`), **Google Cloud Run**, and ready for **Vercel** and **Firebase Hosting**.

Repository Name: `kids-world` (Secondary: `superparent-studio`)

---

## 🚀 1. Live Public URLs

- **Primary Cloud Run Live URL**:  
  [https://ais-pre-6h3ojl2oh67dewvc67wqfx-682266057961.asia-east1.run.app](https://ais-pre-6h3ojl2oh67dewvc67wqfx-682266057961.asia-east1.run.app)

- **Target Vercel Live Fullstack Domain**:  
  `https://kids-world.vercel.app`

- **Firebase Hosting Note**:  
  The default `studio-6989353372-64cd3.web.app` domain hosts a separate women-care project (WOMENE). To deploy SuperParent to Firebase Hosting, run `firebase deploy --only hosting` to update the site or create a dedicated site target `kids-world.web.app`.

- **Target Vercel Domain**:  
  `https://kids-world.vercel.app`

- **Visual Storytelling Integration**:  
  [https://storytribeapp.com](https://storytribeapp.com)

---

## ⚡ 2. Deploying to Vercel (One-Click / CLI)

The project includes pre-configured `vercel.json` and `api/index.ts` serverless handler.

### Option A: Using Vercel CLI
```bash
# 1. Install Vercel CLI (if not installed)
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy fullstack
vercel --prod
```

### Option B: Deploy from GitHub
1. Create a GitHub repo named **`kids-world`**.
2. Push this codebase to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: Kids World fullstack app with sequenced menus and backend"
   git branch -M main
   git remote add origin https://github.com/<your-username>/kids-world.git
   git push -u origin main
   ```
3. Import the repository into your Vercel Dashboard. Vercel automatically detects the Vite build and `api/index.ts` serverless function.

---

## 🔥 3. Deploying to Firebase Hosting

```bash
# 1. Build the production bundle
npm run build

# 2. Deploy hosting & firestore rules
firebase deploy --only hosting,firestore:rules
```

---

## 🛠️ 4. Fullstack Backend API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/kids-world/overview` | GET | Ecosystem metadata, repo name, database status, and deployment links |
| `/api/kids-world/services` | GET | All 25 sequenced services and module metadata |
| `/api/kids-world/stats` | GET | Real-time statistics, active students, and uptime |
| `/api/homework-ocr-solve` | POST | Google Lens OCR & Multi-modal homework solver |
| `/api/ask-super-ai` | POST | Multi-persona AI tutor, robotics mentor & psychologist |
| `/api/health` | GET | System health and uptime diagnostics |
