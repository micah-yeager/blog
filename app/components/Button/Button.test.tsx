import { createRemixStub } from "@remix-run/testing"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import type { FCCase } from "test/types"
import { afterEach, test } from "vitest"
import { Button, TouchTarget } from "./Button"

afterEach(cleanup)

test("TouchTarget", async () => {
  render(<TouchTarget>content</TouchTarget>)

  await waitFor(() => screen.findByText("content"))
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
  async ({ testName: _, ...props }) => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component() {
          return <Button {...props} />
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
