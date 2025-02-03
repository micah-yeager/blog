import { createRoutesStub } from "react-router";
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { afterEach, test } from "vitest"
import { FULL_NAME } from "../../constants"
import { Footer } from "./Footer"

afterEach(cleanup)

test("Footer", async () => {
  const RemixStub = createRoutesStub([
    {
      path: "/",
      Component() {
        return <Footer />
      },
    },
  ])

  render(<RemixStub />)

  await waitFor(() => screen.findByText(RegExp(FULL_NAME)))
})
