import type { PropsWithChildren } from "react"
import type { Jsonify } from "type-fest"
import { ArrowLeftIcon, ChevronDoubleUpIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { DateTime } from "luxon"

import type { PostMeta } from "@services/posts.server"

import { Button } from "../Button"
import { Container } from "../Container"
import { Icon } from "../Icon"
import { Prose } from "../Prose"

/**
 * A floating button for a {@link PostLayout} that scrolls to the top of the page
 * when clicked.
 *
 * @param className - Additional classes to apply to the button.
 */
function ScrollToTop({ className }: { className?: string }) {
  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      color="dark"
      className={clsx("lg:relative lg:mb-0", className)}
      aria-label="Scroll to top"
    >
      <Icon as={ChevronDoubleUpIcon} className="size-4" aria-hidden="true" />
    </Button>
  )
}

/** Properties for the {@link PostLayout} component. */
type PostLayoutProps = Required<PropsWithChildren> & {
  /**
   * The metadata for the post.
   *
   * @see PostMeta
   */
  meta: Jsonify<PostMeta>
}

/**
 * The layout for a blog post.
 *
 * @param meta - The metadata for the post.
 * @param children - The content of the post.
 * @see {@link PostLayoutProps}
 */
export function PostLayout({ meta, children }: PostLayoutProps) {
  const created = DateTime.fromISO(meta.created)
  const updated = meta.updated ? DateTime.fromISO(meta.updated) : null

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
                color="dark"
                className="mb-8 inline-block lg:mb-0"
                aria-label="Go back to all posts"
              >
                <Icon
                  as={ArrowLeftIcon}
                  className="size-4"
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
                {meta.title}
              </h1>

              {/* meta */}
              <time
                dateTime={meta.created}
                className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
              >
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <span className="ml-3">
                  {created.toLocaleString(DateTime.DATE_FULL)}
                </span>
              </time>
              {updated && (
                <>
                  <span className="mx-3">•</span>
                  <time
                    dateTime={meta.updated}
                    className="order-last flex items-center text-base text-zinc-400 dark:text-zinc-500"
                  >
                    <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                    <span className="ml-3">
                      {updated.toLocaleString(DateTime.DATE_FULL)}
                    </span>
                  </time>
                </>
              )}
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
