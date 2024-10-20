import type { ComponentPropsWithoutRef } from "react"

/** Information about a role at a company. */
export interface Role {
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
 * @component
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
