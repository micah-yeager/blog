import type {
  HeadersFunction,
  LinksFunction,
  MetaFunction
} from "@vercel/remix"
import type { PropsWithChildren } from "react"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react"
import { Analytics } from "@vercel/analytics/react"
import { json } from "@vercel/remix"
import { SpeedInsights } from "@vercel/speed-insights/remix"

import type { Env } from "~/browser-globals"
import { TURNSTILE_SITE_KEY } from "@services/captcha.server"
import { AppError } from "@ui/AppError"
import { Layout } from "@ui/Layout"

import { FULL_NAME } from "./constants"
import styles from "./tailwind.css?url"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://rsms.me/" },
  { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
  { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
  { rel: "icon", type: "image/png", href: "/favicon.png" }
]

export const headers: HeadersFunction = () => {
  // Default set of headers used for data requests.
  /*
  The end goal of these headers are to:
  - Reduce the amount of time waiting on first load.
  - Keep content as fresh as possible.

  Caching with the CDN with serve-while-revalidating while forcing clients to
  always revalidate with the CDN is a good way to do this, since we shift the
  burden of revalidating to the CDN, which is much faster in this configuration.

  If we encounter a situation where we need to invalidate the cache, we can
  do that confidently at the CDN level without worrying about client caches.
  */
  const cdnMaxAge = 60 * 2.5 // 2.5 minutes
  const cdnRevalidationPeriod = 60 * 60 * 24 * 90 // 90 days
  return {
    "CDN-Cache-Control": `max-age=${cdnMaxAge}, stale-while-revalidate=${cdnRevalidationPeriod}`,
    "Cache-Control": "no-cache"
  }
}

export const meta: MetaFunction = () => {
  return [
    { title: FULL_NAME },
    { description: "Solutions architect, developer, and cat enthusiast." }
  ]
}

export async function loader() {
  return json({
    ENV: {
      TURNSTILE_SITE_KEY
    } as Env
  })
}

/**
 * The base display component for the application.
 *
 * @param title - The page title as it appears in the browser tab.
 * @param children - The content of the page.
 * @component
 */
function App({ title, children }: PropsWithChildren<{ title?: string }>) {
  // Title is generated by Remix in each route, so ignore it here
  // unless explicitly provided.
  // noinspection HtmlRequiredTitleElement
  return (
    // Always start with the "dark" class, so we don't flash-bang our dark mode
    // users while the JS loads.
    <html lang="en" className="dark h-full antialiased">
      <head>
        {title && <title>{title}</title>}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full w-full bg-zinc-50 text-zinc-600 dark:bg-black dark:text-zinc-400">
        <Layout>{children}</Layout>
        <ScrollRestoration />
        <Scripts />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}

export default function Root() {
  const { ENV } = useLoaderData<typeof loader>()

  return (
    <App>
      <Outlet context={ENV} />
    </App>
  )
}

export function ErrorBoundary() {
  return (
    <App title={`Whoops :/ | ${FULL_NAME}`}>
      <AppError />
    </App>
  )
}
