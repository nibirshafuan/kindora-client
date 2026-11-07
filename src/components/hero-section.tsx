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
    <section className="relative isolate overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-24 top-20 size-96 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 md:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
            <Sparkles size={16} />
            Together, We Make a Difference
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.13] tracking-tight text-foreground sm:text-5xl lg:text-[64px]">
            Small Actions.
            <span className="mt-2 block text-primary">
              Greater Impact.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            Every positive change starts with someone who cares. Discover
            meaningful community events, meet inspiring people, and turn your
            kindness into real-world impact.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/events"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <CalendarDays size={18} />
              Explore Upcoming Events
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/create-event"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 text-sm font-bold text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
            >
              <HeartHandshake size={18} />
              Create an Event
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-border pt-7">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users size={19} />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">One Community</p>
                <p className="text-xs text-muted-foreground">United for good</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
                <Heart size={19} />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">Real Impact</p>
                <p className="text-xs text-muted-foreground">Every action matters</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px]">
          <div className="absolute -right-5 -top-5 size-28 rounded-full border-[18px] border-primary/10 sm:-right-8 sm:-top-8 sm:size-36" />
          <div className="absolute -bottom-7 -left-7 size-32 rounded-full bg-amber-400/10 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-5 shadow-2xl shadow-primary/10 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-muted-foreground">
                  Make today meaningful
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-foreground">
                  Be the reason
                  <br />
                  someone smiles.
                </h2>
              </div>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <HeartHandshake size={26} />
              </span>
            </div>

            <div className="relative mt-7 flex min-h-[245px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-amber-400/20">
              <div className="absolute left-8 top-8 size-16 rounded-full bg-amber-400/20 blur-xl" />
              <div className="absolute bottom-5 right-8 size-24 rounded-full bg-primary/20 blur-2xl" />

              <div className="relative flex items-end justify-center gap-3 sm:gap-5">
                <div className="flex size-24 items-center justify-center rounded-t-[3rem] rounded-b-2xl bg-primary/80 text-primary-foreground shadow-lg sm:size-28">
                  <Users size={42} strokeWidth={1.5} />
                </div>
                <div className="mb-5 flex size-28 items-center justify-center rounded-t-[3.5rem] rounded-b-2xl bg-amber-400 text-amber-950 shadow-lg sm:size-32">
                  <Heart size={48} strokeWidth={1.5} />
                </div>
                <div className="flex size-24 items-center justify-center rounded-t-[3rem] rounded-b-2xl bg-emerald-600 text-white shadow-lg sm:size-28">
                  <HeartHandshake size={42} strokeWidth={1.5} />
                </div>
              </div>

              <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-bold text-primary shadow-sm">
                Kindness connects us
              </span>
              <span className="absolute bottom-4 right-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-bold text-foreground shadow-sm">
                <Sparkles className="mr-1 inline" size={12} />
                Spread positivity
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-secondary/70 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <CalendarDays size={17} />
                  <span className="text-xs font-semibold">Join an event</span>
                </div>
                <p className="mt-2 text-sm font-bold text-foreground">
                  Give your time
                </p>
              </div>

              <div className="rounded-xl bg-secondary/70 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <MapPin size={17} />
                  <span className="text-xs font-semibold">Your community</span>
                </div>
                <p className="mt-2 text-sm font-bold text-foreground">
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

