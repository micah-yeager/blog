import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, test } from "vitest"
import { Prose } from "./Prose"

afterEach(cleanup)

test("Prose", () => {
  const testId = "Prose"
  const content = "content"

  render(<Prose data-testid={testId}>{content}</Prose>)

  screen.getByTestId(testId)
  screen.getByText(content)
})
