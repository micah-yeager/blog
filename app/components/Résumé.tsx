import { ArrowDownIcon, BriefcaseIcon } from "@heroicons/react/24/outline"

import { Button } from "~/components/Button"
import { Icon } from "~/components/Icon"
import { Role } from "~/components/Role"

export function Résumé() {
  let resume: Array<Role> = [
    {
      company: "Innovative, Inc.",
      title: "Solutions Architect",
      logo: "/images/logos/innovative-inc.svg",
      start: "2017",
      end: {
        label: "Present",
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: "Life Pacific University - Virginia",
      title: "IT & Media Management",
      logo: "/images/logos/life-pacific-university.svg",
      start: "2014",
      end: "2017",
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <Icon as={BriefcaseIcon} className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button to="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <Icon
          as={ArrowDownIcon}
          className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50"
        />
      </Button>
    </div>
  )
}
