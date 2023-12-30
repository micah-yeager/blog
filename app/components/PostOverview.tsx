import { DateTime } from "luxon"

import { Card } from "~/components/Card"
import type { PostMeta } from "~/utils/post.server"

export function PostOverview({ postMeta }: { postMeta: PostMeta }) {
  const date = DateTime.fromISO(postMeta.frontmatter.date)

  return (
    <Card as="article">
      <Card.Title to={`/posts/${postMeta.slug}`}>
        {postMeta.frontmatter.title}
      </Card.Title>
      <Card.Meta as="time" dateTime={postMeta.frontmatter.date} decorate>
        {date.toLocaleString(DateTime.DATE_FULL)}
      </Card.Meta>
      <Card.Description>{postMeta.frontmatter.description}</Card.Description>
      <Card.Action>Read</Card.Action>
    </Card>
  )
}
