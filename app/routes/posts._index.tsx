import { useLoaderData } from "@remix-run/react"
import { json } from "@vercel/remix"

import { PostOverview } from "~/components/PostOverview"
import { SimpleLayout } from "~/components/SimpleLayout"
import { getAllPosts } from "~/services/posts.server"
import { mergeMeta } from "~/utils/meta"

export const meta = mergeMeta(() => [{ title: "Posts" }])

export async function loader() {
  let postMetas = await getAllPosts()
  return json({ postMetas }, { status: 200 })
}

export default function Route() {
  const { postMetas } = useLoaderData<typeof loader>()

  return (
    <SimpleLayout
      title="Opinions, solutions, and everything in between."
      intro="Documenting and sharing what I’ve learned — hopefully it helps you, too! Though if I’m being honest, some of this is just so I can remember how I solved something later 😅"
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {postMetas.map((postMeta) => (
            <PostOverview {...{ postMeta }} key={postMeta.slug} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
