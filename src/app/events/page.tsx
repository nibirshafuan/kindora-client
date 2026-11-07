"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  CalendarDays,
  MapPin,
  CalendarX,
  AlertCircle,
  ArrowRight,
  SlidersHorizontal,
  RefreshCw,
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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/events?limit=100`, {
        cache: "no-store",
      });

      if (!response.ok) return;

      const data: EventsResponse = await response.json();

      if (data.success && Array.isArray(data.events)) {
        const uniqueCategories = Array.from(
          new Set(
            data.events
              .map((event) => event.eventType)
              .filter(Boolean)
          )
        ).sort();

        setCategories(uniqueCategories);
      }
    } catch {
      setCategories([]);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    let active = true;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams({ limit: "100" });

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (category !== "all") {
          params.set("category", category);
        }

        const response = await fetch(
          `${apiUrl}/api/events?${params.toString()}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error("Unable to load events. Please try again.");
        }

        const data: EventsResponse = await response.json();

        if (!data.success || !Array.isArray(data.events)) {
          throw new Error("Invalid response received from the server.");
        }

        if (active) {
          setEvents(data.events);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading events."
          );
          setEvents([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    const debounce = window.setTimeout(fetchEvents, 300);

    return () => {
      active = false;
      window.clearTimeout(debounce);
    };
  }, [apiUrl, search, category, retry]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Discover Opportunities
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Upcoming <span className="text-primary">Events</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Discover meaningful community events, connect with inspiring
            people, and take part in creating positive change.
          </p>

          <div className="mt-9 flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search events by title, location or keyword..."
                aria-label="Search events"
                className="h-12 w-full rounded-xl border border-input bg-background pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>

            <div className="relative w-full sm:w-64">
              <SlidersHorizontal
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                aria-label="Filter by category"
                className="h-12 w-full appearance-none rounded-xl border border-input bg-background pl-11 pr-4 text-sm font-medium text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                <option value="all">All Categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                category === "all"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary"
              }`}
            >
              All Events
            </button>

            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                  category === item
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold text-foreground sm:text-2xl">
              Explore Community Events
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Find an opportunity and make a difference.
            </p>
          </div>

          {!loading && !error && (
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              {events.length} {events.length === 1 ? "Event" : "Events"} Found
            </span>
          )}
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
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-5 py-14 text-center">
            <AlertCircle
              className="mx-auto mb-4 text-destructive"
              size={36}
            />
            <h3 className="text-xl font-bold text-foreground">
              Could Not Load Events
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            <button
              type="button"
              onClick={() => setRetry((value) => value + 1)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card px-5 py-16 text-center">
            <CalendarX
              className="mx-auto mb-4 text-muted-foreground"
              size={42}
            />
            <h3 className="text-xl font-bold text-foreground">
              No Events Found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try another search keyword or select a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
              className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            >
              Clear Filters
            </button>
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
                      <CalendarDays size={44} />
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

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3">
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
      </section>
    </main>
  );
}
