import { ContactMe } from "~/components/ContactMe"
import { Container } from "~/components/Container"
import { mergeMeta } from "~/utils/meta"

export const meta = mergeMeta(() => [{ title: "About" }])

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      {/* photo */}
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <img
              src="/images/me-sitting.jpeg"
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>

        {/* main */}
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            I’m Micah Yeager. I like learning and building things.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I’ve messed around with computers for longer than I can remember.
              Some of my earliest memories involve rummaging around in the guts
              of our old family desktop computer while brandishing a pair of
              wire cutters, because the wires made a very satisfying "snip"
              sound when I cut them. Little did I know, this little act of
              wanton destruction would spark a lifelong passion for technology.
            </p>
            <p>
              Working in IT never really occurred to me until I was in college.
              I had a presentation project, and making yet another slideshow
              felt boring to me. So, I decided to create a website instead.
              Because why not, right? How hard could it be?
            </p>
            <p>
              I quickly discovered that it was, in fact, more difficult than I
              had anticipated — I wanted it to be cool and modern, dammit!
              However, I persevered out of sheer stubbornness, and I came out
              with something that I was reasonably pleased with. Because of that
              project, I ended up with an internship to help redesign the
              college’s public website, and I’ve been hooked ever since.
            </p>
            <p>
              I’ve learned a lot since that project, and I’ll never stop
              learning. I’m not satisfied with "good enough" — I’m always
              looking for ways to improve systems, processes, and myself. Maybe
              I won’t change the world, but I can certainly do my best to make
              it just a little bit better.
            </p>
          </div>
        </div>

        {/* contact */}
        <div className="lg:pl-20">
          <ContactMe className="w-full" />
        </div>
      </div>
    </Container>
  )
}
