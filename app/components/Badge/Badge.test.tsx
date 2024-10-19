import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { afterEach, test } from "vitest"

import { createRemixStub } from "@remix-run/testing"
import type { ComponentPropsWithoutRef } from "react"
import type { TestCaseMeta } from "test/types"
import { Badge, BadgeButton } from "./Badge"

afterEach(cleanup)

test.each([
  { testName: "empty" },
  {
    testName: "contentful",
    children: "content",
  },
] satisfies (ComponentPropsWithoutRef<typeof Badge> & TestCaseMeta)[])(
  "$testName Badge",
  async ({ testName: _, ...props }) => {
    render(<Badge {...props} />)

    if (props.children) {
      await waitFor(() => screen.findByText(props.children))
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
] satisfies (ComponentPropsWithoutRef<typeof BadgeButton> & TestCaseMeta)[])(
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
  },
)
