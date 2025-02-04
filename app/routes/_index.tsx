import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { Link, useLoaderData } from "@remix-run/react"
import { data } from "@vercel/remix"
import type { ComponentPropsWithoutRef } from "react"

import ArrowDownIcon from "@heroicons/react/24/outline/ArrowDownIcon"
import BriefcaseIcon from "@heroicons/react/24/outline/BriefcaseIcon"
import clsx from "clsx"
import type { SetRequired } from "type-fest"
import { Button } from "~/components/Button"
import { ContactMe } from "~/components/ContactMe"
import { Container } from "~/components/Container"
import type { IconProp } from "~/components/Icon"
import { Icon } from "~/components/Icon"
import { PostOverview } from "~/components/PostOverview"
import { FULL_NAME, GITHUB_URL, LINKEDIN_URL } from "~/constants"
import { getAllPosts } from "~/services/posts.server"

export async function loader() {
  const postMetas = await getAllPosts()
  // Return the most recent 4 posts.
  return data({ recentPosts: postMetas.slice(0, 4) })
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
              and accessible to all.
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

/** Information about a role at a company. */
interface Role {
  /** The name of the company. */
  company: string
  /** The job title held while at the company. */
  title: string
  /** The URL of the company's logo. */
  logo: ComponentPropsWithoutRef<"img">["src"]
  /** The start date of the role. */
  start: string | { label: string; dateTime: string }
  /** The end date of the role. */
  end: string | { label: string; dateTime: string }
}

/**
 * A role at a company.
 *
 * @param role - The role information.
 */
export function Role({ role }: { role: Role }) {
  const startLabel =
    typeof role.start === "string" ? role.start : role.start.label
  const startDate =
    typeof role.start === "string" ? role.start : role.start.dateTime

  const endLabel = typeof role.end === "string" ? role.end : role.end.label
  const endDate = typeof role.end === "string" ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <img src={role.logo} alt="" className="h-7 w-7 rounded-full" />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{" "}
          <span aria-hidden="true">—</span>{" "}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

/** A list of {@link Role}s to display as the CV. */
function CV() {
  // Define within route, so end.dateTime gets updated independently of server
  // execution and subsequent storage of end.dateTime.
  const cv: Role[] = [
    {
      company: "Innovative, Inc.",
      title: "Full-Stack Developer & DevOps Engineer",
      logo: "/images/logos/innovative-inc.svg",
      start: "2017",
      end: "2025",
    },
    {
      company: "Life Pacific University - Virginia",
      title: "Web Developer",
      logo: "/images/logos/life-pacific-university.svg",
      start: "2014",
      end: "2017",
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      {/* header */}
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <Icon
          as={BriefcaseIcon}
          className="h-6 w-6 flex-none"
          aria-hidden="true"
        />
        <span className="ml-3">Work</span>
      </h2>

      {/* roles list */}
      <ol className="mt-6 space-y-4">
        {cv.map((role) => (
          <Role key={`${role.company}|${role.title}`} role={role} />
        ))}
      </ol>

      {/* CV download */}
      <Button
        to="/documents/cv.pdf"
        color="orange"
        className="group mt-6 block w-full"
        download={`CV - ${FULL_NAME}, DevOps Engineer & Solutions Architect.pdf`}
        // reload required to force download
        reloadDocument
      >
        Download CV
        <Icon as={ArrowDownIcon} className="-ml-1 size-4" />
      </Button>
    </div>
  )
}
