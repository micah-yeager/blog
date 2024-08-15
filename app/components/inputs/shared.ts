import type { ReactNode } from "react"

/** Properties shared by form components. */
export type SharedFormProps = {
  /** The display label for the input. */
  label?: ReactNode
  /** A description of the input's purpose. */
  description?: ReactNode
  /** An error message to display. */
  error?: ReactNode
}
