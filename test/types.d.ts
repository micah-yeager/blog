import type { ComponentPropsWithoutRef, FunctionComponent } from "react"

/**
 * A test case for a function component.
 *
 * @typeParam T - The function component type.
 */
// biome-ignore lint/suspicious/noExplicitAny: This is a test type, so it's fine.
export type FCCase<T extends FunctionComponent<any>> = {
  testName: string
} & ComponentPropsWithoutRef<T>
