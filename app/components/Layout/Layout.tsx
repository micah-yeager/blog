import type { PropsWithChildren } from "react"
import { Footer } from "../Footer"
import { Header } from "../Header"

/**
 * The layout for the application.
 *
 * @see {@link PropsWithChildren}
 */
export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex min-h-full w-full flex-col">
        <Header />
        <main className="flex-auto">{children}</main>
        <Footer />
      </div>
    </>
  )
}
