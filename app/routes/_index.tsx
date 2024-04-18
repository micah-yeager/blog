import type { ComponentPropsWithoutRef } from "react"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { Link, useLoaderData } from "@remix-run/react"
import { json } from "@vercel/remix"

import type { IconProp } from "~/components/Icon"
import { ContactMe } from "~/components/ContactMe"
import { Container } from "~/components/Container"
import { CV } from "~/components/CV"
import { Icon } from "~/components/Icon"
import { Photos } from "~/components/Photos"
import { PostOverview } from "~/components/PostOverview"
import { GITHUB_URL, LINKEDIN_URL } from "~/constants"
import { getAllPosts } from "~/services/posts.server"

export async function loader() {
  const postMetas = await getAllPosts()
  // Return the most recent 4 posts.
  return json({ recentPosts: postMetas.slice(0, 4) }, { status: 200 })
}

function SocialLink({
  icon,
  ...props
}: ComponentPropsWithoutRef<typeof Link> & {
  icon: IconProp
}) {
  return (
    <Link className="group/SocialLink -m-1 p-1" {...props}>
      <Icon
        as={icon}
        className="h-6 w-6 text-zinc-500 transition group-hover/SocialLink:text-zinc-600 dark:text-zinc-400 dark:group-hover/SocialLink:text-zinc-300"
      />
    </Link>
  )
}

export default function Index() {
  const { recentPosts } = useLoaderData<typeof loader>()

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Solutions architect, developer, and cat enthusiast.
          </h1>
          <div className="space-y-4 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I’m Micah, a full-stack developer based in Maryland, United States
              (soon to be British Columbia, Canada). I enjoy tackling problems
              holistically, and I’m passionate about building software that is
              beautiful, functional, and accessible by all.
            </p>
            <p>
              And holy <i>shit</i> do I love cats.
            </p>
          </div>
          <div className="flex gap-6">
            <SocialLink
              to={GITHUB_URL}
              aria-label="Follow on GitHub"
              icon={faGithub}
            />
            <SocialLink
              to={LINKEDIN_URL}
              aria-label="Follow on LinkedIn"
              icon={faLinkedin}
            />
          </div>
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
            <CV />
            <ContactMe className="w-full" />
          </div>
        </div>
      </Container>
    </>
  )
}
