import { DateTime } from "luxon"

import { Card } from "~/components/Card"
import type { ArticleMeta } from "~/utils/article.server"

export function ArticleOverview({ articleMeta }: { articleMeta: ArticleMeta }) {
  const date = DateTime.fromISO(articleMeta.frontmatter.date)

  return (
    <Card as="article">
      <Card.Title to={`/articles/${articleMeta.slug}`}>
        {articleMeta.frontmatter.title}
      </Card.Title>
      <Card.Meta as="time" dateTime={articleMeta.frontmatter.date} decorate>
        {date.toLocaleString(DateTime.DATE_FULL)}
      </Card.Meta>
      <Card.Description>{articleMeta.frontmatter.description}</Card.Description>
      <Card.Action>Read</Card.Action>
    </Card>
  )
}
