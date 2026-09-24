# Login App (Ionic + React + Capacitor)

## Run
    npm install
    npm run dev            # open http://localhost:5173

Demo account: demo@example.com / Password123

## Tests
    npm test               # unit + component tests (Vitest, Testing Library)
    npx playwright install chromium   # once
    npm run test:e2e       # end-to-end in a Pixel 5 sized browser

## Package as an Android app (optional)
    npm run build
    npm i @capacitor/android
    npx cap add android
    npx cap sync
    npx cap open android
