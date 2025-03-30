import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { createRoutesStub } from "react-router"
import type { FCCase } from "test/types"
import { afterEach, test } from "vitest"
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
  ({ testName, ...props }) => {
    render(<Badge {...props} data-testid={testName} />)

    screen.getByTestId(testName)
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
  async ({ testName, ...props }) => {
    const RemixStub = createRoutesStub([
      {
        path: "/",
        Component() {
          return <BadgeButton {...props} data-testid={testName} />
        },
      },
    ])

    render(<RemixStub />)

    await waitFor(() => screen.getByTestId(testName))
    await waitFor(() => screen.findByText(props.children))
    if (props.to) {
      await waitFor(() => screen.findByRole("link"))
    }
  },
)
