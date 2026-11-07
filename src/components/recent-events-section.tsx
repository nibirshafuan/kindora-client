"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  CalendarX,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

type Event = {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
};

type EventsResponse = {
  success: boolean;
  count: number;
  events: Event[];
};

export function RecentEventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

        const response = await fetch(
          `${apiUrl}/api/events?limit=6`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Unable to load events. Please try again later.");
        }

        const data: EventsResponse = await response.json();

        if (!data.success || !Array.isArray(data.events)) {
          throw new Error("Invalid response received from the server.");
        }

        setEvents(data.events.slice(0, 6));
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while loading events."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEvents();
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="bg-secondary/30 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Make a Difference Today
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Recent <span className="text-primary">Upcoming Events</span>
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Find your next opportunity to connect, contribute, and create
              positive change in your community.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-xl border border-border bg-card px-5 text-sm font-bold text-foreground transition-colors hover:border-primary/40 hover:text-primary sm:self-auto"
          >
            View All Events
            <ArrowRight size={17} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="h-52 animate-pulse bg-secondary" />
                <div className="space-y-4 p-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-secondary" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-secondary" />
                  <div className="h-4 w-full animate-pulse rounded bg-secondary" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-secondary" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-5 py-12 text-center">
            <AlertCircle className="mx-auto mb-4 text-destructive" size={32} />
            <h3 className="text-lg font-bold text-foreground">
              Could Not Load Events
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card px-5 py-16 text-center">
            <CalendarX
              className="mx-auto mb-4 text-muted-foreground"
              size={38}
            />
            <h3 className="text-xl font-bold text-foreground">
              No Upcoming Events Yet
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              New community events will appear here when they become available.
            </p>
            <Link
              href="/create-event"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              Create an Event
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="relative h-52 overflow-hidden bg-secondary">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <CalendarDays size={42} />
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1.5 text-xs font-bold text-primary shadow-sm">
                    {event.eventType}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="line-clamp-2 min-h-14 text-lg font-bold leading-7 text-foreground transition-colors group-hover:text-primary">
                    {event.title}
                  </h3>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays
                        size={17}
                        className="shrink-0 text-primary"
                      />
                      <span>{formatDate(event.eventDate)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={17} className="shrink-0 text-primary" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="mt-6 flex h-11 items-center justify-center gap-2 rounded-xl border border-border text-sm font-bold text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    View Event Details
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
