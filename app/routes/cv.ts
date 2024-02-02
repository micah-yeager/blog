import { createReadableStreamFromReadable } from "@remix-run/node"
import * as fs from "fs"

export function loader() {
  // Stream the file from the file system to the client.
  const fileStream = createReadableStreamFromReadable(
    fs.createReadStream("content/documents/cv.pdf"),
  )

  return new Response(fileStream, {
    headers: {
      "Content-Disposition": 'attachment; filename="CV - Micah Yeager.pdf"',
      "Content-Type": "application/pdf",
    },
  })
}
