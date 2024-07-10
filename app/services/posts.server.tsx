import path from "node:path"

import type { Options as AutolinkOptions } from "rehype-autolink-headings"
import type { Options as TocOptions } from "remark-toc"
import { LinkIcon } from "@heroicons/react/24/outline"
import fastGlob from "fast-glob"
import { fromHtml } from "hast-util-from-html"
import { toString } from "hast-util-to-string"
import { bundleMDX } from "mdx-bundler"
import { renderToString } from "react-dom/server"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMdxImages from "remark-mdx-images"
import remarkToc from "remark-toc"
import tsconfigJson from "tsconfig.json" with { type: "json" }
import { SetRequired } from "type-fest"

import { Icon } from "@ui/Icon"
import { tw } from "@utils/templates"

type PostFrontmatter = {
  title: string
  description: string
  date: string
  [key: string]: string
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
  const postFilenames = await fastGlob.glob("*/page.mdx", { cwd })
  const posts = await Promise.all(
    postFilenames.map((file) => {
      return getPost({ file: `${cwd}/${file}`, cwd })
    })
  )

  // sort postMetas by date and extract frontmatter / slug
  return posts
    .sort(
      (a, z) => +new Date(z.frontmatter.date) - +new Date(a.frontmatter.date)
    )
    .map(({ frontmatter, slug }) => ({
      frontmatter,
      slug
    }))
}

export type Post = Awaited<ReturnType<typeof bundleMDX<PostFrontmatter>>> & {
  slug: string
}

/** An `Icon` component rendered to a Hast tree. */
// Defined outside the `getPost` function, so it's only rendered once.
const linkIconHast = fromHtml(
  renderToString(
    <Icon as={LinkIcon} className="size-5 text-zinc-500" aria-hidden />
  ),
  { fragment: true }
).children

/**
 * Parse a post from an MDX file.
 *
 * @param file The MDX file to parse.
 * @param rest The options to pass to `bundleMDX`.
 */
export async function getPost({
  file,
  ...rest
}: SetRequired<
  Omit<
    Parameters<typeof bundleMDX>[0],
    "source" | "mdxOptions" | "esbuildOptions" | "grayMatterOptions"
  >,
  "file"
>): Promise<Post> {
  // Parse MDX file.
  const mdx = await bundleMDX<PostFrontmatter>({
    file,
    ...rest,

    // Add plugins.
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        [remarkToc, { maxDepth: 3 } as TocOptions],
        remarkGfm,
        remarkMdxImages
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeHighlight,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "before",
            group: {
              type: "element",
              tagName: "div",
              properties: {
                className: tw`group/LinkedHeading relative -ml-12 pl-12`
              },
              children: []
            },
            properties: (element) => ({
              className: tw`invisible absolute top-1/2 -ml-8 -translate-y-1/2 px-1 text-zinc-500 group-hover/LinkedHeading:visible`,
              ariaLabel: `Section titled: ${toString(element)}`
            }),
            // Link content, an icon in this case.
            content: linkIconHast
          } as AutolinkOptions
        ]
      ]
      return options
    },

    // Define build options.
    esbuildOptions(options) {
      // Use the same target as the root app, needs to be set since it would
      // otherwise default to `esnext`.
      options.target = tsconfigJson.compilerOptions.target
      // Inline images.
      options.loader = {
        ...options.loader,
        ".png": "dataurl",
        ".jpg": "dataurl",
        ".jpeg": "dataurl",
        ".gif": "dataurl",
        ".svg": "dataurl",
        ".webp": "dataurl"
      }
      return options
    }
  })

  // Add the slug to the post.
  const slug = path.basename(path.dirname(file))
  return { ...mdx, slug }
}
