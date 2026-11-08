"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  UserCircle,
  Mail,
  Camera,
  Save,
  LoaderCircle,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const user = session?.user;

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (image.trim()) {
      try {
        const url = new URL(image.trim());
        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("Invalid URL");
        }
      } catch {
        setError("Please enter a valid HTTP or HTTPS profile image URL.");
        return;
      }
    }

    try {
      setSaving(true);

      const result = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || null,
      });

      if (result.error) {
        throw new Error(result.error.message || "Unable to update profile.");
      }

      toast.success("Your profile has been updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Profile update failed."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-background px-4 pb-8 pt-4 sm:px-6 sm:pt-5 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <Link
            href="/"
            className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="mb-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              My Profile
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your personal information and account settings.
            </p>
          </div>

          {isPending ? (
            <div className="flex min-h-48 items-center justify-center">
              <LoaderCircle size={30} className="animate-spin text-primary" />
            </div>
          ) : !user ? (
            <div className="rounded-2xl border border-border bg-card px-5 py-10 text-center">
              <UserCircle
                size={42}
                className="mx-auto mb-3 text-muted-foreground"
              />
              <h2 className="text-lg font-bold text-foreground">
                Login Required
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Please login to view your profile.
              </p>
              <Link
                href="/login?redirect=/profile"
                className="mt-5 inline-flex rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
              >
                Login to Continue
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex items-center gap-4 bg-primary px-5 py-4 text-primary-foreground sm:px-6">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "Profile"}
                    className="size-16 shrink-0 rounded-full border-[3px] border-white/30 object-cover"
                  />
                ) : (
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-full border-[3px] border-white/30 bg-white/15 text-2xl font-bold">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-bold sm:text-xl">
                    {user.name || "User"}
                  </h2>
                  <p className="mt-0.5 text-xs text-primary-foreground/80 sm:text-sm">
                    Kindora Community Member
                  </p>
                </div>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4 p-4 sm:p-5">
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Personal Information
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Update your account details below.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="profile-name"
                      className="mb-1.5 block text-sm font-semibold text-foreground"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <UserCircle
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <input
                        id="profile-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="profile-email"
                      className="mb-1.5 block text-sm font-semibold text-foreground"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                      <input
                        id="profile-email"
                        type="email"
                        value={user.email}
                        readOnly
                        className="h-10 w-full cursor-not-allowed rounded-xl border border-border bg-secondary pl-10 pr-3 text-sm text-muted-foreground outline-none"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Email cannot be changed here.
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="profile-image"
                    className="mb-1.5 block text-sm font-semibold text-foreground"
                  >
                    Profile Picture URL
                  </label>
                  <div className="relative">
                    <Camera
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      id="profile-image"
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://example.com/profile.jpg"
                      className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Enter a public image URL. Leave empty to use your initial.
                  </p>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
                  >
                    <AlertCircle size={17} className="mt-0.5 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="flex justify-end border-t border-border pt-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <LoaderCircle size={17} className="animate-spin" />
                    ) : (
                      <Save size={17} />
                    )}
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
