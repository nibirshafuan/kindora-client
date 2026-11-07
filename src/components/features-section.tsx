import Link from "next/link";
import {
  Search,
  CalendarPlus,
  Users,
  HeartHandshake,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Discover Community Events",
    description:
      "Explore meaningful local events, find causes you care about, and discover new opportunities to make a difference.",
    icon: Search,
    href: "/events",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    number: "02",
    title: "Create Your Own Events",
    description:
      "Turn your ideas into action. Organize community activities and invite others to join your mission.",
    icon: CalendarPlus,
    href: "/create-event",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    number: "03",
    title: "Connect With People",
    description:
      "Meet like-minded volunteers, build meaningful connections, and work together toward positive change.",
    icon: Users,
    href: "/events",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    number: "04",
    title: "Make Every Action Count",
    description:
      "Join events, participate in community activities, and turn your time and kindness into real impact.",
    icon: HeartHandshake,
    href: "/joined-events",
    color: "bg-rose-500/10 text-rose-600",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-primary">
            <Sparkles size={14} />
            What You Can Do
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Everything You Need to
            <span className="block text-primary">Make a Difference</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground">
            From discovering local initiatives to organizing your own events,
            Kindora makes community involvement simple and meaningful.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Link
                key={feature.number}
                href={feature.href}
                className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex size-14 items-center justify-center rounded-2xl ${feature.color}`}
                  >
                    <Icon size={27} strokeWidth={1.8} />
                  </span>

                  <span className="text-sm font-bold tracking-wider text-muted-foreground/50">
                    {feature.number}
                  </span>
                </div>

                <h3 className="mt-7 text-lg font-bold leading-snug text-foreground">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>

                <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-bold text-primary">
                  Explore feature
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>

                <div className="pointer-events-none absolute -bottom-12 -right-12 size-32 rounded-full bg-primary/5 blur-2xl transition-all duration-300 group-hover:bg-primary/10" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
