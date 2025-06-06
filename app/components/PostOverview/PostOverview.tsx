import { DateTime } from "luxon"
import type { PostMeta } from "~/services/posts.server"
import { Card } from "../Card"

/** Properties for the {@link PostOverview} component. */
type PostOverviewProps = {
  /**
   * The metadata for the post
   *
   * @see {@link PostMeta}
   */
  meta: PostMeta
}

/**
 * A preview of a blog post.
 *
 * @param meta - The metadata for the post.
 * @see {@link PostOverviewProps}
 */
export function PostOverview({ meta }: PostOverviewProps) {
  const date = meta.updated
    ? DateTime.fromJSDate(meta.updated)
    : DateTime.fromJSDate(meta.created)

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
