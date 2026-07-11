import { defineConfig } from '@playwright/test';

// Smoke suite (v3.6.2) — runs against the *built* app via `vite preview`, so the
// service worker, base path and lazy chunks are all exercised exactly as deployed.
// Locally: `npm run build && npm run test:smoke`. CI builds first, then runs this.
export default defineConfig({
  testDir: './tests',
  timeout: 45_000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:4173/P5Tracker/',
    headless: true,
  },
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173/P5Tracker/',
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
