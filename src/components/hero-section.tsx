import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Heart,
  HeartHandshake,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative isolate bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-32 size-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-24 top-10 size-80 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-16 xl:gap-20">
        <div className="mx-auto w-full max-w-2xl">
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold text-primary sm:text-sm">
            <Sparkles size={15} className="shrink-0" />
            <span>Together, We Make a Difference</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-[58px]">
            Small Actions.
            <span className="mt-2 block text-primary">
              Greater Impact.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Every positive change starts with someone who cares. Discover
            meaningful community events, meet inspiring people, and turn your
            kindness into real-world impact.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/events"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-center text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              <CalendarDays size={18} className="shrink-0" />
              Explore Upcoming Events
              <ArrowRight size={17} className="shrink-0" />
            </Link>

            <Link
              href="/create-event"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-bold text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
            >
              <HeartHandshake size={18} className="shrink-0" />
              Create an Event
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users size={19} />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">One Community</p>
                <p className="text-xs text-muted-foreground">United for good</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
                <Heart size={19} />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">Real Impact</p>
                <p className="text-xs text-muted-foreground">Every action matters</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[500px] lg:justify-self-end">
          <div className="pointer-events-none absolute -right-4 -top-4 size-24 rounded-full border-[15px] border-primary/10 sm:-right-6 sm:-top-6 sm:size-28" />
          <div className="pointer-events-none absolute -bottom-5 -left-5 size-28 rounded-full bg-amber-400/10 blur-2xl" />

          <div className="relative rounded-[1.75rem] border border-border bg-card p-4 shadow-xl shadow-primary/10 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground sm:text-sm">
                  Make today meaningful
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-foreground sm:text-2xl">
                  Be the reason
                  <br />
                  someone smiles.
                </h2>
              </div>

              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <HeartHandshake size={24} />
              </span>
            </div>

            <div className="relative mt-5 flex min-h-[190px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-amber-400/20 sm:min-h-[220px]">
              <div className="absolute left-8 top-8 size-16 rounded-full bg-amber-400/20 blur-xl" />
              <div className="absolute bottom-5 right-8 size-20 rounded-full bg-primary/20 blur-2xl" />

              <div className="relative flex items-end justify-center gap-3 sm:gap-5">
                <div className="flex size-20 items-center justify-center rounded-t-[2.5rem] rounded-b-2xl bg-primary/80 text-primary-foreground shadow-lg sm:size-24">
                  <Users size={36} strokeWidth={1.5} />
                </div>

                <div className="mb-4 flex size-24 items-center justify-center rounded-t-[3rem] rounded-b-2xl bg-amber-400 text-amber-950 shadow-lg sm:size-28">
                  <Heart size={42} strokeWidth={1.5} />
                </div>

                <div className="flex size-20 items-center justify-center rounded-t-[2.5rem] rounded-b-2xl bg-emerald-600 text-white shadow-lg sm:size-24">
                  <HeartHandshake size={36} strokeWidth={1.5} />
                </div>
              </div>

              <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1.5 text-[11px] font-bold text-primary shadow-sm">
                Kindness connects us
              </span>

              <span className="absolute bottom-3 right-3 rounded-full bg-background/90 px-3 py-1.5 text-[11px] font-bold text-foreground shadow-sm">
                <Sparkles className="mr-1 inline" size={12} />
                Spread positivity
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-secondary/70 p-3 sm:p-4">
                <div className="flex items-center gap-2 text-primary">
                  <CalendarDays size={16} />
                  <span className="text-xs font-semibold">Join an event</span>
                </div>
                <p className="mt-1.5 text-sm font-bold text-foreground">
                  Give your time
                </p>
              </div>

              <div className="rounded-xl bg-secondary/70 p-3 sm:p-4">
                <div className="flex items-center gap-2 text-primary">
                  <MapPin size={16} />
                  <span className="text-xs font-semibold">Your community</span>
                </div>
                <p className="mt-1.5 text-sm font-bold text-foreground">
                  Create change
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
