import { createRemixStub } from "@remix-run/testing"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { afterEach, test } from "vitest"
import { CV } from "./CV"

afterEach(cleanup)

test("CV", async () => {
  const RemixStub = createRemixStub([
    {
      path: "/",
      Component() {
        return <CV />
      },
    },
  ])

  render(<RemixStub />)

  await waitFor(() => screen.findByRole("link"))
})
