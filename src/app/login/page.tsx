"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  HeartHandshake, Mail, LockKeyhole, Eye, EyeOff,
  ArrowRight, ArrowLeft, ShieldCheck, LoaderCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSuccess(false);

    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (result.error) {
        setMessage(result.error.message || "Invalid email or password.");
        return;
      }

      setIsSuccess(true);
      setMessage("Login successful! Redirecting...");
      router.push("/");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setMessage("");
    setIsGoogleLoading(true);

    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000/",
        errorCallbackURL: "http://localhost:3000/login",
      });

      if (result.error) {
        setMessage(result.error.message || "Google login failed.");
        setIsGoogleLoading(false);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Google login failed.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F1F6F2] px-4 py-12">
      <div className="pointer-events-none absolute -left-40 -top-40 size-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-96 rounded-full bg-primary/10 blur-3xl" />

      <Link href="/" className="absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-background hover:text-primary sm:left-8 sm:top-8">
        <ArrowLeft size={17} /> Back to Home
      </Link>

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-[#FFFEFA] shadow-2xl shadow-[#104B3B]/10 lg:grid-cols-2">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#104B3B] via-[#12654D] to-[#16805E] p-10 text-white lg:flex">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-emerald-300/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-1/3 size-64 rounded-full bg-teal-300/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-10 right-10 h-24 w-24 rotate-12 rounded-3xl border border-white/10 bg-white/5" />

          <Link href="/" className="relative z-10 inline-flex w-fit items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-xl bg-white/15"><HeartHandshake size={27} /></span>
            <span><span className="block text-2xl font-extrabold">Kindora.</span><span className="text-[10px] font-bold tracking-[0.15em] text-white/70">COMMUNITY FOR GOOD</span></span>
          </Link>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider"><ShieldCheck size={15} /> Welcome Back</span>
            <h1 className="mt-6 text-3xl font-extrabold leading-tight xl:text-4xl">Small actions. A better world.</h1>
            <p className="mt-6 max-w-md text-base leading-8 text-white/75">Sign in to discover community events, connect with volunteers, and continue making a positive difference.</p>
          </div>
          <p className="relative z-10 text-sm text-white/60">Together, we make kindness happen.</p>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-10">
          <div className="w-full max-w-md">
            <Link href="/" className="mb-7 inline-flex items-center gap-2 lg:hidden">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><HeartHandshake size={22} /></span>
              <span className="text-xl font-extrabold text-foreground">Kindora<span className="text-primary">.</span></span>
            </Link>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary sm:text-sm">Welcome Back</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground">Login to Kindora</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Continue your journey of making a difference.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-12 w-full rounded-xl border border-input bg-background pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-foreground">Password</label>
                <div className="relative">
                  <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input id="password" type={showPassword ? "text" : "password"} required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="h-12 w-full rounded-xl border border-input bg-background pl-11 pr-12 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15" />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </div>
              </div>

              {message && <p role="alert" className={`rounded-lg px-3 py-2.5 text-sm font-medium ${isSuccess ? "bg-secondary text-primary" : "bg-red-50 text-red-700"}`}>{message}</p>}

              <button type="submit" disabled={isLoading || isGoogleLoading} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70">
                {isLoading ? <LoaderCircle size={17} className="animate-spin" /> : null}
                {isLoading ? "Signing in..." : "Login to Your Account"}
                {!isLoading && <ArrowRight size={17} />}
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center"><span className="bg-card px-4 text-xs font-medium text-muted-foreground">OR CONTINUE WITH</span></div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button type="button" onClick={handleGoogleLogin} disabled={isGoogleLoading || isLoading} className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-input bg-background px-4 text-sm font-semibold text-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60">
                {isGoogleLoading ? <LoaderCircle size={18} className="animate-spin" /> : <span className="text-xl font-extrabold text-primary">G</span>}
                <span>{isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}</span>
              </button>
              <button type="button" disabled className="flex h-11 w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-input bg-background px-4 text-sm font-semibold text-foreground opacity-50">
                <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] font-extrabold text-background">GH</span>
                <span>Continue with GitHub</span>
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">Don't have an account? <Link href="/register" className="font-bold text-primary transition-colors hover:underline">Create an account</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
}

