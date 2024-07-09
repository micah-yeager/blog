import { EmptyObject } from "type-fest"

type Fields = Record<string, unknown>
export type FieldErrors<T extends Fields> = Partial<Record<keyof T, string>>
// Structure for consistent action return types.
export type ActionResponse<F extends Fields = EmptyObject, R = undefined> = {
  fields?: F
  fieldErrors?: FieldErrors<F>
  formError?: string
} & (R extends undefined ? EmptyObject : { result?: R })
