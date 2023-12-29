import { useLoaderData } from "@remix-run/react"
import { json } from "@vercel/remix"

import { ArticleOverview } from "~/components/ArticleOverview"
import { SimpleLayout } from "~/components/SimpleLayout"
import { getAllArticles } from "~/utils/article.server"

export async function loader() {
  let articleMetas = await getAllArticles()

  return json({ articleMetas }, { status: 200 })
}

export default function Route() {
  const { articleMetas } = useLoaderData<typeof loader>()

  return (
    <SimpleLayout
      title="Opinions, solutions, and everything in between."
      intro="Documenting and sharing what I've learned — hopefully it helps you, too! Though if I'm being honest, some of this is just so I can remember how I solved something later 😅"
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articleMetas.map((articleMeta) => (
            <ArticleOverview {...{ articleMeta }} key={articleMeta.slug} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
