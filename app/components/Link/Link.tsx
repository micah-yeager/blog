import { DataInteractive } from "@headlessui/react"
import type { LinkProps } from "react-router";
import { Link as RemixLink } from "react-router";
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
  },
)
