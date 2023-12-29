import { useLoaderData } from "@remix-run/react"
import { json } from "@vercel/remix"
import type { LoaderFunctionArgs } from "@vercel/remix"
import { getMDXComponent } from "mdx-bundler/client/index.js"
import { useMemo } from "react"

import { ArticleLayout } from "~/components/ArticleLayout"
import type { Article } from "~/utils/article.server"
import { getArticle } from "~/utils/article.server"

import codeStyles from "./prism.css"

export function links() {
  return [{ rel: "stylesheet", href: codeStyles }]
}

export async function loader({ params }: LoaderFunctionArgs) {
  const articleId = params.id
  if (!articleId) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    })
  }

  const cwd = `${process.cwd()}/content/articles/${articleId}`
  const file = `${cwd}/page.mdx`

  let article: Article
  try {
    article = await getArticle({ file, cwd })
  } catch (error) {
    console.error(error)
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    })
  }

  return json({ article }, { status: 200 })
}

export default function Article() {
  const { article } = useLoaderData<typeof loader>()

  const Component = useMemo(() => {
    return getMDXComponent(article.code)
  }, [article.code])

  return (
    <ArticleLayout article={article}>
      <Component />
    </ArticleLayout>
  )
}

export { ErrorBoundary } from "~/components/ErrorBoundary"
