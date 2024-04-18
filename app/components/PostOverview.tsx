import { DateTime } from "luxon"

import type { PostMeta } from "~/services/posts.server"
import { Card } from "~/components/Card"

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
      <Card.CallToAction>Read post</Card.CallToAction>
    </Card>
  )
}
