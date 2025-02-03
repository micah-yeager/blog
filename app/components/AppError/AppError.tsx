import { isRouteErrorResponse, useRouteError } from "react-router"

import { Button } from "../Button"

/** Component to display an application error. */
export function AppError() {
  const error = useRouteError()

  return (
    <div className="isolate min-h-full text-center">
      {/* background image and overlay */}
      <img
        src="/images/cunningham-trees.jpeg"
        alt=""
        className="absolute inset-0 -z-20 h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-zinc-200/70 object-cover object-bottom dark:bg-zinc-800/70" />

      {/* content */}
      <div className="mx-auto my-24 inline-block min-w-[32rem] max-w-2xl rounded-lg bg-zinc-200/75 p-6 text-center shadow-2xl dark:bg-zinc-800/75 sm:my-32 lg:px-8">
        {/* error code */}
        <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500">
          {isRouteErrorResponse(error) ? error.status : "Error"}
        </p>
        {/* status text */}
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {(isRouteErrorResponse(error) && error.statusText) ??
            "An unknown error occurred"}
        </h1>
        {/* error message */}
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          {isRouteErrorResponse(error) && error.data
            ? String(error.data)
            : "We ran into a problem while trying to fulfill your request. Please try again later."}
        </p>

        {/* back to home link */}
        <Button to="/" color="dark/white" className="mt-4">
          Go back home
        </Button>
      </div>
    </div>
  )
}
