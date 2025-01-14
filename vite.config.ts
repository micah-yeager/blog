/// <reference types="vitest" />

import { vitePlugin as remix } from "@remix-run/dev"
import { vercelPreset } from "@vercel/remix/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true
  }
}

export default defineConfig({
  plugins: [
    !process.env.VITEST &&
      remix({
        presets: [vercelPreset()],
        ignoredRouteFiles: ["**/.*"],
        future: {
          unstable_optimizeDeps: true,
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_lazyRouteDiscovery: true,
          v3_singleFetch: true,
        },
      }),
    tsconfigPaths(),
  ],
  test: {
    setupFiles: ["test/setup/extend-expect.ts"],
    clearMocks: true,
    environment: "jsdom",
    coverage: {
      // Leave disabled by default, will be enabled on-demand by the
      // test:coverage script.
      provider: "v8",
      all: true,
      reporter: ["json-summary", "json"],
      reportOnFailure: true,
    },
  },
})
