import { faAddressCard } from "@fortawesome/free-solid-svg-icons"
import { LinkIcon } from "@heroicons/react/24/outline"

import { Card } from "~/components/Card"
import type { IconProp } from "~/components/Icon"
import { Icon } from "~/components/Icon"
import { SimpleLayout } from "~/components/SimpleLayout"
import { mergeMeta } from "~/utils/meta"

type Project = {
  name: string
  description: string
  logo: string | IconProp
  link: {
    to: string
    label: string
  }
}

const projects: Project[] = [
  {
    name: "Personal website",
    description:
      "You’re looking at it, baby! A blog and portfolio built using the Tailwind UI Spotlight template, ported to Remix and adapted.",
    link: {
      to: "https://github.com/micah-yeager/blog",
      label: "github.com",
    },
    logo: faAddressCard,
  },
]

export const meta = mergeMeta(() => [{ title: "Projects" }])

export default function Route() {
  return (
    <SimpleLayout
      title="Side projects I’ve worked on. Some are even finished."
      intro="While I’ve mainly worked on closed-source projects at my day job over the years, I’ve also made a few fun, open-source things in my free time. Feel free to check them out and contribute!"
    >
      <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            {/* icon */}
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-orange-600 dark:ring-0">
              {typeof project.logo === "string" ? (
                <img src={project.logo} alt="" className="h-8 w-8" />
              ) : (
                <Icon as={project.logo} className="h-8 w-8" />
              )}
            </div>

            {/* title */}
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link to={project.link.to} target="_blank">
                {project.name}
              </Card.Link>
            </h2>

            <Card.Description>{project.description}</Card.Description>

            {/* link reference indicator */}
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <Icon as={LinkIcon} className="h-6 w-6 flex-none" />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
    </SimpleLayout>
  )
}
