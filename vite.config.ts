/// <reference types="vitest" />

import { vitePlugin as remix } from "@remix-run/dev"
import { installGlobals } from "@remix-run/node"
import { vercelPreset } from "@vercel/remix/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

installGlobals()

export default defineConfig({
  plugins: [
    !process.env.VITEST &&
      remix({
        presets: [vercelPreset()],
        ignoredRouteFiles: ["**/.*"],
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
