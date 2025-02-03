import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { createRoutesStub } from "react-router"
import type { FCCase } from "test/types"
import { afterEach, test } from "vitest"
import { Button, TouchTarget } from "./Button"

afterEach(cleanup)

test("TouchTarget", () => {
  const content = "content"

  render(<TouchTarget>{content}</TouchTarget>)

  screen.getByText(content)
})

test.each([
  { testName: "default", children: "content" },
  { testName: "link", children: "content", to: "#" },
  { testName: "plain", children: "content", plain: true },
  { testName: "outline", children: "content", outline: true },
  { testName: "color", children: "content", color: "red" },
  { testName: "color alias", children: "content", color: "primary" },
] satisfies FCCase<typeof Button>[])(
  "$testName Button",
  async ({ testName, ...props }) => {
    const RemixStub = createRoutesStub([
      {
        path: "/",
        Component() {
          return <Button {...props} data-testid={testName} />
        },
      },
    ])

    render(<RemixStub />)

    await waitFor(() => screen.findByTestId(testName))
    await waitFor(() => screen.findByText(props.children))
    if (props.to) {
      await waitFor(() => screen.findByRole("link"))
    }
  },
)
