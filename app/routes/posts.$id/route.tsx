import type { LoaderFunctionArgs } from "@vercel/remix"
import { useLoaderData } from "@remix-run/react"
import { json } from "@vercel/remix"
import { getMDXComponent } from "mdx-bundler/client/index.js"
import { useMemo } from "react"

import type { Post } from "@services/posts.server"
import { getPost } from "@services/posts.server"
import { PostLayout } from "@ui/PostLayout"
import { mergeMeta } from "@utils/meta"

import { CANONICAL_ORIGIN, FULL_NAME, LOCALE } from "../../constants"
import codeStyles from "./prism.css?url"

export const config = { runtime: "nodejs" }

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
      content: tag
    })),
    // Map authors.
    ...meta.authors.map((author) => ({
      property: "og:article:author",
      content: author
    }))
  ]
})

export async function loader({ params }: LoaderFunctionArgs) {
  // Ensure a post ID is provided.
  const postId = params.id
  if (!postId) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found"
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
          statusText: "Not found"
        }
      )
    }

    // Otherwise, respond with a generic error.
    console.error(error)
    throw new Response(null, {
      status: 500,
      statusText: "Server error"
    })
  }

  return json({ post }, { status: 200 })
}

export default function Route() {
  const { post } = useLoaderData<typeof loader>()

  const Component = useMemo(() => {
    return getMDXComponent(post.code)
  }, [post.code])

  return (
    <PostLayout meta={post.meta}>
      <Component />
    </PostLayout>
  )
}
