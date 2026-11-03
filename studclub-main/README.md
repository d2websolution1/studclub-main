# STUDDCLUB — Full Stack Dynamic Platform

Architecture breakdown with independent folders:
- **`studclub-backend`**: Node.js + Express + MongoDB (Mongoose) + Multer image uploads + RESTful CRUD API (Port **5000**)
- **`studclub-admin`**: Next.js + Tailwind CSS + Lucide Icons Admin Dashboard (Port **3001**)
- **`studclub-main`**: Next.js + Tailwind CSS + Lucide Icons Client Landing Page (Port **3000**)

---

## 🚀 Quick Start

### 1. One-Click Launch (Windows)
Double-click `start-all.bat` in this folder. It will launch:
- Backend on `http://localhost:5000`
- Admin Dashboard on `http://localhost:3001`
- Client Website on `http://localhost:3000`

### 2. Manual Commands

#### Backend:
```bash
cd studclub-backend
npm install
npm run dev
```

#### Admin Panel:
```bash
cd studclub-admin
npm install
npm run dev
```

#### Client Frontend:
```bash
cd studclub-main
npm install
npm run dev
```

---

## ⚙️ Features

### Admin Portal (`http://localhost:3001`)
- **Add Profile**: Upload custom image file (JPG, PNG, WebP) or enter image URL. Fill in name, gender (Female / Male Studd), age, category, Indian metro city, locality, rate, tagline, bio, and services.
- **Edit Profile**: Modify any existing profile attributes and replace photos seamlessly.
- **Delete Profile**: Remove any profile with instant database deletion and confirmation safeguard.
- **Quick Verification Switch**: 1-click toggle to set Verified status on/off.
- **Live Search & Filter**: Search by name, locality, profession, or filter by Gender, City, Category, and Verification status.
- **Switch Views**: Choose between Luxury Grid Cards and Compact Table views.
- **Live Backend Health Badge**: Live monitoring of Backend API connectivity.

### Backend API (`http://localhost:5000`)
- `GET /api/health` — Check server health & DB status
- `GET /api/stats` — Overall counts (Total, Female, Male, Verified, Metros)
- `GET /api/profiles` — List profiles with query filters (`?gender=`, `?city=`, `?category=`, `?search=`, `?verified=`)
- `GET /api/profiles/:id` — Fetch single profile
- `POST /api/profiles` — Create profile (supports `multipart/form-data` with `photoFile` or JSON body)
- `PUT /api/profiles/:id` — Update profile (supports optional `photoFile` replacement)
- `PATCH /api/profiles/:id/toggle-verified` — Toggle verification status
- `DELETE /api/profiles/:id` — Permanently delete profile
- `POST /api/upload` — Standalone image upload route
- Static file serving for photos via `/uploads/...`

### MongoDB Configuration:
In `studclub-backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/studclub
```
*Note: If MongoDB is not yet running locally, the backend seamlessly uses its built-in synced storage engine (`data/profiles.json`) so the entire system works immediately without crashing! When a live MongoDB connection is provided, it automatically connects and syncs.*
