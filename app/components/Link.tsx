import type { LinkProps } from "@remix-run/react"
import { DataInteractive } from "@headlessui/react"
import { Link as RemixLink } from "@remix-run/react"
import { forwardRef } from "react"

/**
 * A link that provides additional context to assistive technologies.
 *
 * @see Remix's {@link Link}
 * @see Headless UI's {@link DataInteractive}
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    return (
      <DataInteractive>
        <RemixLink {...props} ref={ref} />
      </DataInteractive>
    )
  }
)
