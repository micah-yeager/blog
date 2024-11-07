import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, test } from "vitest"
import type { FCCase } from "../../../test/types"
import { SimpleLayout } from "./SimpleLayout"

afterEach(cleanup)

test.each([
  {
    testName: "empty",
    title: "title",
    intro: "intro",
  },
  {
    testName: "contentful",
    title: "title",
    intro: "intro",
    children: "content",
  },
] satisfies FCCase<typeof SimpleLayout>[])(
  "$testName SimpleLayout",
  ({ testName: _, ...props }) => {
    render(<SimpleLayout {...props} />)

    screen.getByRole("heading", { name: props.title })
    screen.getByText(props.intro)
    if (props.children) {
      screen.getByText(props.children)
    }
  },
)
