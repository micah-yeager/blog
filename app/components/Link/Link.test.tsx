import { createRemixStub } from "@remix-run/testing"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { afterEach, test } from "vitest"
import { Link } from "./Link"

afterEach(cleanup)

test("Link", async () => {
  const RemixStub = createRemixStub([
    {
      path: "/",
      Component() {
        return <Link to="/" data-testid="Link" />
      },
    },
  ])

  render(<RemixStub />)

  await waitFor(() => screen.getByTestId("Link"))
  await waitFor(() => screen.findByRole("link"))
})
