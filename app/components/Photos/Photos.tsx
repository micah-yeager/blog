import clsx from "clsx"
import type { ComponentPropsWithoutRef } from "react"
import type { SetRequired } from "type-fest"

/** Photo definition for the {@link Photos} component. */
type Photo = {
  /** The source URI to display. */
  src: string
  /** The alt-text to display. */
  alt: string
  /** Classes to apply. */
  className?: string
}

const photos: Photo[] = [
  {
    src: "/images/bean-couch.jpeg",
    alt: "Our cat, Bean, sitting attentively on the couch",
  },
  {
    src: "/images/dorian-bird-watching.jpeg",
    alt: "Our cat, Dorian, bird-watching at the window",
  },
  {
    src: "/images/sanya-books.jpeg",
    alt: "Our cat, Sanya, sitting on a stack of books",
  },
  {
    src: "/images/pippin-couch.jpeg",
    alt: "Our cat, Pippin, laying lazily on the couch",
  },
  {
    src: "/images/bast-sink.jpeg",
    alt: "Our cat, Bast, sitting on a sink",
  },
]

/**
 * A frame for a single {@link Photo}.
 *
 * @see {@link HTMLDivElement}
 */
function PhotoFrame({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...rest}
      className={clsx(
        "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
        className,
      )}
    >
      {children}
    </div>
  )
}

/**
 * A photo for the {@link Photos} display.
 *
 * @see {@link HTMLImageElement}
 */
function Photo({
  alt,
  className,
  ...rest
}: SetRequired<ComponentPropsWithoutRef<"img">, "alt">) {
  return (
    <img
      {...rest}
      // separate out alt to satisfy linter
      alt={alt}
      sizes="(min-width: 640px) 18rem, 11rem"
      className={clsx("absolute inset-0 h-full w-full object-cover", className)}
    />
  )
}

/**
 * A collection of multiple skewed {@link Photo}s to display across the screen
 * horizontally.
 */
export function Photos() {
  const rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ]

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {photos.map(({ src, alt }, index) => (
          <PhotoFrame className={rotations[index]} key={src}>
            <Photo src={src} alt={alt} />
          </PhotoFrame>
        ))}
      </div>
    </div>
  )
}
