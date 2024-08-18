import type { LinkProps } from "@remix-run/react"
import type { ForwardedRef } from "react"
import { DataInteractive } from "@headlessui/react"
import { Link as RemixLink } from "@remix-run/react"
import { forwardRef } from "react"

export const Link = forwardRef(function Link(
  props: LinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  return (
    <DataInteractive>
      <RemixLink {...props} ref={ref} />
    </DataInteractive>
  )
})
