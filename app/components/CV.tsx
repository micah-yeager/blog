import { ArrowDownIcon, BriefcaseIcon } from "@heroicons/react/24/outline"

import { FULL_NAME } from "../constants"
import { Button } from "./Button"
import { Icon } from "./Icon"
import { Role } from "./Role"

/**
 * A list of roles in the CV.
 *
 * @see Role
 */
export function CV() {
  // Define within route, so end.dateTime gets updated independently of server
  // execution and subsequent storage of end.dateTime.
  const cv: Array<Role> = [
    {
      company: "Innovative, Inc.",
      title: "DevOps Engineer & Solutions Architect",
      logo: "/images/logos/innovative-inc.svg",
      start: "2017",
      end: {
        label: "Present",
        dateTime: new Date().getFullYear().toString()
      }
    },
    {
      company: "Hummert IT",
      title: "Owner",
      logo: "/images/logos/circuit.svg",
      start: "2016",
      end: "2017"
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
