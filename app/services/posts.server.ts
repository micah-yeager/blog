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
  [key: string]: any
}
export type PostMeta = Pick<
  Awaited<ReturnType<typeof bundleMDX<PostFrontmatter>>>,
  "frontmatter"
> & {
  slug: string
}

export async function getAllPosts(): Promise<PostMeta[]> {
  // get all postMetas from local filesystem
  const cwd = `${process.cwd()}/content/posts`
  let postFilenames = await fastGlob.glob("*/page.mdx", { cwd })
  let posts = await Promise.all(
    postFilenames.map((file) => {
      return getPost({ file: `${cwd}/${file}`, cwd })
    }),
  )

  // sort postMetas by date and extract frontmatter / slug
  return posts
    .sort(
      (a, z) => +new Date(z.frontmatter.date) - +new Date(a.frontmatter.date),
    )
    .map(({ frontmatter, slug }) => ({
      frontmatter,
      slug,
    }))
}

export type Post = Awaited<ReturnType<typeof bundleMDX<PostFrontmatter>>> & {
  slug: string
}

export async function getPost({
  file,
  ...rest
}: Omit<
  Parameters<typeof bundleMDX>[0],
  "source" | "file" | "mdxOptions" | "esbuildOptions" | "grayMatterOptions"
> &
  Required<
    Pick<Parameters<typeof bundleMDX<PostFrontmatter>>[0], "file">
  >): Promise<Post> {
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
  })

  // add slug to object
  const slug = path.basename(path.dirname(file))
  return { ...mdx, slug }
}
