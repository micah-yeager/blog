import type { ReactNode } from "react"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import clsx from "clsx"

import type { IconProp } from "@ui/Icon"
import { ContactMe } from "@ui/ContactMe"
import { Container } from "@ui/Container"
import { Icon } from "@ui/Icon"
import { Link } from "@ui/Link"
import { mergeMeta } from "@utils/meta"
import { FULL_NAME, GITHUB_URL, LINKEDIN_URL } from "~/constants"

export const meta = mergeMeta(() => [{ title: "About" }])

/**
 * A social media link.
 *
 * @param className - Additional classes to apply to the link.
 * @param to - The URL to link to.
 * @param children - Link contents.
 * @param icon - The icon to render.
 * @component
 */
function SocialLink({
  className,
  to,
  children,
  icon
}: {
  className?: string
  to: string
  icon: IconProp
  children: ReactNode
}) {
  return (
    <li className={clsx(className, "flex")}>
      <Link
        to={to}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-orange-500 dark:text-zinc-200 dark:hover:text-orange-500"
      >
        <Icon
          as={icon}
          className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-orange-500"
        />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        {/* photo */}
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <img
              src="/images/me-sitting.jpeg"
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
            {/* photo credit */}
            <p className="mt-2 text-center text-sm text-zinc-400 dark:text-zinc-600">
              Photo by{" "}
              <a
                href="https://www.instagram.com/subjecttophotography/"
                className="text-zinc-500 hover:underline"
              >
                Wes Yeager
              </a>
            </p>
          </div>
        </div>

        {/* main */}
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            I’m {FULL_NAME}. I like learning and building things.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I’ve messed around with computers for longer than I can remember.
              Some of my earliest memories involve rummaging around in the guts
              of our old family desktop computer while brandishing a pair of
              wire cutters, because the wires made a very satisfying "snip"
              sound when I cut them. Little did I know, this little act of
              wanton destruction would spark a lifelong passion for technology.
            </p>
            <p>
              Working in IT never really occurred to me until I was in college.
              I had a presentation project, and making yet another slideshow
              felt boring to me. So, I decided to create a website instead.
              Because why not, right? How hard could it be?
            </p>
            <p>
              I quickly discovered that it was, in fact, more difficult than I
              had anticipated — I wanted it to be cool and modern, dammit!
              However, I persevered out of sheer stubbornness, and I came out
              with something that I was reasonably pleased with. Because of that
              project, I ended up with an internship to help redesign the
              college’s public website, and I’ve been hooked ever since.
            </p>
            <p>
              I’ve learned a lot since that project, and I’ll never stop
              learning. I’m not satisfied with "good enough" — I’m always
              looking for ways to improve systems, processes, and myself. My
              goal is to always leave things better than I found them!
            </p>
          </div>
        </div>

        {/* contact */}
        <div className="space-y-4 lg:pl-20">
          <SocialLink to={GITHUB_URL} icon={faGithub}>
            Follow on GitHub
          </SocialLink>
          <SocialLink to={LINKEDIN_URL} icon={faLinkedin}>
            Follow on LinkedIn
          </SocialLink>
          <ContactMe className="lg:w-full" />
        </div>
      </div>
    </Container>
  )
}
