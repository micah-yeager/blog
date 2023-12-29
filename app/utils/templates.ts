export function tw(...params: Parameters<typeof String.raw>) {
  return String.raw(...params)
}
