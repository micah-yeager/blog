import { useLoaderData } from "@remix-run/react"
import { json } from "@vercel/remix"
import type { LoaderFunctionArgs } from "@vercel/remix"
import { getMDXComponent } from "mdx-bundler/client/index.js"
import { useMemo } from "react"

import { PostLayout } from "~/components/PostLayout"
import type { Post } from "~/utils/post.server"
import { getPost } from "~/utils/post.server"

import codeStyles from "./prism.css"

export function links() {
  return [{ rel: "stylesheet", href: codeStyles }]
}

export async function loader({ params }: LoaderFunctionArgs) {
  const postId = params.id
  if (!postId) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    })
  }

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

  return json({ post }, { status: 200 })
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
