"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ArrowLeft, CalendarDays, Clock3, MapPin, HeartHandshake,
  LoaderCircle, Users, CheckCircle2, LogIn
} from "lucide-react";
import { toast } from "sonner";
import { authClient, getAuthToken } from "@/lib/auth-client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface EventData {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function EventDetailsContent() {
  const params = useParams();
  const eventId = params.id as string;
  const { data: session, isPending: sessionPending } = authClient.useSession();

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/events/${eventId}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to load event.");
        }

        setEvent(data.event);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  useEffect(() => {
    let active = true;

    const checkJoinedStatus = async () => {
      if (sessionPending || !session?.user || !eventId) {
        if (active && !sessionPending && !session?.user) setJoined(false);
        return;
      }

      try {
        const token = await getAuthToken();

        if (!token) return;

        const response = await fetch(`${API_URL}/api/events/joined`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });

        const data = await response.json();

        if (active && response.ok && data.success && Array.isArray(data.events)) {
          setJoined(data.events.some((item: EventData) => String(item._id) === String(eventId)));
        }
      } catch (err) {
        console.error("Unable to check joined status:", err);
      }
    };

    checkJoinedStatus();

    return () => {
      active = false;
    };
  }, [eventId, session, sessionPending]);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });

  const formatTime = (date: string) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric", minute: "2-digit", hour12: true
    });

  const handleJoin = async () => {
    if (!session?.user) return;

    setJoining(true);

    try {
      const token = await getAuthToken();

      if (!token) throw new Error("Authentication token not found. Please login again.");

      const response = await fetch(`${API_URL}/api/events/${eventId}/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.status === 409) {
        setJoined(true);
        toast.info("You have already joined this event.");
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to join this event.");
      }

      setJoined(true);
      toast.success("You have successfully joined this event!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setJoining(false);
    }
  };

  const isUpcoming = event ? new Date(event.eventDate).getTime() > Date.now() : false;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link href="/events" className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
            <ArrowLeft size={17} /> Back to Upcoming Events
          </Link>

          {loading ? (
            <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[1.55fr_0.85fr]">
              <section className="space-y-6">
                <div className="h-[280px] animate-pulse rounded-3xl bg-muted sm:h-[420px]" />
                <div className="space-y-4">
                  <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                  <div className="h-9 w-4/5 animate-pulse rounded-lg bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-11/12 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                </div>
              </section>
              <aside className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-6 h-7 w-2/3 animate-pulse rounded bg-muted" />
                <div className="space-y-5">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="size-10 shrink-0 animate-pulse rounded-xl bg-muted" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 h-12 animate-pulse rounded-xl bg-muted" />
              </aside>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
              <CalendarDays size={42} className="mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold text-foreground">Event Not Found</h2>
              <p className="mt-2 text-sm text-muted-foreground">{error}</p>
              <Link href="/events" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground">
                Browse Events
              </Link>
            </div>
          ) : event ? (
            <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[1.55fr_0.85fr]">
              <section>
                <div className="relative h-[280px] overflow-hidden rounded-3xl bg-secondary sm:h-[420px]">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      unoptimized
                      priority
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <CalendarDays size={64} />
                    </div>
                  )}
                  <span className="absolute left-5 top-5 rounded-full bg-background/95 px-4 py-2 text-xs font-bold text-primary shadow-sm">
                    {event.eventType}
                  </span>
                </div>

                <div className="mt-8">
                  <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
                    {event.title}
                  </h1>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays size={17} className="text-primary" />
                      {formatDate(event.eventDate)}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock3 size={17} className="text-primary" />
                      {formatTime(event.eventDate)}
                    </span>
                  </div>
                </div>

                <div className="mt-9 border-t border-border pt-7">
                  <h2 className="text-xl font-bold text-foreground">About This Event</h2>
                  <p className="mt-4 whitespace-pre-line text-sm leading-8 text-muted-foreground sm:text-base">
                    {event.description}
                  </p>
                </div>
              </section>

              <aside className="lg:sticky lg:top-24">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <HeartHandshake size={25} />
                    </span>
                    <div>
                      <h2 className="font-bold text-foreground">Join the Community</h2>
                      <p className="text-xs text-muted-foreground">Be part of something meaningful.</p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-5">
                    <div className="flex items-start gap-3">
                      <MapPin size={19} className="mt-0.5 shrink-0 text-primary" />
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground">Event Location</p>
                        <p className="mt-1 text-sm font-semibold text-foreground">{event.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CalendarDays size={19} className="mt-0.5 shrink-0 text-primary" />
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground">Event Date</p>
                        <p className="mt-1 text-sm font-semibold text-foreground">{formatDate(event.eventDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users size={19} className="mt-0.5 shrink-0 text-primary" />
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground">Organized By</p>
                        <p className="mt-1 break-all text-sm font-semibold text-foreground">{event.creatorEmail}</p>
                      </div>
                    </div>
                  </div>

                  <div className="my-7 border-t border-border" />

                  {!isUpcoming ? (
                    <div className="rounded-xl bg-secondary px-4 py-3 text-center text-sm font-semibold text-muted-foreground">
                      This event has ended.
                    </div>
                  ) : sessionPending ? (
                    <div className="flex h-12 items-center justify-center">
                      <LoaderCircle className="animate-spin text-primary" />
                    </div>
                  ) : !session?.user ? (
                    <Link href={`/login?redirect=/events/${eventId}`} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground hover:opacity-90">
                      <LogIn size={18} /> Login to Join
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={handleJoin}
                      disabled={joining || joined}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {joining ? <LoaderCircle size={18} className="animate-spin" /> : joined ? <CheckCircle2 size={18} /> : <HeartHandshake size={18} />}
                      {joining ? "Joining..." : joined ? "Already Joined" : "Join This Event"}
                    </button>
                  )}
                  {!sessionPending && !session?.user && isUpcoming && (
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                      Please login first to participate in this event.
                    </p>
                  )}
                </div>
              </aside>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}



export default function EventDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading event details...</p>
        </div>
      }
    >
      <EventDetailsContent />
    </Suspense>
  );
}




