import type { PropsWithChildren } from "react"
import { Container } from "../Container"

/**
 * A simple page layout with a title and introduction.
 *
 * Already includes a {@link Container} component, so no need to wrap it.
 *
 * @param title - The page title.
 * @param intro - The page subtitle.
 * @param children - The content of the page.
 */
export function SimpleLayout({
  title,
  intro,
  children,
}: PropsWithChildren<{
  title: string
  intro: string
}>) {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
      </header>
      {children && <div className="mt-16 sm:mt-20">{children}</div>}
    </Container>
  )
}
