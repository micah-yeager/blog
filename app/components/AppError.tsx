import { Link } from "@remix-run/react"

type AppErrorProps = {
  code: number
  title: string
  description: string
}

export function AppError({ code, title, description }: AppErrorProps) {
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
        <p className="text-base font-semibold leading-8 text-black dark:text-white">
          {code}
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-base text-black/70 dark:text-white sm:mt-6">
          {description}
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            to="/"
            className="text-sm font-semibold leading-7 text-black dark:text-white"
          >
            <span aria-hidden="true">&larr;</span> Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
