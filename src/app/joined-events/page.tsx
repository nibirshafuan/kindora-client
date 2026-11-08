"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  CalendarX,
  AlertCircle,
  LoaderCircle,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

import { authClient, getAuthToken } from "@/lib/auth-client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface EventData {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
}

interface JoinedEventsResponse {
  success: boolean;
  count: number;
  events: EventData[];
  message?: string;
}

export default function JoinedEventsPage() {
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadJoinedEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = await getAuthToken();

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const response = await fetch(`${API_URL}/api/events/joined`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const data: JoinedEventsResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load joined events.");
      }

      setEvents(Array.isArray(data.events) ? data.events : []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isPending && session?.user) {
      loadJoinedEvents();
    } else if (!isPending && !session?.user) {
      setLoading(false);
    }
  }, [isPending, session, loadJoinedEvents]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background px-4 pb-12 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Joined Events
              </h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Explore the events you have joined and get ready to participate.
              </p>
            </div>

            {session?.user && !isPending && (
              <Link
                href="/events"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
              >
                Explore Events
                <ArrowRight size={17} />
              </Link>
            )}
          </div>

          {isPending || loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="h-48 animate-pulse bg-muted" />
                  <div className="space-y-4 p-5">
                    <div className="h-5 w-24 animate-pulse rounded-full bg-muted" />
                    <div className="h-6 w-4/5 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                    <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : !session?.user ? (
            <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
              <CalendarDays
                size={44}
                className="mx-auto mb-4 text-muted-foreground"
              />
              <h2 className="text-xl font-bold text-foreground">
                Login Required
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Please login to view the events you have joined.
              </p>
              <Link
                href="/login?redirect=/joined-events"
                className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90"
              >
                Login to Continue
              </Link>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-border bg-card px-6 py-14 text-center">
              <AlertCircle
                size={40}
                className="mx-auto mb-4 text-destructive"
              />
              <h2 className="text-lg font-bold text-foreground">
                Unable to Load Joined Events
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{error}</p>
              <button
                onClick={loadJoinedEvents}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
              <CalendarX
                size={46}
                className="mx-auto mb-4 text-muted-foreground"
              />
              <h2 className="text-xl font-bold text-foreground">
                No Joined Events Yet
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                You have not joined any events yet. Explore upcoming events
                and find an opportunity to make a difference.
              </p>
              <Link
                href="/events"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90"
              >
                Explore Upcoming Events
                <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-muted-foreground">
                  {events.length}{" "}
                  {events.length === 1 ? "Event" : "Events"} Joined
                </p>

                <button
                  onClick={loadJoinedEvents}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:underline"
                >
                  <RefreshCw size={15} />
                  Refresh List
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <article
                    key={event._id}
                    className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <Link href={`/events/${event._id}`} className="group block">
                      <div className="relative h-48 overflow-hidden bg-secondary">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        />

                        <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1.5 text-xs font-bold text-primary">
                          {event.eventType}
                        </span>
                      </div>
                    </Link>

                    <div className="p-5">
                      <Link href={`/events/${event._id}`}>
                        <h2 className="line-clamp-2 min-h-12 text-lg font-bold text-foreground transition hover:text-primary">
                          {event.title}
                        </h2>
                      </Link>

                      <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarDays
                          size={15}
                          className="shrink-0 text-primary"
                        />
                        {new Date(event.eventDate).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>

                      <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin size={15} className="shrink-0 text-primary" />
                        <span className="truncate">{event.location}</span>
                      </p>

                      <div className="mt-5 border-t border-border pt-4">
                        <Link
                          href={`/events/${event._id}`}
                          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                          View Event Details
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}


