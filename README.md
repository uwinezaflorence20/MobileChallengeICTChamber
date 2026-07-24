# Dog Breeds

A visually appealing, offline-friendly mobile app for browsing dog breeds and photos, built with **Expo (React Native) + TypeScript**, powered by [The Dog API](https://www.thedogapi.com/).

## Features

- **Browse all breeds** in a searchable, two-column card grid (search matches name, breed group, and temperament).
- **Breed detail screen** with a swipeable photo carousel (fetched live per breed), origin, life span, weight/height stats, breed group, "bred for", and temperament tags.
- **Favorites** — tap the heart on any breed to save it; favorites persist locally (`AsyncStorage`) and get their own tab.
- **"Surprise me" 🎲 button** — jumps to a random breed.
- **Pull-to-refresh** on the breeds list, with graceful loading/error/empty states.
- **Automatic light/dark theme** based on the system appearance.

## Tech stack

- Expo SDK 57, React Native 0.86, React 19, TypeScript
- Expo Router (file-based navigation, typed routes)
- `expo-image` for fast, cached image rendering
- `@react-native-async-storage/async-storage` for local favorites persistence
- [The Dog API](https://www.thedogapi.com/) (`/breeds`, `/images/search`)

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Add your Dog API key

Get a free key from [thedogapi.com/en/students](https://www.thedogapi.com/en/students), then create a `.env` file in the project root (copy `.env.example`):

```bash
cp .env.example .env
```

```
EXPO_PUBLIC_DOG_API_KEY=your_key_here
```

### 3. Run the app

```bash
npx expo start
```

Scan the QR code with Expo Go (Android/iOS), or press `a` / `i` for an emulator.

## Building an APK

This project is configured for [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
```

Make sure `EXPO_PUBLIC_DOG_API_KEY` is set as an EAS secret/environment variable so it's baked into the build:

```bash
eas env:create --name EXPO_PUBLIC_DOG_API_KEY --value your_key_here --environment preview
```

## Project structure

```
app/                    Expo Router screens
  (tabs)/index.tsx       Breeds list
  (tabs)/favorites.tsx   Favorites list
  breed/[id].tsx         Breed detail
src/
  api/dogApi.ts          The Dog API client
  context/               Breeds + Favorites providers
  components/            Reusable UI pieces
  theme/                 Light/dark color tokens
```
