import { faCheck } from "@fortawesome/free-solid-svg-icons"
import CheckIcon from "@heroicons/react/24/solid/CheckIcon"
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, expect, test } from "vitest"
import type { FCCase } from "../../../test/types"
import { Icon } from "./Icon"

afterEach(cleanup)

test.each([
  { testName: "Font Awesome", as: faCheck },
  { testName: "Heroicons", as: CheckIcon },
] satisfies FCCase<typeof Icon>[])(
  "$testName Icon",
  async ({ testName, ...props }) => {
    render(<Icon {...props} data-testid={testName} />)

    const element = screen.getByTestId(testName)
    expect(element.tagName).toEqual("svg")
  },
)
