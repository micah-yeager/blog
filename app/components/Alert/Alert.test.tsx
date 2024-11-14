import { cleanup, screen } from "@testing-library/react"
import { render } from "@testing-library/react"
import type { FCCase } from "test/types"
import { afterEach, test } from "vitest"
import { Alert } from "./Alert"

afterEach(cleanup)

test.each([
  {
    testName: "empty",
    variant: "info",
  },
  {
    testName: "contentful",
    variant: "info",
    children: "content",
  },
  {
    testName: "empty titled",
    variant: "info",
    title: "title",
  },
  {
    testName: "contentful titled",
    variant: "info",
    title: "title",
    children: "content",
  },
] satisfies FCCase<typeof Alert>[])(
  "$testName Badge",
  ({ testName, ...props }) => {
    render(<Alert {...props} data-testid={testName} />)

    screen.getByTestId(testName)
    if (props.children) {
      screen.getByText(props.children)
    }
  },
)
