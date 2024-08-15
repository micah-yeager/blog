import type { Jsonify } from "type-fest"
import { DateTime } from "luxon"

import type { PostMeta } from "@services/posts.server"

import { Card } from "./Card"

/**
 * A preview of a blog post.
 *
 * @param meta - The metadata for the post.
 * @component
 */
export function PostOverview({ meta }: { meta: Jsonify<PostMeta> }) {
  const date = meta.updated
    ? DateTime.fromISO(meta.updated)
    : DateTime.fromISO(meta.created)

  return (
    <Card as="article">
      <Card.Title to={`/posts/${meta.slug}`}>{meta.title}</Card.Title>
      <Card.Meta as="time" dateTime={date.toISODate() ?? undefined} decorate>
        {date.toLocaleString(DateTime.DATE_FULL)}
      </Card.Meta>
      <Card.Description>{meta.description}</Card.Description>
      <Card.CallToAction>Read post</Card.CallToAction>
    </Card>
  )
}
