import { isRouteErrorResponse, useRouteError } from "@remix-run/react"

import { Button } from "~/components/Button"
import { Container } from "~/components/Container"

export function ErrorBoundary() {
  return (
    <Container className="flex h-full items-center pt-16 sm:pt-32">
      <ErrorBoundaryContent />
    </Container>
  )
}

export function ErrorBoundaryContent() {
  const error = useRouteError()

  return (
    <div className="flex flex-col items-center">
      <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500">
        {isRouteErrorResponse(error) ? error.status : "Error"}
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        {isRouteErrorResponse(error)
          ? error.statusText
          : "An unknown error occurred."}
      </h1>
      {isRouteErrorResponse(error) && error.status === 404 && (
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
      )}
      <Button to="/" variant="secondary" className="mt-4">
        Go back home
      </Button>
    </div>
  )
}
