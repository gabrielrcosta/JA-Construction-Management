# JA Construction Management App

A cross-platform mobile app (Android & iOS) for inventory and expense management.

Built with **React Native + Expo**.

## Tech Stack

- React Native + Expo
- TypeScript
- Expo Router (file-based navigation)
- NativeWind (Tailwind CSS for React Native)
- expo-secure-store (secure session storage)

## Project Structure

```
app/
  _layout.tsx          ← root layout: auth check + providers
  (auth)/
    login.tsx          ← login screen
  (employee)/
    _layout.tsx        ← employee tab bar
    inventory.tsx      ← browse materials, submit requests
    expenses.tsx       ← submit expenses + receipts
    profile.tsx        ← profile + logout
  (admin)/
    _layout.tsx        ← admin tab bar
    dashboard.tsx      ← overview + stats
    approvals.tsx      ← approve/reject requests
    materials.tsx      ← manage material catalogue
    profile.tsx        ← profile + logout

context/
  AuthContext.tsx      ← global auth state (user, role, login, logout)

components/            ← shared UI components
services/              ← backend API calls (Firebase/Supabase when ready)
```

## Getting Started

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** on your phone.

## Current Status

🚧 MVP in progress

- [x] Project structure
- [x] Authentication flow (mock)
- [x] Role-based navigation (employee / admin)
- [ ] Inventory module
- [ ] Expenses module
- [ ] Backend integration (Firebase / Supabase)
