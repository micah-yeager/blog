import { createRemixStub } from "@remix-run/testing"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { afterEach, test } from "vitest"
import { Link } from "./Link"

afterEach(cleanup)

test("Link", async () => {
  const testId = "Link"
  const content = "content"
  const RemixStub = createRemixStub([
    {
      path: "/",
      Component() {
        return (
          <Link to="/" data-testid={testId}>
            {content}
          </Link>
        )
      },
    },
  ])

  render(<RemixStub />)

  await waitFor(() => screen.getByTestId(testId))
  await waitFor(() => screen.findByRole("link"))
  await waitFor(() => screen.findByText(content))
})
