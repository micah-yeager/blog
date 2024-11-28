import { useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@vercel/remix"
import { json } from "@vercel/remix"
import { getMDXComponent } from "mdx-bundler/client/index.js"
import { useMemo } from "react"

import type { Post } from "@services/posts.server"
import { getPost } from "@services/posts.server"
import { mergeMeta } from "@utils/meta"

import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon"
import ChevronDoubleUpIcon from "@heroicons/react/24/outline/ChevronDoubleUpIcon"
import { Button } from "@ui/Button"
import { Container } from "@ui/Container"
import { Icon } from "@ui/Icon"
import { Prose } from "@ui/Prose"
import clsx from "clsx"
import { DateTime } from "luxon"
import { CANONICAL_ORIGIN, FULL_NAME, LOCALE } from "../../constants"
import codeStyles from "./prism.css?url"

/** The translated locale for the Open Graph protocol. */
const og_locale = LOCALE.replace("-", "_")

export function links() {
  return [{ rel: "stylesheet", href: codeStyles }]
}

export const meta = mergeMeta<typeof loader>(({ data }) => {
  // Use the post title as the page title.
  if (!data) return []

  // Add additional metadata.
  const meta = data.post.meta
  return [
    { title: meta.title },
    { name: "description", content: meta.description },
    // Open Graph protocol metadata, see https://ogp.me
    { property: "og:url", content: `${CANONICAL_ORIGIN}/posts/${meta.slug}` },
    { property: "og:title", content: meta.title },
    { property: "og:description", content: meta.description },
    { property: "og:site_name", content: FULL_NAME },
    { property: "og:locale", content: og_locale },
    { property: "og:type", content: "article" },
    { property: "og:article:published_time", content: meta.created },
    // Only append the modified time if it exists.
    ...(meta.updated
      ? [{ property: "og:article:modified_time", content: meta.updated }]
      : []),
    // Map tags.
    ...meta.tags.map((tag) => ({
      property: "og:article:tag",
      content: tag,
    })),
    // Map authors.
    ...meta.authors.map((author) => ({
      property: "og:article:author",
      content: author,
    })),
  ]
})

export async function loader({ params }: LoaderFunctionArgs) {
  // Ensure a post ID is provided.
  const postId = params.id
  if (!postId) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    })
  }

  // Load and process the post.
  let post: Post
  try {
    post = await getPost({ file: postId })
  } catch (error) {
    // Check if this is a file-not-found error and respond accordingly.
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      throw new Response(
        "Not all who wander are lost, but the page you’re looking for is.",
        {
          status: 404,
          statusText: "Not found",
        },
      )
    }

    // Otherwise, respond with a generic error.
    console.error(error)
    throw new Response(null, {
      status: 500,
      statusText: "Server error",
    })
  }

  return json({ post }, { status: 200 })
}

export default function Route() {
  const { post } = useLoaderData<typeof loader>()

  const Component = useMemo(() => {
    return getMDXComponent(post.code)
  }, [post.code])

  const created = DateTime.fromISO(post.meta.created)
  const updated = post.meta.updated ? DateTime.fromISO(post.meta.updated) : null

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
                {post.meta.title}
              </h1>

              {/* meta */}
              <time
                dateTime={post.meta.created}
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
                    dateTime={post.meta.updated}
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
              <Component />
            </Prose>
          </article>
        </div>
        <ScrollToTop className="sticky bottom-4 ml-auto mt-8 block lg:hidden" />
      </div>
    </Container>
  )
}

/**
 * A floating button that scrolls to the top of the page
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
