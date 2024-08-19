import type { LinkProps } from "@remix-run/react"
import { DataInteractive } from "@headlessui/react"
import { Link as RemixLink } from "@remix-run/react"
import { forwardRef } from "react"

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    return (
      <DataInteractive>
        <RemixLink {...props} ref={ref} />
      </DataInteractive>
    )
  }
)
