# 🚀 Firebase Hosting Setup with Cloud Run Rewrite

Here is how you can connect your existing Cloud Run service or static build to **Firebase Hosting** to get a clean `*.web.app` and `*.firebaseapp.com` domain.

---

## 📋 Your Exact Identifiers

- **Cloud Run URL**: `https://ais-pre-6h3ojl2oh67dewvc67wqfx-682266057961.asia-east1.run.app`
- **Cloud Run Service ID**: `ais-pre-6h3ojl2oh67dewvc67wqfx`
- **Cloud Run Region**: `asia-east1`
- **Google Cloud Project Number**: `682266057961`
- **Connected Firebase Project ID**: `studio-6989353372-64cd3` *(or your custom Firebase project `superparent-42852`)*

---

## 🎯 Target URLs After Deploy

Once deployed to Firebase Hosting, your site will be live at:
1. 🌐 **`https://superparent-42852.web.app`** *(or `https://studio-6989353372-64cd3.web.app`)*
2. 🌐 **`https://superparent-42852.firebaseapp.com`**

---

## ⚙️ Option 1: Direct Cloud Run Rewrite in `firebase.json`

If you want Firebase Hosting to act as a proxy and forward 100% of requests (both frontend & Express backend) to your Cloud Run service:

```json
{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "run": {
          "serviceId": "ais-pre-6h3ojl2oh67dewvc67wqfx",
          "region": "asia-east1"
        }
      }
    ]
  },
  "firestore": {
    "rules": "firestore.rules"
  }
}
```

---

## ⚙️ Option 2: Static Dist + Cloud Run API Rewrites

If you want the super-fast Firebase global CDN for the React frontend, and route only `/api/**` to Cloud Run:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "/api/**",
        "run": {
          "serviceId": "ais-pre-6h3ojl2oh67dewvc67wqfx",
          "region": "asia-east1"
        }
      },
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "firestore": {
    "rules": "firestore.rules"
  }
}
```

---

## 🚀 Step-by-Step Deployment Commands

```bash
# 1. Install Firebase CLI globally (if not installed)
npm install -g firebase-tools

# 2. Login to your Firebase / Google Cloud account
firebase login

# 3. Set the active Firebase Project (e.g., superparent-42852 or studio-6989353372-64cd3)
firebase use superparent-42852

# 4. Deploy hosting configuration
firebase deploy --only hosting
```
