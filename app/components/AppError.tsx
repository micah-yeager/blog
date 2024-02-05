import { RouteError } from "~/components/RouteError"

export function AppError() {
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
        <RouteError />
      </div>
    </div>
  )
}
