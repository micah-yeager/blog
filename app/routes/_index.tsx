import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { Link, useLoaderData } from "@remix-run/react"
import { json } from "@vercel/remix"
import type { ComponentPropsWithoutRef } from "react"

import { getAllPosts } from "@services/posts.server"
import { CV } from "@ui/CV"
import { ContactMe } from "@ui/ContactMe"
import { Container } from "@ui/Container"
import type { IconProp } from "@ui/Icon"
import { Icon } from "@ui/Icon"
import { Photos } from "@ui/Photos"
import { PostOverview } from "@ui/PostOverview"
import { GITHUB_URL, LINKEDIN_URL } from "~/constants"

export async function loader() {
  const postMetas = await getAllPosts()
  // Return the most recent 4 posts.
  return json({ recentPosts: postMetas.slice(0, 4) }, { status: 200 })
}

/**
 * A social media link. Extends the properties of the `Link` element.
 *
 * @param icon - The icon to render.
 * @param props - The properties to apply to the `Link` element.
 * @component
 */
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
            Developer and cat enthusiast.
          </h1>
          <div className="space-y-4 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I’m Micah, a full-stack developer currently based in Maryland,
              United States. I enjoy tackling problems holistically, and I’m
              passionate about building software that is beautiful, functional,
            </p>
            <p>
              And oh my <i>god</i> do I love cats.
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
            {recentPosts.map((meta) => (
              <PostOverview key={meta.slug} meta={meta} />
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
