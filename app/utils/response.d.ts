import { EmptyObject } from "type-fest"

/**
 * The general shape of a form's fields.
 *
 * @see ActionResponse
 */
type Fields = Record<string, unknown>
/**
 * Errors for a form's fields.
 *
 * @see Fields
 * @see ActionResponse
 */
export type FieldErrors<T extends Fields> = Partial<Record<keyof T, string>>

/** A structure for consistent action return types. */
export type ActionResponse<F extends Fields = EmptyObject, R = undefined> = {
  /** The submitted form's fields, if any. */
  fields?: F
  /** Any errors for the form's fields. */
  fieldErrors?: FieldErrors<F>
  /** Any errors for the form submission. */
  formError?: string
} & (R extends undefined
  ? EmptyObject
  : {
      /** The result of the form submission. */
      result?: R
    })
