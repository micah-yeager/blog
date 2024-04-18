import type { ComponentPropsWithoutRef } from "react"
import clsx from "clsx"

type Photo = {
  src: string
  alt: string
  className?: string
}

const photos: Photo[] = [
  {
    src: "/images/bean-couch.jpeg",
    alt: "Our cat, Bean, sitting attentively on the couch"
  },
  {
    src: "/images/dorian-bird-watching.jpeg",
    alt: "Our cat, Dorian, bird-watching at the window"
  },
  {
    src: "/images/sanya-books.jpeg",
    alt: "Our cat, Sanya, sitting on a stack of books"
  },
  {
    src: "/images/pippin-couch.jpeg",
    alt: "Our cat, Pippin, laying lazily on the couch"
  },
  {
    src: "/images/bast-sink.jpeg",
    alt: "Our cat, Bast, sitting on a sink"
  }
]

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
        className
      )}
    >
      {children}
    </div>
  )
}

type PhotoProps = Omit<ComponentPropsWithoutRef<"img">, "alt"> &
  Required<Pick<ComponentPropsWithoutRef<"img">, "alt">>

function Photo({ alt, className, ...rest }: PhotoProps) {
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

export function Photos() {
  let rotations = ["rotate-2", "-rotate-2", "rotate-2", "rotate-2", "-rotate-2"]

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
