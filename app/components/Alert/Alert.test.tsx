import { cleanup, screen, waitFor } from "@testing-library/react"
import { render } from "@testing-library/react"
import { afterEach, test } from "vitest"

import type { ComponentPropsWithoutRef } from "react"
import type { TestCaseMeta } from "test/types"
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
] satisfies (ComponentPropsWithoutRef<typeof Alert> & TestCaseMeta)[])(
  "$testName Badge",
  async ({ testName: _, ...props }) => {
    render(<Alert {...props} />)

    if (props.children) {
      await waitFor(() => screen.findByText(props.children))
    }
  },
)
