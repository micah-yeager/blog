import fastGlob from "fast-glob"
import { toString } from "hast-util-to-string"
import { bundleMDX } from "mdx-bundler"
import path from "node:path"
import type { Options as AutolinkOptions } from "rehype-autolink-headings"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMdxImages from "remark-mdx-images"
import type { Options as TocOptions } from "remark-toc"
import remarkToc from "remark-toc"

import { tw } from "~/utils/templates"

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
        remarkMdxImages,
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
                className: tw`group/LinkedHeading relative -ml-12 pl-12`,
              },
              children: [],
            },
            properties: (element) => ({
              className: tw`invisible absolute top-1/2 -ml-8 -translate-y-1/2 px-1 text-zinc-500 group-hover/LinkedHeading:visible`,
              ariaLabel: `Section titled: ${toString(element)}`,
            }),
            content: [
              {
                type: "element",
                tagName: "svg",
                properties: {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  className: tw`size-5 text-zinc-500`,
                  ariaHidden: true,
                },
                children: [
                  {
                    type: "element",
                    tagName: "path",
                    properties: {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244",
                    },
                    children: [],
                  },
                ],
              },
            ],
          } as AutolinkOptions,
        ],
      ]
      return options
    },

    // Define build options.
    esbuildOptions(options) {
      // Use the same target as the root app, needs to be set since it would
      // otherwise default to `esnext`.
      options.target = "ES2022"
      // Inline images.
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

  // Add the slug to the post.
  const slug = path.basename(path.dirname(file))
  return { ...mdx, slug }
}
