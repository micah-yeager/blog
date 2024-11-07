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
import { PostOverview } from "@ui/PostOverview"
import clsx from "clsx"
import type { SetRequired } from "type-fest"
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
            <div className="px-6">
              <ContactMe className="w-full" />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

/** Photo definition for the {@link Photos} component. */
type Photo = {
  /** The source URI to display. */
  src: string
  /** The alt-text to display. */
  alt: string
  /** Classes to apply. */
  className?: string
}

const photos: Photo[] = [
  {
    src: "/images/bean-couch.jpeg",
    alt: "Our cat, Bean, sitting attentively on the couch",
  },
  {
    src: "/images/dorian-bird-watching.jpeg",
    alt: "Our cat, Dorian, bird-watching at the window",
  },
  {
    src: "/images/sanya-books.jpeg",
    alt: "Our cat, Sanya, sitting on a stack of books",
  },
  {
    src: "/images/pippin-couch.jpeg",
    alt: "Our cat, Pippin, laying lazily on the couch",
  },
  {
    src: "/images/bast-sink.jpeg",
    alt: "Our cat, Bast, sitting on a sink",
  },
]

/**
 * A frame for a single {@link Photo}.
 *
 * @see {@link HTMLDivElement}
 */
function PhotoFrame({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...rest}
      className={clsx(
        "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
        className,
      )}
    >
      {children}
    </div>
  )
}

/**
 * A photo for the {@link Photos} display.
 *
 * @see {@link HTMLImageElement}
 */
function Photo({
  alt,
  className,
  ...rest
}: SetRequired<ComponentPropsWithoutRef<"img">, "alt">) {
  return (
    <img
      {...rest}
      // separate out alt to satisfy linter
      alt={alt}
      sizes="(min-width: 640px) 18rem, 11rem"
      className={clsx("absolute inset-0 h-full w-full object-cover", className)}
    />
  )
}

/**
 * A collection of multiple skewed {@link Photo}s to display across the screen
 * horizontally.
 */
function Photos() {
  const rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ]

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {photos.map(({ src, alt }, index) => (
          <PhotoFrame className={rotations[index]} key={src}>
            <Photo src={src} alt={alt} />
          </PhotoFrame>
        ))}
      </div>
    </div>
  )
}
