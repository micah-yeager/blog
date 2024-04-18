import type { LoaderFunction, MetaFunction } from "@vercel/remix"

/**
 * Merges the meta from the leaf route with the meta from the parents. Assumes
 * that the leaf route overrides the parent meta.
 *
 * @param leafMetaFn The meta function for the leaf route.
 * @returns A new meta function that merges the meta from the leaf route with
 *   the parent routes.
 */
export const mergeMeta = <
  Loader extends LoaderFunction | unknown = unknown,
  ParentsLoaders extends Record<string, LoaderFunction | unknown> = Record<
    string,
    unknown
  >
>(
  leafMetaFn: MetaFunction<Loader, ParentsLoaders>
): MetaFunction<Loader, ParentsLoaders> => {
  return (args) => {
    let leafMeta = leafMetaFn(args)

    // Reduce in reverse order to give priority to the leaf routes' metas.
    return args.matches.reduceRight((acc, match) => {
      for (let parentMeta of match.meta) {
        // Only add the parent's meta property if...
        const index = acc.findIndex(
          (meta) =>
            // ...name is the same, or...
            ("name" in meta &&
              "name" in parentMeta &&
              meta.name === parentMeta.name) ||
            // ...property is the same, or...
            ("property" in meta &&
              "property" in parentMeta &&
              meta.property === parentMeta.property) ||
            // ...title is present in both the leaf and parent meta.
            ("title" in meta && "title" in parentMeta)
        )
        // If not present, add the parent's meta property to the accumulator.
        if (index === -1) {
          acc.push(parentMeta)
          return acc
        }

        // If the title property, append the parent's title to the leaf's title.
        const meta = acc[index]
        if ("title" in meta && "title" in parentMeta) {
          meta.title = `${meta.title} | ${parentMeta.title}`
        }
      }
      return acc
    }, leafMeta)
  }
}
