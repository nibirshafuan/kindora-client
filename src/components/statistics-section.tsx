import {
  Users,
  CalendarCheck,
  HandHeart,
  MapPinned,
} from "lucide-react";

const statistics = [
  {
    value: "2,500+",
    label: "Active Volunteers",
    description: "People making a difference",
    icon: Users,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    value: "150+",
    label: "Events Organized",
    description: "Opportunities to do good",
    icon: CalendarCheck,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    value: "40+",
    label: "Communities",
    description: "Connected for a purpose",
    icon: MapPinned,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    value: "10K+",
    label: "Volunteer Hours",
    description: "Time dedicated to others",
    icon: HandHeart,
    color: "bg-rose-500/10 text-rose-600",
  },
];

export function StatisticsSection() {
  return (
    <section className="border-y border-border bg-secondary/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Our Growing Community
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Together, We Create <span className="text-primary">Impact</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Every volunteer, every event, and every small act of kindness
            brings us closer to a stronger and more caring community.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((statistic) => {
            const Icon = statistic.icon;

            return (
              <div
                key={statistic.label}
                className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
              >
                <div
                  className={`mb-6 flex size-12 items-center justify-center rounded-xl ${statistic.color}`}
                >
                  <Icon size={23} strokeWidth={2} />
                </div>

                <h3 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  {statistic.value}
                </h3>

                <p className="mt-2 font-bold text-foreground">
                  {statistic.label}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {statistic.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
