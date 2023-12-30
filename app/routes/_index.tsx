import { useLoaderData } from "@remix-run/react"
import { json } from "@vercel/remix"
import type { MetaFunction } from "@vercel/remix"

import { Container } from "~/components/Container"
import { Photos } from "~/components/Photos"
import { PostOverview } from "~/components/PostOverview"
import { Résumé } from "~/components/Résumé"
import { getAllPosts } from "~/utils/post.server"

export const meta: MetaFunction = () => {
  return [
    { title: "Micah Yeager" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export async function loader() {
  const recentPosts = (await getAllPosts()).slice(0, 4)

  return json({ recentPosts }, { status: 200 })
}

export default function Index() {
  const { recentPosts } = useLoaderData<typeof loader>()

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Solutions architect, developer, and amateur musician.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I'm Micah, a full-stack developer based in Maryland, United States
            (soon to be British Columbia, Canada). I enjoy tackling problems
            holistically, and I'm passionate about building software that is
            beautiful, functional, and accessible by all.
          </p>
        </div>
      </Container>

      <Photos />

      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2 lg:gap-y-0">
          <div className="flex flex-col gap-16">
            {recentPosts.map((post) => (
              <PostOverview key={post.slug} postMeta={post} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Résumé />
          </div>
        </div>
      </Container>
    </>
  )
}
