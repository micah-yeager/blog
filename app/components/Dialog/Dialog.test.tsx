import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import type { FCCase } from "test/types"
import { afterEach, expect, test } from "vitest"
import { Dialog } from "./Dialog"

afterEach(cleanup)

test.each([
  {
    testName: "empty",
    assertions: 1,
    open: true,
    setOpen: (open) => expect(open).toBe(false),
  },
  {
    testName: "contentful",
    assertions: 1,
    open: true,
    setOpen: (open) => expect(open).toBe(false),
    children: "content",
  },
  {
    testName: "callback",
    assertions: 2,
    open: true,
    setOpen: (open) => expect(open).toBe(false),
    onClose: () => expect(true).toBe(true),
  },
  {
    testName: "closed",
    assertions: 1,
    open: false,
    setOpen: () => {},
  },
] satisfies (FCCase<typeof Dialog> & { assertions: number })[])(
  "$testName Dialog",
  async ({ testName, assertions, ...props }) => {
    render(<Dialog {...props} data-testid={testName} />)

    if (!props.open) {
      expect(screen.queryByTestId(testName)).toBeNull()
      expect.assertions(assertions)
      return
    }
    screen.getByTestId(testName)
    if (props.children) {
      screen.getByText(props.children)
    }
    // Ensure close button works.
    fireEvent(
      screen.getByRole("button"),
      new MouseEvent("click", { bubbles: true }),
    )
    expect.assertions(assertions)
  },
)
