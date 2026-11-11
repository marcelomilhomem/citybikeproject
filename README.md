# City Bikes

A web app to explore bike-sharing networks and stations around the world, with real-time availability. The main focus is managing API requests and retrieving dynamic data.

## Features

- Login with Google, GitHub, or as a guest (Firebase Authentication)
- Interactive Google Map of bike networks; click a marker to see the stations in that network, then a station for its details (free bikes, address)
- English and Portuguese translations
- Protected routes: the app pages require being logged in

## Tech stack

React 18, Vite, Chakra UI, Firebase Auth, Google Maps (`@react-google-maps/api`), Axios, react-router, i18next.

Bike data comes from the public [CityBikes API](https://api.citybik.es/v2/networks), which needs no key.

## Getting started

Prerequisites: Node.js and npm.

```bash
npm install
cp .env.example .env   # then fill in the values (see below)
npm run dev
```

The app runs on the URL Vite prints (usually http://localhost:5173). Restart the dev server after changing `.env`.

## Environment variables

| Variable | Where to get it |
| --- | --- |
| `VITE_REACT_APP_FIREBASE_API_KEY` | Firebase Console → Project settings → General → Your apps → SDK setup |
| `VITE_REACT_APP_FIREBASE_AUTH_DOMAIN` | same |
| `VITE_REACT_APP_FIREBASE_PROJECT_ID` | same |
| `VITE_REACT_APP_FIREBASE_STORAGE_BUCKET` | same |
| `VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID` | same |
| `VITE_REACT_APP_FIREBASE_APP_ID` | same |
| `VITE_GOOGLE_MAP_API_KEY` | Google Cloud Console → APIs & Services → Credentials (enable the Maps JavaScript API) |

`.env` is git-ignored. Never commit real keys.

## Firebase setup

1. Create a project in the [Firebase Console](https://console.firebase.google.com) and register a web app.
2. Open **Authentication → Get started**, then **Sign-in method**, and enable:
   - **Google** (choose a support email)
   - **GitHub** (needs a Client ID and Secret from a GitHub OAuth App; use the callback URL Firebase shows, `https://<auth-domain>/__/auth/handler`)
   - **Anonymous** (used for guest login)
3. Under **Authentication → Settings → Authorized domains**, add your production domain. `localhost` is allowed by default.

If every login fails with `auth/configuration-not-found`, Authentication has not been initialized with **Get started** yet.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  components/   Reusable UI (map, navbar, footer, modal, table)
  context/      Auth, language, and protected-route contexts
  locales/      Translation files (en, pt)
  pages/        Login, landing page, map page
  firebase.js   Firebase initialization
```
