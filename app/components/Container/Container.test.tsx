import { cleanup, render, screen } from "@testing-library/react"
import type { FCCase } from "test/types"
import { afterEach, test } from "vitest"
import { Container, ContainerInner, ContainerOuter } from "./Container"

afterEach(cleanup)

test.each([
  { testName: "empty" },
  { testName: "contentful", children: "content" },
] satisfies FCCase<typeof ContainerOuter>[])(
  "$testName ContainerOuter",
  ({ testName, ...props }) => {
    render(<ContainerOuter {...props} data-testid={testName} />)

    screen.getByTestId(testName)
    if (props.children) {
      screen.getByText(props.children)
    }
  },
)

test.each([
  { testName: "empty" },
  { testName: "contentful", children: "content" },
] satisfies FCCase<typeof ContainerInner>[])(
  "$testName ContainerInner",
  ({ testName, ...props }) => {
    render(<ContainerInner {...props} data-testid={testName} />)

    screen.getByTestId(testName)
    if (props.children) {
      screen.getByText(props.children)
    }
  },
)

test.each([
  { testName: "empty" },
  { testName: "contentful", children: "content" },
] satisfies FCCase<typeof Container>[])(
  "$testName Container",
  ({ testName, ...props }) => {
    render(<Container {...props} data-testid={testName} />)

    screen.getByTestId(testName)
    if (props.children) {
      screen.getByText(props.children)
    }
  },
)
