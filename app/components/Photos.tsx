import clsx from "clsx"

type Photos = {
  src: string
  alt: string
  className?: string
}

const photos: Photos[] = [
  {
    src: "/images/corolla-storm-front.jpeg",
    alt: "A storm front rolling in on the beach in Corolla, North Carolina",
  },
  {
    src: "/images/backyard-autumn-tree.jpeg",
    alt: "A tree in our backyard in the fall",
  },
  {
    src: "/images/sanya-books.jpeg",
    alt: "Our cat, Sanya, sitting on a stack of books",
  },
  {
    src: "/images/cancún-umbrella.jpeg",
    alt: "The underside of an umbrella from our honeymoon in Cancún, Mexico",
  },
  {
    src: "/images/bast-sink.jpeg",
    alt: "Our cat, Bast, sitting on a sink",
  },
]

export function Photos() {
  let rotations = ["rotate-2", "-rotate-2", "rotate-2", "rotate-2", "-rotate-2"]

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {photos.map((photo, imageIndex) => (
          <div
            key={photo.src}
            className={clsx(
              "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
              rotations[imageIndex % rotations.length],
            )}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
