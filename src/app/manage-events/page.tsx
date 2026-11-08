"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, CalendarDays, MapPin, Pencil, Trash2,
  PlusCircle, LoaderCircle, X, Save, AlertCircle
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
  creatorEmail: string;
}

const emptyForm = {
  title: "",
  description: "",
  eventType: "",
  imageUrl: "",
  location: "",
  eventDate: "",
};

function toLocalDateTime(value: string) {
  const date = new Date(value);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

export default function ManageEventsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editing, setEditing] = useState<EventData | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const getToken = async () => {
    return getAuthToken();
  };

  const loadEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = await getToken();
      const response = await fetch(`${API_URL}/api/events/mine`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load your events.");
      }

      setEvents(Array.isArray(data.events) ? data.events : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isPending && session?.user) {
      loadEvents();
    } else if (!isPending && !session?.user) {
      setLoading(false);
    }
  }, [isPending, session, loadEvents]);

  const openEdit = (event: EventData) => {
    setNotice("");
    setEditing(event);
    setForm({
      title: event.title,
      description: event.description,
      eventType: event.eventType,
      imageUrl: event.imageUrl,
      location: event.location,
      eventDate: toLocalDateTime(event.eventDate),
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;

    if (new Date(form.eventDate).getTime() <= Date.now()) {
      setNotice("Please select a future date and time.");
      return;
    }

    try {
      setSaving(true);
      setNotice("");

      const token = await getToken();
      const response = await fetch(`${API_URL}/api/events/${editing._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          eventDate: new Date(form.eventDate).toISOString(),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update event.");
      }

      setEditing(null);
      setNotice("Event updated successfully!");
      await loadEvents();
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (event: EventData) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    try {
      setDeletingId(event._id);
      setNotice("");

      const token = await getToken();
      const response = await fetch(`${API_URL}/api/events/${event._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to delete event.");
      }

      setEvents((current) => current.filter((item) => item._id !== event._id));
      setNotice("Event deleted successfully!");
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background px-4 pt-24 pb-10 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <ArrowLeft size={17} /> Back to Home
          </Link>

          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Manage Events
              </h1>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                View, edit, and manage the events you have created.
              </p>
            </div>
            <Link
              href="/create-event"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground hover:opacity-90"
            >
              <PlusCircle size={18} /> Create New Event
            </Link>
          </div>

          {isPending || loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="h-44 animate-pulse bg-muted" />
                  <div className="space-y-4 p-5">
                    <div className="h-5 w-24 animate-pulse rounded-full bg-muted" />
                    <div className="h-6 w-4/5 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-10 animate-pulse rounded-xl bg-muted" />
                      <div className="h-10 animate-pulse rounded-xl bg-muted" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !session?.user ? (
            <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
              <h2 className="text-xl font-bold text-foreground">Login Required</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Please login to manage your events.
              </p>
              <Link
                href="/login?redirect=/manage-events"
                className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
              >
                Login to Continue
              </Link>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-border bg-card px-6 py-14 text-center">
              <AlertCircle size={36} className="mx-auto mb-4 text-destructive" />
              <p className="text-sm text-muted-foreground">{error}</p>
              <button
                onClick={loadEvents}
                className="mt-5 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
              >
                Try Again
              </button>
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
              <CalendarDays size={42} className="mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-bold text-foreground">No Events Yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                You have not created any events yet.
              </p>
              <Link
                href="/create-event"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
              >
                <PlusCircle size={18} /> Create Your First Event
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-muted-foreground">
                  {events.length} {events.length === 1 ? "Event" : "Events"} Created
                </p>
                <button
                  onClick={loadEvents}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Refresh List
                </button>
              </div>

              {notice && (
                <p className="mb-5 rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-medium text-foreground">
                  {notice}
                </p>
              )}

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <article
                    key={event._id}
                    className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
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
                        <h2 className="line-clamp-2 min-h-12 text-lg font-bold text-foreground hover:text-primary">
                          {event.title}
                        </h2>
                      </Link>

                      <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarDays size={15} className="shrink-0 text-primary" />
                        {new Date(event.eventDate).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>

                      <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin size={15} className="shrink-0 text-primary" />
                        <span className="truncate">{event.location}</span>
                      </p>

                      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
                        <button
                          onClick={() => openEdit(event)}
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border text-sm font-semibold text-foreground transition hover:bg-secondary"
                        >
                          <Pencil size={15} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(event)}
                          disabled={deletingId === event._id}
                          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-500/30 text-sm font-semibold text-red-600 transition hover:bg-red-500/10 disabled:opacity-50"
                        >
                          {deletingId === event._id ? (
                            <LoaderCircle size={15} className="animate-spin" />
                          ) : (
                            <Trash2 size={15} />
                          )}
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {editing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4">
          <div className="my-6 w-full max-w-2xl rounded-2xl border border-border bg-card p-5 shadow-xl sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Edit Event</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Update your event information.
                </p>
              </div>
              <button
                onClick={() => setEditing(null)}
                aria-label="Close edit form"
                className="rounded-lg p-2 text-muted-foreground hover:bg-secondary"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Event Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Category</label>
                  <select
                    required
                    value={form.eventType}
                    onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                  >
                    {["Education", "Environment", "Health", "Community", "Charity", "Social", "Other"].map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Location</label>
                  <input
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Date & Time</label>
                  <input
                    required
                    type="datetime-local"
                    min={new Date().toISOString().slice(0, 16)}
                    value={form.eventDate}
                    onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                    className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">Image URL</label>
                  <input
                    required
                    type="url"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-foreground">Description</label>
                <textarea
                  required
                  minLength={10}
                  rows={5}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm leading-6 text-foreground outline-none focus:border-primary"
                />
              </div>

              {notice && (
                <p className="rounded-lg bg-secondary px-3 py-2 text-sm text-foreground">{notice}</p>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-border pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="h-11 rounded-xl border border-border px-5 text-sm font-semibold text-foreground hover:bg-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground disabled:opacity-60"
                >
                  {saving ? <LoaderCircle size={17} className="animate-spin" /> : <Save size={17} />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}



