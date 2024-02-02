import { useLoaderData } from "@remix-run/react"
import { json } from "@vercel/remix"
import type { LoaderFunctionArgs } from "@vercel/remix"
import { DateTime } from "luxon"
import { getMDXComponent } from "mdx-bundler/client/index.js"
import { useMemo } from "react"

import { PostLayout } from "~/components/PostLayout"
import type { Post } from "~/services/posts.server"
import { getPost } from "~/services/posts.server"

import codeStyles from "./prism.css"

export function links() {
  return [{ rel: "stylesheet", href: codeStyles }]
}

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
  const cwd = `${process.cwd()}/content/posts/${postId}`
  const file = `${cwd}/page.mdx`
  let post: Post
  try {
    post = await getPost({ file, cwd })
  } catch (error) {
    console.error(error)
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    })
  }

  // Change caching length based on article age.
  const headers = new Headers()
  // If less than a day old, only cache for 30 minutes to allow for hotfixes.
  if (
    DateTime.fromISO(post.frontmatter.date) > DateTime.now().minus({ days: 1 })
  ) {
    headers.set("Cache-Control", "public, max-age=1800")
  }
  // Otherwise, cache for a day.
  else {
    headers.set("Cache-Control", "public, max-age=86400")
  }

  return json({ post }, { status: 200, headers })
}

export default function Post() {
  const { post } = useLoaderData<typeof loader>()

  const Component = useMemo(() => {
    return getMDXComponent(post.code)
  }, [post.code])

  return (
    <PostLayout post={post}>
      <Component />
    </PostLayout>
  )
}

export { ErrorBoundary } from "~/components/ErrorBoundary"
