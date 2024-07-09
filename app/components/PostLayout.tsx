import type { ReactNode } from "react"
import type { Jsonify } from "type-fest"
import { ArrowLeftIcon, ChevronDoubleUpIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { DateTime } from "luxon"

import type { Post } from "~/services/posts.server"
import { Button } from "~/components/Button"
import { Container } from "~/components/Container"
import { Prose } from "~/components/Prose"

function ScrollToTop({ className }: { className?: string }) {
  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      variant="secondary"
      shape="circle"
      size="lg"
      className={clsx(
        "group/ToTopButton shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:relative lg:mb-0",
        className
      )}
      aria-label="Scroll to top"
    >
      <Button.Icon
        as={ChevronDoubleUpIcon}
        sizeOverride="sm"
        className="stroke-zinc-500 group-hover/ToTopButton:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover/ToTopButton:stroke-zinc-400"
        aria-hidden="true"
      />
    </Button>
  )
}

export function PostLayout({
  post,
  children
}: {
  post: Jsonify<Post>
  children: ReactNode
}) {
  const date = DateTime.fromISO(post.frontmatter.date)

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {/* back button */}
          <div className="lg:absolute lg:left-12 lg:-mt-1 lg:mb-0 lg:h-full xl:-top-1.5 xl:left-0 xl:mt-0">
            <div className="gap-4 space-y-2 lg:sticky lg:top-24">
              <Button
                to="/posts"
                prefetch="intent"
                variant="secondary"
                shape="circle"
                size="lg"
                className="group/BackButton mb-8 inline-block shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:mb-0"
                aria-label="Go back to all posts"
              >
                <Button.Icon
                  as={ArrowLeftIcon}
                  sizeOverride="sm"
                  className="stroke-zinc-500 group-hover/BackButton:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover/BackButton:stroke-zinc-400"
                  aria-hidden="true"
                />
              </Button>
              <ScrollToTop className="hidden lg:block" />
            </div>
          </div>

          {/* content */}
          <article>
            <header className="flex flex-col">
              {/* title */}
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {post.frontmatter.title}
              </h1>

              {/* meta */}
              <time
                dateTime={post.frontmatter.date}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">
                  {date.toLocaleString(DateTime.DATE_FULL)}
                </span>
              </time>
            </header>

            {/* body */}
            <Prose className="mt-8" data-mdx-content>
              {children}
            </Prose>
          </article>
        </div>
        <ScrollToTop className="sticky bottom-4 ml-auto mt-8 block lg:hidden" />
      </div>
    </Container>
  )
}
