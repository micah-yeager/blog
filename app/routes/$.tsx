export async function loader() {
  throw new Response(null, {
    status: 404,
    statusText: "Not found",
  })
}

export default function SplatRoute() {
  return null
}

export { ErrorBoundary } from "~/components/ErrorBoundary"
