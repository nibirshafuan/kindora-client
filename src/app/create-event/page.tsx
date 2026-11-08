"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, CalendarDays, Clock3, MapPin, Image as ImageIcon,
  FileText, LoaderCircle, PlusCircle, CheckCircle2
} from "lucide-react";
import { authClient, getAuthToken } from "@/lib/auth-client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function getLocalDateTime() {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("");
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!session?.user) {
      setError("Please login before creating an event.");
      return;
    }

    if (new Date(eventDate).getTime() <= Date.now()) {
      setError("Please select a future date and time.");
      return;
    }

    try {
      setLoading(true);

      const token = await getAuthToken();

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      const response = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          eventType,
          location: location.trim(),
          eventDate: new Date(eventDate).toISOString(),
          imageUrl: imageUrl.trim(),
          description: description.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to create event.");
      }

      setSuccess("Your event has been created successfully!");

      if (data.event?._id) {
        setTimeout(() => router.push(`/events/${data.event._id}`), 1200);
      } else {
        setTimeout(() => router.push("/events"), 1200);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/events"
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft size={17} />
            Back to Upcoming Events
          </Link>

          <div className="mb-8">
            <div className="mb-3 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <PlusCircle size={29} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Create an Event
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
              Bring people together and create something meaningful for your community.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8">
            {isPending ? (
              <div className="flex min-h-60 items-center justify-center">
                <LoaderCircle className="animate-spin text-primary" size={32} />
              </div>
            ) : !session?.user ? (
              <div className="py-12 text-center">
                <h2 className="text-xl font-bold text-foreground">Login Required</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Please login to create and manage your community events.
                </p>
                <Link
                  href="/login?redirect=/create-event"
                  className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
                >
                  Login to Continue
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="mb-2 block text-sm font-semibold text-foreground">
                    Event Title
                  </label>
                  <input
                    id="title"
                    required
                    maxLength={100}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Community Tree Plantation"
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="eventType" className="mb-2 block text-sm font-semibold text-foreground">
                      Event Category
                    </label>
                    <select
                      id="eventType"
                      required
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    >
                      <option value="">Select category</option>
                      <option value="Education">Education</option>
                      <option value="Environment">Environment</option>
                      <option value="Health">Health</option>
                      <option value="Community">Community</option>
                      <option value="Charity">Charity</option>
                      <option value="Social">Social</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="mb-2 block text-sm font-semibold text-foreground">
                      Event Location
                    </label>
                    <div className="relative">
                      <MapPin size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="location"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter event location"
                        className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="eventDate" className="mb-2 block text-sm font-semibold text-foreground">
                      Event Date & Time
                    </label>
                    <div className="relative">
                      <CalendarDays size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="eventDate"
                        type="datetime-local"
                        required
                        min={getLocalDateTime()}
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="imageUrl" className="mb-2 block text-sm font-semibold text-foreground">
                      Event Image URL
                    </label>
                    <div className="relative">
                      <ImageIcon size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="imageUrl"
                        type="url"
                        required
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="h-12 w-full rounded-xl border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="mb-2 block text-sm font-semibold text-foreground">
                    Event Description
                  </label>
                  <div className="relative">
                    <FileText size={17} className="absolute left-4 top-4 text-muted-foreground" />
                    <textarea
                      id="description"
                      required
                      minLength={10}
                      maxLength={2000}
                      rows={6}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your event, its purpose, activities, and how people can participate..."
                      className="w-full resize-y rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm leading-6 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                  <p className="mt-2 text-right text-xs text-muted-foreground">
                    {description.length}/2000 characters
                  </p>
                </div>

                {error && (
                  <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-700">
                    <CheckCircle2 size={18} />
                    {success}
                  </p>
                )}

                <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
                  <Link
                    href="/events"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-border px-6 text-sm font-semibold text-foreground transition hover:bg-secondary"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={loading || !!success}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <LoaderCircle size={18} className="animate-spin" />
                    ) : (
                      <PlusCircle size={18} />
                    )}
                    {loading ? "Creating Event..." : "Create Event"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Make sure your event information is accurate before publishing.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

