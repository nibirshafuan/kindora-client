"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  HeartHandshake,
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Camera,
  CheckCircle2,
  Circle,
  LoaderCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsError(false);

    if (!hasMinLength || !hasUppercase || !hasLowercase) {
      setIsError(true);
      setMessage("Please meet all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    if (photoURL.trim()) {
      try {
        const url = new URL(photoURL);
        if (url.protocol !== "http:" && url.protocol !== "https:") {
          throw new Error("Invalid URL");
        }
      } catch {
        setIsError(true);
        setMessage("Please provide a valid profile photo URL.");
        return;
      }
    }

    setIsLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: photoURL.trim() || undefined,
      });

      if (result.error) {
        setIsError(true);
        setMessage(result.error.message || "Registration failed. Please try again.");
        return;
      }

      setMessage("Account created successfully! Redirecting to homepage...");
      setIsError(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };


  const handleGoogleSignUp = async () => {
    setMessage("");
    setIsError(false);
    setIsGoogleLoading(true);

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/`,
        errorCallbackURL: `${window.location.origin}/register`,
      });

      if (result.error) {
        setIsError(true);
        setMessage(result.error.message || "Google sign up failed.");
        setIsGoogleLoading(false);
      }
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : "Google sign up failed.");
      setIsGoogleLoading(false);
    }
  };
  const Requirement = ({
    valid,
    children,
  }: {
    valid: boolean;
    children: React.ReactNode;
  }) => (
    <div className={`flex items-center gap-2 text-xs ${valid ? "text-primary" : "text-muted-foreground"}`}>
      {valid ? <CheckCircle2 size={14} /> : <Circle size={14} />}
      <span>{children}</span>
    </div>
  );

  return (
    <main className="relative flex min-h-screen items-start justify-center overflow-x-hidden bg-[#F1F6F2] px-4 pb-8 pt-20 sm:pt-24 lg:items-center lg:py-16">
      <div className="pointer-events-none fixed -left-40 -top-40 size-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-40 -right-40 size-96 rounded-full bg-primary/10 blur-3xl" />

      <Link
        href="/"
        className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-background hover:text-primary sm:left-8 sm:top-8"
      >
        <ArrowLeft size={17} />
        Back to Home
      </Link>

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-[#FFFEFA] shadow-2xl shadow-[#104B3B]/10 lg:grid-cols-2">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#104B3B] via-[#12654D] to-[#16805E] p-10 text-white lg:flex">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-emerald-300/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 size-64 rounded-full bg-teal-300/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 right-10 h-24 w-24 rotate-12 rounded-3xl border border-white/10 bg-white/5" />

          <Link href="/" className="relative z-10 inline-flex w-fit items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-xl bg-white/15">
              <HeartHandshake size={27} />
            </span>
            <span>
              <span className="block text-2xl font-extrabold">Kindora.</span>
              <span className="text-[10px] font-bold tracking-[0.15em] text-white/70">
                COMMUNITY FOR GOOD
              </span>
            </span>
          </Link>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={15} />
              Join Our Community
            </span>

            <h1 className="mt-6 text-3xl font-extrabold leading-tight xl:text-4xl">
              Be part of something meaningful.
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-white/75">
              Create your account, discover inspiring community events, meet
              passionate people, and turn small acts of kindness into a
              greater impact.
            </p>
          </div>

          <p className="relative z-10 text-sm text-white/60">
            Your journey towards positive change starts here.
          </p>
        </section>

        <section className="flex items-center justify-center px-5 py-6 sm:px-8 sm:py-7 lg:px-8 lg:py-6">
          <div className="w-full max-w-md">
            <Link href="/" className="mb-4 inline-flex items-center gap-2 lg:hidden">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <HeartHandshake size={22} />
              </span>
              <span className="text-xl font-extrabold text-foreground">
                Kindora<span className="text-primary">.</span>
              </span>
            </Link>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary sm:text-sm">
                Get Started Today
              </p>
              <h2 className="mt-1.5 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Create Your Account
              </h2>
              <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
                Join Kindora and start making a difference in your community.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-semibold text-foreground">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input id="name" type="text" required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter your full name" className="h-10 w-full rounded-xl border border-input bg-background pl-11 pr-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-semibold text-foreground">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input id="email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="h-10 w-full rounded-xl border border-input bg-background pl-11 pr-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="photoURL" className="mb-1 block text-sm font-semibold text-foreground">
                  Profile Photo URL <span className="font-normal text-muted-foreground">(Optional)</span>
                </label>
                <div className="relative">
                  <Camera size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input id="photoURL" type="url" autoComplete="url" value={photoURL} onChange={(event) => setPhotoURL(event.target.value)} placeholder="https://example.com/photo.jpg" className="h-10 w-full rounded-xl border border-input bg-background pl-11 pr-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-semibold text-foreground">Password</label>
                <div className="relative">
                  <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input id="password" type={showPassword ? "text" : "password"} required autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Create a password" className="h-10 w-full rounded-xl border border-input bg-background pl-11 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15" />
                  <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="mt-2 space-y-1.5">
                  <Requirement valid={hasMinLength}>At least 6 characters</Requirement>
                  <Requirement valid={hasUppercase}>One uppercase letter</Requirement>
                  <Requirement valid={hasLowercase}>One lowercase letter</Requirement>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-1 block text-sm font-semibold text-foreground">Confirm Password</label>
                <div className="relative">
                  <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} required autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" className="h-10 w-full rounded-xl border border-input bg-background pl-11 pr-10 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15" />
                  <button type="button" onClick={() => setShowConfirmPassword((visible) => !visible)} aria-label={showConfirmPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {message && (
                <p role="alert" className={`rounded-lg px-3 py-2 text-xs font-medium sm:col-span-2 ${isError ? "bg-red-50 text-red-700" : "bg-secondary text-primary"}`}>
                  {message}
                </p>
              )}

              <button type="submit" disabled={isLoading} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2">
                {isLoading ? <><LoaderCircle size={17} className="animate-spin" /> Creating Account...</> : <>Create Account <ArrowRight size={17} /></>}
              </button>
            </form>

            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-4 text-xs font-medium text-muted-foreground">OR SIGN UP WITH</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={isGoogleLoading}
                className="flex h-10 items-center justify-center gap-2 rounded-xl border border-input bg-background px-3 text-sm font-semibold text-foreground transition-all hover:border-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isGoogleLoading ? (
                  <LoaderCircle size={17} className="animate-spin" />
                ) : (
                  <span className="text-lg font-extrabold">G</span>
                )}
                {isGoogleLoading ? "Connecting..." : "Google"}
              </button>
              <button type="button" disabled className="flex h-10 items-center justify-center gap-2 rounded-xl border border-input bg-background px-3 text-sm font-semibold text-muted-foreground opacity-60">
                <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] font-extrabold text-background">GH</span> GitHub
              </button>
            </div>

            <p className="mt-3 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-primary transition-colors hover:underline">Login</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}




