import { LinkIcon } from "@heroicons/react/24/outline"
import fastGlob from "fast-glob"
import { fromHtml as hastFromHtml } from "hast-util-from-html"
import { toString as hastToString } from "hast-util-to-string"
import { bundleMDX } from "mdx-bundler"
import { renderToString } from "react-dom/server"
import type { Options as AutolinkOptions } from "rehype-autolink-headings"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import remarkMdxImages from "remark-mdx-images"
import type { Options as TocOptions } from "remark-toc"
import remarkToc from "remark-toc"
import tsconfigJson from "tsconfig.json" with { type: "json" }
import type { DistributedOmit } from "type-fest"
import { z } from "zod"

import { Icon } from "@ui/Icon"
import { tw } from "@utils/templates"

import { FULL_NAME } from "../constants"

/** Schema for a post's frontmatter. */
const frontmatterSchema = z.object({
  /** The title of the post. */
  title: z.string().min(1).max(60),
  /** A brief description for the post preview. */
  description: z.string().min(1).max(160),
  /** The associated tags. */
  tags: z.array(z.string().min(1)).default([]),
  /** The post's authors. */
  authors: z.array(z.string().min(1)).default([FULL_NAME]),
  /** The date the post was created. */
  created: z.date(),
  /** The date the post was last updated. */
  updated: z.date().optional(),
})
/**
 * Frontmatter for a post.
 *
 * @see frontmatterSchema
 */
export type PostFrontmatter = z.infer<typeof frontmatterSchema>

/** Schema for a post's slug. */
const slugSchema = z.object({ slug: z.string() })
/**
 * Schema for a post's metadata.
 *
 * @see frontmatterSchema
 * @see slugSchema
 */
const postMetaSchema = frontmatterSchema.merge(slugSchema)
/**
 * Schema for an unsaved post's metadata.
 *
 * @see frontmatterSchema
 * @see slugSchema
 */
const unsavedPostMetaSchema = frontmatterSchema.merge(slugSchema.partial())
/**
 * Metadata for a post.
 *
 * @see postMetaSchema
 */
export type PostMeta = z.infer<typeof postMetaSchema>
/**
 * Metadata for an unsaved post.
 *
 * @see unsavedPostMetaSchema
 */
export type UnsavedPostMeta = z.infer<typeof unsavedPostMetaSchema>

/** The path to the posts' directory. */
const postsPath = `${process.cwd()}/content/posts`

/**
 * Get all posts' metadata.
 *
 * @returns The metadata for all posts.
 */
export async function getAllPosts(): Promise<PostMeta[]> {
  // get all postMetas from local filesystem
  const postFilenames = await fastGlob.glob("*/page.mdx", { cwd: postsPath })
  const posts = await Promise.all(
    postFilenames.map((file) =>
      getPost({ file: `${postsPath}/${file}`, cwd: postsPath }),
    ),
  )

  return (
    posts
      // Sort by updated date, or created date if updated date is not available.
      .sort(
        (a, z) =>
          +new Date(z.meta.updated ?? z.meta.created) -
          +new Date(a.meta.updated ?? a.meta.created),
      )
      // Extract metadata.
      .map(({ meta }) => meta)
  )
}

/**
 * Get a file path from a post's slug.
 *
 * @param slug The slug of the post.
 */
function fileFromSlug(slug: string) {
  return `${postsPath}/${slug}/page.mdx`
}

/**
 * Get a slug from a file path.
 *
 * @param file The file path of the post.
 */
function slugFromFile(file: string) {
  return file.replace(`${postsPath}/`, "").replace("/page.mdx", "")
}

/** The base post type, excluding metadata. */
type BasePost = Omit<
  Awaited<ReturnType<typeof bundleMDX<PostFrontmatter>>>,
  "frontmatter" | "matter"
>
/**
 * A post with metadata.
 *
 * @see BasePost
 */
export type Post = BasePost & { meta: PostMeta }
/**
 * An unsaved post with metadata.
 *
 * @see BasePost
 */
export type UnsavedPost = BasePost & { meta: UnsavedPostMeta }

/**
 * An {@link Icon} component rendered to a Hast tree.
 *
 * @see getPost
 */
// Defined outside the `getPost` function, so it's only rendered once.
const linkIconHast = hastFromHtml(
  renderToString(
    <Icon as={LinkIcon} className="size-5 text-zinc-500" aria-hidden />,
  ),
  { fragment: true },
).children

/**
 * Arguments for {@link getPost}.
 *
 * @see getPost
 */
// Use `DistributedOmit` to avoid messing up union type.
type GetPostArgs = DistributedOmit<
  Parameters<typeof bundleMDX>[0],
  "mdxOptions" | "esbuildOptions"
>

/**
 * Parse a post from an MDX file.
 *
 * @param args - Arguments ({@link GetPostArgs}) for `bundleMDX`. If `file` is
 *   provided but doesn't have the `.mdx` extension, it will be assumed to be a
 *   slug and formatted accordingly.
 */
export async function getPost<Args extends GetPostArgs>(
  args: Args,
): Promise<Args extends { file: string } ? Post : UnsavedPost> {
  args.cwd ??= postsPath

  // Normalize file input.
  args.file =
    args.file && !args.file.endsWith(".mdx")
      ? fileFromSlug(args.file)
      : args.file

  // Parse MDX file, separating the returned `matter` and `frontmatter`.
  const {
    matter: _,
    frontmatter,
    ...mdx
  } = await bundleMDX<PostFrontmatter>({
    ...args,

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
          // Link an inserted icon before the heading text, not the heading
          // text itself.
          {
            behavior: "before",
            // Wrap both the link and heading for easier positioning.
            group: {
              type: "element",
              tagName: "div",
              properties: {
                // Create space for the inserted icon.
                className: tw`group/LinkedHeading relative -ml-12 pl-12`,
              },
              children: [],
            },
            // Styles for the link itself.
            properties: (element) => ({
              className: tw`invisible absolute top-1/2 -ml-8 -translate-y-1/2 px-1 text-zinc-500 group-hover/LinkedHeading:visible`,
              ariaLabel: `Section titled: ${hastToString(element)}`,
            }),
            // Link content, an icon in this case.
            content: linkIconHast,
          } as AutolinkOptions,
        ],
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
        ".webp": "dataurl",
      }
      return options
    },
  })

  // Parse frontmatter.
  const parsedFrontmatter = frontmatterSchema.parse(frontmatter)
  if (args.file) {
    return {
      ...mdx,
      // Add the slug to the meta.
      meta: { ...parsedFrontmatter, slug: slugFromFile(args.file) },
    }
  }
  // @ts-expect-error TODO: figure out how to inform TS that this is the
  //                   correct type.
  return { ...mdx, meta: parsedFrontmatter }
}
