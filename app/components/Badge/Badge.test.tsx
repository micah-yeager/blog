import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { afterEach, test } from "vitest"

import { createRemixStub } from "@remix-run/testing"
import type { FCCase } from "test/types"
import { Badge, BadgeButton } from "./Badge"

afterEach(cleanup)

test.each([
  { testName: "empty" },
  {
    testName: "contentful",
    children: "content",
  },
] satisfies FCCase<typeof Badge>[])(
  "$testName Badge",
  async ({ testName: _, ...props }) => {
    render(<Badge {...props} />)

    if (props.children) {
      screen.getByText(props.children)
    }
  },
)

test.each([
  {
    testName: "button",
    children: "content",
  },
  {
    testName: "link",
    children: "content",
    to: "#",
  },
] satisfies FCCase<typeof BadgeButton>[])(
  "$testName BadgeButton",
  async ({ testName: _, ...props }) => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component() {
          return <BadgeButton {...props} />
        },
      },
    ])

    render(<RemixStub />)

    await waitFor(() => screen.findByText(props.children))
    if (props.to) {
      await waitFor(() => screen.findByRole("link"))
    }
  },
)
