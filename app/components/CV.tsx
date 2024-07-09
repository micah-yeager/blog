import { ArrowDownIcon, BriefcaseIcon } from "@heroicons/react/24/outline"

import { FULL_NAME } from "../constants"
import { Button } from "./Button"
import { Icon } from "./Icon"
import { Role } from "./Role"

export function CV() {
  // Define within route, so end.dateTime gets updated independently of server
  // execution and subsequent storage of end.dateTime.
  const cv: Array<Role> = [
    {
      company: "Innovative, Inc.",
      title: "Solutions Architect",
      logo: "/images/logos/innovative-inc.svg",
      start: "2017",
      end: {
        label: "Present",
        dateTime: new Date().getFullYear().toString()
      }
    },
    {
      company: "Life Pacific University - Virginia",
      title: "IT & Media Management",
      logo: "/images/logos/life-pacific-university.svg",
      start: "2014",
      end: "2017"
    }
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
        {cv.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>

      {/* CV download */}
      <Button
        to="/documents/cv.pdf"
        variant="secondary"
        className="group mt-6 block w-full"
        download={`CV - ${FULL_NAME}.pdf`}
        // reload required to force download
        reloadDocument
      >
        Download CV
        <Button.Icon as={ArrowDownIcon} sizeOverride="sm" className="-ml-1" />
      </Button>
    </div>
  )
}
