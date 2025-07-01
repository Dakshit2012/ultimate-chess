
# Ultimate Chess Pro ♟

A full-featured multiplayer chess website rivaling Chess.com and Lichess.

## Features
- 🔥 Real-time multiplayer (Firebase)
- ⏱ Timers with countdown
- 🧠 Stockfish engine (in-browser)
- 💬 Chat
- ♟ Legal move validation and check/checkmate
- 📤 PGN export
- 🌙 Modern dark/light theme UI

## Deploy to GitHub Pages

1. Clone or download this repo
2. Push it to your GitHub repository
3. Go to Settings → Pages → Select `main` branch → `/root`
4. Your site will be live at `https://yourusername.github.io/ultimate-chess`

## Firebase Setup

1. Create a Firebase project
2. Enable Firestore in test mode
3. Replace the Firebase config in `index.html` with your real credentials
4. Update Firestore rules:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /games/{gameId} {
      allow read, write: if true;
    }
    match /games/{gameId}/chat/{msgId} {
      allow read, write: if true;
    }
  }
}
```
