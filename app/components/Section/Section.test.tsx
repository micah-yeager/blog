import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, test } from "vitest"
import { Section } from "./Section"

afterEach(cleanup)

test("Section", () => {
  const title = "title"
  const content = "content"

  render(<Section title={title}>{content}</Section>)

  screen.getByRole("heading", { name: title })
  screen.getByText(content)
})
