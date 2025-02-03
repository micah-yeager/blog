import { HydratedRouter } from "react-router/dom";
import { StrictMode, startTransition } from "react"
import { hydrateRoot } from "react-dom/client"
import { cacheAssets } from "remix-utils/cache-assets"

// Start loading all static assets when the page loads.
cacheAssets().catch(console.error)

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  )
})
