import { PassThrough } from "node:stream"
import type { AppLoadContext, EntryContext } from "@remix-run/node"
import { createReadableStreamFromReadable } from "@remix-run/node"
import { RemixServer } from "@remix-run/react"
import { renderToPipeableStream } from "react-dom/server"
import { preloadRouteAssets } from "remix-utils/preload-route-assets"

export const streamTimeout = 5_000 // 5 seconds

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  _loadContext: AppLoadContext,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        onShellReady() {
          shellRendered = true
          const body = new PassThrough()
          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set("Content-Type", "text/html")
          preloadRouteAssets(remixContext, responseHeaders)

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          )

          pipe(body)
        },
        onShellError(error: unknown) {
          reject(error)
        },
        onError(error: unknown) {
          // biome-ignore lint/style/noParameterAssign: Valid use case for parameter reassignment.
          responseStatusCode = 500
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error)
          }
        },
      },
    )

    // Automatically timeout the React renderer, giving React one second to
    // flush down the rejected boundary contents
    setTimeout(abort, streamTimeout + 1_000)
  })
}
