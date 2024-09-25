export type Env = {
  TURNSTILE_SITE_KEY: string
}

declare global {
  interface Window {
    ENV: Env
  }
}
