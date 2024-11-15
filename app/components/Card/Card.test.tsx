import { createRemixStub } from "@remix-run/testing"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import type { FCCase } from "test/types"
import { afterEach, test } from "vitest"
import { Card } from "./Card"

afterEach(cleanup)

test.each([
  { testName: "default", children: "content" },
  { testName: "section", children: "content", as: "main" },
] as const satisfies FCCase<typeof Card>[])(
  "$testName Card",
  ({ testName, ...props }) => {
    render(<Card {...props} data-testid={testName} />)

    screen.getByTestId(testName)
    screen.getByText(props.children)
    if (props.as) {
      // Not perfect to equate `as` to `role`, but it's good enough for this test.
      screen.getByRole(props.as)
    }
  },
)

test.each([
  { testName: "empty", to: "#" },
  { testName: "contentful", to: "#", children: "content" },
] satisfies FCCase<typeof Card.Link>[])(
  "$testName Card.Link",
  async ({ testName, ...props }) => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component() {
          return <Card.Link {...props} data-testid={testName} />
        },
      },
    ])

    render(<RemixStub />)

    await waitFor(() => screen.findByTestId(testName))
    await waitFor(() => screen.findByRole("link"))
    if (props.children) {
      await waitFor(() => screen.findByText(props.children))
    }
  },
)

test.each([
  { testName: "empty" },
  { testName: "contentful", children: "content" },
  { testName: "h3", as: "h3" },
  { testName: "link", to: "#" },
] as const satisfies FCCase<typeof Card.Title>[])(
  "$testName Card.Title",
  async ({ testName, ...props }) => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component() {
          return <Card.Title {...props} data-testid={testName} />
        },
      },
    ])

    render(<RemixStub />)

    await waitFor(() => screen.findByTestId(testName))
    if (props.children) {
      await waitFor(() => screen.findByText(props.children))
    }
    if (props.to) {
      await waitFor(() => screen.findByRole("link"))
    }
    if (props.as) {
      // TODO: have a more robust test for the `as` prop.
      await waitFor(() => screen.findByRole("heading", { level: 3 }))
    }
  },
)

test.each([
  { testName: "empty" },
  { testName: "contentful", children: "content" },
] satisfies FCCase<typeof Card.Description>[])(
  "$testName Card.Description",
  ({ testName, ...props }) => {
    render(<Card.Description {...props} data-testid={testName} />)

    screen.getByTestId(testName)
    if (props.children) {
      screen.getByText(props.children)
    }
  },
)

test.each([
  { testName: "empty" },
  { testName: "contentful", children: "content" },
] satisfies FCCase<typeof Card.CallToAction>[])(
  "$testName Card.CallToAction",
  ({ testName, ...props }) => {
    render(<Card.CallToAction {...props} data-testid={testName} />)

    screen.getByTestId(testName)
    if (props.children) {
      screen.getByText(props.children)
    }
  },
)

test.each([
  { testName: "empty" },
  { testName: "contentful", children: "content" },
  { testName: "decorated", decorate: true },
  { testName: "main", as: "main" },
] as const satisfies FCCase<typeof Card.Meta>[])(
  "$testName Card.Meta",
  ({ testName, ...props }) => {
    render(<Card.Meta {...props} data-testid={testName} />)

    screen.getByTestId(testName)
    if (props.children) {
      screen.getByText(props.children)
    }
    if (props.as) {
      // Not perfect to equate `as` to `role`, but it's good enough for this test.
      screen.getByRole(props.as)
    }
  },
)
