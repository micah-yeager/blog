import { kv } from "@vercel/kv"
import fastGlob from "fast-glob"
import { bundleMDX } from "mdx-bundler"
import path from "node:path"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import remarkMdxImages from "remark-mdx-images"

type PostFrontmatter = {
  title: string
  description: string
  date: string
}
export type PostMeta = {
  slug: string
  frontmatter: PostFrontmatter
}

const POSTS_CACHE_KEY = "posts"

export async function getAllPosts() {
  // check if we have a cached result
  const cachedPostMetas = await kv.get<PostMeta[]>(POSTS_CACHE_KEY)
  if (cachedPostMetas) return cachedPostMetas

  // get all postMetas from local filesystem
  const cwd = `${process.cwd()}/content/posts`
  let postFilenames = await fastGlob.glob("*/page.mdx", { cwd })
  let posts = await Promise.all(
    postFilenames.map((file) => {
      return getPost({ file: `${cwd}/${file}`, cwd })
    }),
  )

  // sort postMetas by date and extract frontmatter / slug
  const sortedPostMetas = posts
    .sort(
      (a, z) => +new Date(z.frontmatter.date) - +new Date(a.frontmatter.date),
    )
    .map(({ frontmatter, slug }) => ({
      frontmatter,
      slug,
    }))

  // cache the result
  await kv.set(POSTS_CACHE_KEY, sortedPostMetas, {
    ex: 60 * 60 * 24, // 24 hours
  })
  return sortedPostMetas
}

export type Post = Awaited<ReturnType<typeof bundleMDX>> & {
  slug: string
}

export async function getPost({
  file,
  ...rest
}: Omit<
  Parameters<typeof bundleMDX>[0],
  "source" | "file" | "mdxOptions" | "esbuildOptions" | "grayMatterOptions"
> &
  Required<Pick<Parameters<typeof bundleMDX>[0], "file">>) {
  // parse MDX
  const mdx = await bundleMDX<PostFrontmatter>({
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