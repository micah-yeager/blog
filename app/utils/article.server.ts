import { kv } from "@vercel/kv"
import fastGlob from "fast-glob"
import { bundleMDX } from "mdx-bundler"
import path from "node:path"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import remarkMdxImages from "remark-mdx-images"

type ArticleFrontmatter = {
  title: string
  description: string
  date: string
}
export type ArticleMeta = {
  slug: string
  frontmatter: ArticleFrontmatter
}

const ARTICLES_CACHE_KEY = "articles"

export async function getAllArticles() {
  // check if we have a cached result
  const cachedArticleMetas = await kv.get<ArticleMeta[]>(ARTICLES_CACHE_KEY)
  if (cachedArticleMetas) return cachedArticleMetas

  // get all articleMetas from local filesystem
  const cwd = `${process.cwd()}/content/articles`
  let articleFilenames = await fastGlob.glob("*/page.mdx", { cwd })
  let articles = await Promise.all(
    articleFilenames.map((file) => {
      return getArticle({ file: `${cwd}/${file}`, cwd })
    }),
  )

  // sort articleMetas by date and extract frontmatter / slug
  const sortedArticleMetas = articles
    .sort(
      (a, z) => +new Date(z.frontmatter.date) - +new Date(a.frontmatter.date),
    )
    .map(({ frontmatter, slug }) => ({
      frontmatter,
      slug,
    }))

  // cache the result
  await kv.set(ARTICLES_CACHE_KEY, sortedArticleMetas, {
    ex: 60 * 60 * 24, // 24 hours
  })
  return sortedArticleMetas
}

export type Article = Awaited<ReturnType<typeof bundleMDX>> & {
  slug: string
}

export async function getArticle({
  file,
  ...rest
}: Omit<
  Parameters<typeof bundleMDX>[0],
  "source" | "file" | "mdxOptions" | "esbuildOptions" | "grayMatterOptions"
> &
  Required<Pick<Parameters<typeof bundleMDX>[0], "file">>) {
  // parse MDX
  const mdx = await bundleMDX<ArticleFrontmatter>({
    file,
    ...rest,
    // add our plugins
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkMdxImages,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypeHighlight],
      ]
      return options
    },
    esbuildOptions(options) {
      // use the same target as the rest of the app, needs to be set since it defaults to esnext
      options.target = "ES2022"
      // inline images
      options.loader = {
        ...options.loader,
        ".png": "dataurl",
        ".jpg": "dataurl",
        ".jpeg": "dataurl",
        ".gif": "dataurl",
        ".svg": "dataurl",
        ".webp": "dataurl",
      }
      return options
    },
    // auto-generate excerpts
    grayMatterOptions: (options) => {
      options.excerpt = true
      return options
    },
  })

  // add slug to object
  const slug = path.basename(path.dirname(file))
  return { ...mdx, slug }
}
