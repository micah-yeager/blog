/// <reference types="vitest" />

import { reactRouter } from "@react-router/dev/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [!process.env.VITEST && reactRouter(), tsconfigPaths()],
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
