import type { PropsWithChildren } from "react"
import { useId } from "react"

/** Properties for the {@link Section} component. */
type SectionProps = Required<PropsWithChildren> & {
  /** The title of the section. */
  title: string
}

/**
 * A section of content with a title.
 *
 * @param title - The title of the section.
 * @param children - The content of the section.
 * @see {@link SectionProps}
 */
export function Section({ title, children }: SectionProps) {
  const id = useId()

  return (
    <section
      aria-labelledby={id}
      className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40"
    >
      <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        <h2
          id={id}
          className="text-sm font-semibold text-zinc-800 dark:text-zinc-100"
        >
          {title}
        </h2>
        <div className="md:col-span-3">{children}</div>
      </div>
    </section>
  )
}
