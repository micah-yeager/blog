import { isRouteErrorResponse, useRouteError } from "@remix-run/react"

import { Button } from "~/components/Button"

export function RouteError() {
  const error = useRouteError()

  return (
    <div className="flex flex-col items-center">
      {/* error code */}
      <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500">
        {isRouteErrorResponse(error) ? error.status : "Error"}
      </p>
      {/* status text */}
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        {isRouteErrorResponse(error) && error.statusText
          ? String(error.statusText)
          : "An unknown error occurred"}
      </h1>
      {/* error message */}
      <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
        {isRouteErrorResponse(error) && error.statusText
          ? String(error.data)
          : "We ran into a problem while trying to fulfill your request. Please try again later."}
      </p>

      {/* back to home link */}
      <Button to="/" variant="secondary" className="mt-4">
        Go back home
      </Button>
    </div>
  )
}
