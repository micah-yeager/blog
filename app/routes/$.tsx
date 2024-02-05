import { AppError } from "~/components/AppError"
import { mergeMeta } from "~/utils/meta"

export const meta = mergeMeta(() => [{ title: "Not Found" }])

export async function loader() {
  throw new Response(null, {
    status: 404,
    statusText: "Not found",
  })
}

export default function SplatRoute() {
  return null
}

export function ErrorBoundary() {
  return (
    <AppError
      code={404}
      title="Not found"
      description="Not all who wander are lost, but the page you’re looking for is."
    />
  )
}
