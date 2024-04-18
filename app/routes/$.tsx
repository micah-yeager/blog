import { mergeMeta } from "~/utils/meta"

export const meta = mergeMeta(() => [{ title: "Not Found" }])

export async function loader() {
  // Throw an actual error to be caught by the error boundary.
  throw new Response(
    "Not all who wander are lost, but the page you’re looking for is.",
    {
      status: 404,
      statusText: "Not found"
    }
  )
}

// This will never be rendered, but it's required to make the route work.
export default function SplatRoute() {
  return null
}
