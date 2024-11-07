import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, test } from "vitest"
import type { FCCase } from "../../../test/types"
import { LoadingIndicator } from "./LoadingIndicator"

afterEach(cleanup)

test.each([
  {
    testName: "default",
  },
  {
    testName: "spinner",
    variant: "spinner",
  },
  {
    testName: "subtle",
    variant: "subtle",
  },
] satisfies FCCase<typeof LoadingIndicator>[])(
  "$testName LoadingIndicator",
  ({ testName, ...props }) => {
    render(<LoadingIndicator {...props} data-testid={testName} />)

    screen.getByTestId(testName)
    screen.getByText("Loading")
  },
)
