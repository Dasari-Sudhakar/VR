# Immersive Virtual Reality Tour Platform

Production-ready full-stack template for building immersive multi-room VR tours for Meta Quest, HTC Vive, and standard web browsers.

## Folder Structure

```text
.
├── client/                 # React + Vite + Tailwind + Three.js app
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── routes/
│   └── .env.example
├── server/                 # Express + MongoDB + JWT + Socket.io API
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── sockets/
│   └── .env.example
├── assets/                 # Static placeholders (images/audio/icons)
├── database-schema.md      # MongoDB schema reference
└── package.json            # Monorepo workspace scripts
```

## Features Included

- JWT auth (register/login)
- Role-based access (admin/user)
- Favorites and user progress tracking
- 3D sphere-based 360° renderer (Three.js + React Three Fiber)
- WebXR VR mode integration (`@react-three/xr`)
- Hotspots with info/nav/media capability
- Multi-room minimap navigation
- Ambient background sound
- Screenshot capture
- Glassmorphism UI + light/dark theme toggle
- Framer Motion page transitions
- Onboarding quick tutorial panel
- Admin dashboard with analytics cards
- Cloudinary upload endpoint for 360 images
- Socket.io presence baseline for multiplayer tours

## Installation

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

Fill in MongoDB URI, JWT secret, and Cloudinary credentials.

### 3) Run in development

```bash
npm run dev
```

- Client: `http://localhost:5173`
- API: `http://localhost:5000`

## Build for Production

```bash
npm run build
```

## Deployment Guide

### Frontend (Vercel)
1. Import repository into Vercel.
2. Set root directory to `client`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Set environment variables:
   - `VITE_API_URL=https://<render-backend-url>/api`
   - `VITE_SOCKET_URL=https://<render-backend-url>`

### Backend (Render)
1. Create a new **Web Service** from this repository.
2. Root directory: `server`.
3. Build command: `npm install`.
4. Start command: `npm run start`.
5. Add environment variables from `server/.env.example`.
6. Allow CORS by setting `CLIENT_URL` to your Vercel domain.

## Performance Notes

- Vite code splitting enabled by default for dynamic chunks.
- Lazy asset loading supported through suspense in 3D canvas.
- Use compressed 360 assets (`webp` / optimized JPEG).
- Keep hotspot geometry lightweight for FPS stability.
- Consider using Draco-compressed GLTF if adding 3D models.

## Next Enhancements

- Guided tour orchestration timeline
- AI assistant endpoint integration (LLM or RAG)
- Voice narration queue + transcript support
- Persistent multiplayer avatars and synchronized pointers
