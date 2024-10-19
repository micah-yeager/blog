import { cleanup, render, screen } from "@testing-library/react"
import type { FCCase } from "test/types"
import { afterEach, test } from "vitest"
import { Divider } from "./Divider"

afterEach(cleanup)

test.each([
  { testName: "default" },
  { testName: "soft", soft: true },
] satisfies FCCase<typeof Divider>[])(
  "$testName Divider",
  ({ testName, ...props }) => {
    render(<Divider {...props} data-testid={testName} />)

    screen.getByTestId(testName)
  },
)
