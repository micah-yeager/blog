import { faOldRepublic } from "@fortawesome/free-brands-svg-icons"
import { faCropSimple } from "@fortawesome/free-solid-svg-icons"
import LinkIcon from "@heroicons/react/24/outline/LinkIcon"
import clsx from "clsx"

import { Card } from "~/components/Card"
import type { IconProp } from "~/components/Icon"
import { Icon } from "~/components/Icon"
import { SimpleLayout } from "~/components/SimpleLayout"
import { mergeMeta } from "~/utils/meta"

/** Definition for a public project I've worked on. */
type Project = {
  /** The name of the project. */
  name: string
  /** A brief description of the project. */
  description: string
  /** The logo to display for the project. */
  logo: {
    /** The icon to render. */
    using: string | IconProp
    /** The classes to apply to the icon. */
    className: string
  }
  /** A link to the project's repository or website. */
  link: {
    /** The URL to link to. */
    to: string
    /** The label for the link. */
    label: string
  }
}

/** A list of public projects I've worked on. */
const projects: Project[] = [
  {
    name: "Personal website",
    description:
      "You’re looking at it, baby! A blog and portfolio built using Tailwind UI and Remix.",
    link: {
      to: "https://github.com/micah-yeager/blog",
      label: "github.com",
    },
    logo: {
      using: faCropSimple,
      className: "bg-orange-500 dark:bg-orange-600",
    },
  },
  {
    name: "KotOR Switch Modding",
    description:
      "Tools to make modding Star Wars: Knights of the Old Republic I & II on Nintendo Switch less confusing and cumbersome.",
    link: {
      to: "https://github.com/DrSnuggly/KotOR-Switch-modding",
      label: "github.com",
    },
    logo: { using: faOldRepublic, className: "bg-[#000a21]" },
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
            <div
              className={clsx(
                "relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:ring-0",
                project.logo.className,
              )}
            >
              {typeof project.logo.using === "string" ? (
                <img src={project.logo.using} alt="" className="h-8 w-8" />
              ) : (
                <Icon as={project.logo.using} className="h-8 w-8" />
              )}
            </div>

            {/* title */}
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link to={project.link.to}>{project.name}</Card.Link>
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
