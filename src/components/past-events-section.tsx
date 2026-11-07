import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Images, Heart } from "lucide-react";

const pastEvents = [
  {
    title: "Community Tree Planting",
    category: "Environment",
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc",
    description: "Growing a greener and healthier community together.",
  },
  {
    title: "Food Donation Drive",
    category: "Community Support",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433",
    description: "Sharing food and kindness with families in need.",
  },
  {
    title: "Neighborhood Cleanup",
    category: "Environment",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    description: "Working together to create cleaner public spaces.",
  },
  {
    title: "Education for Everyone",
    category: "Education",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    description: "Supporting learning and brighter opportunities.",
  },
];

export function PastEventsSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
              <Images size={15} />
              Moments That Matter
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Our Community <span className="text-primary">Memories</span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              A look back at the moments, people, and positive actions that
              bring our community closer together.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Heart size={17} />
            Together, We Make Memories
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pastEvents.map((event, index) => (
            <article
              key={event.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="relative h-64 overflow-hidden bg-secondary">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1.5 text-xs font-bold text-primary shadow-sm">
                  {event.category}
                </span>

                <span className="absolute bottom-4 left-4 text-sm font-bold text-white">
                  0{index + 1} / 04
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                  {event.title}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                  {event.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Kindora Community
                  </span>

                  <ArrowUpRight
                    size={18}
                    className="text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/events"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Explore More Events
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
