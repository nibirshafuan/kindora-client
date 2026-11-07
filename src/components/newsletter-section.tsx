"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Send,
  Sparkles,
} from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="bg-background px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-primary px-6 py-14 shadow-2xl shadow-primary/10 sm:px-12 sm:py-16 lg:px-16">
        <div className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full border-[45px] border-white/5" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 size-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white">
              <Sparkles size={15} />
              Stay Connected
            </span>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Good Things Are
              <span className="block text-emerald-200">
                Happening Around You.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-white/80">
              Stay inspired and discover community events, volunteer
              opportunities, and stories of positive change.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-white/90">
              <span className="flex size-10 items-center justify-center rounded-full bg-white/15">
                <Mail size={19} />
              </span>
              A little kindness in your inbox.
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm sm:p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white">
                Join Our Newsletter
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/75">
                Get updates about upcoming events and community activities.
              </p>
            </div>

            {subscribed ? (
              <div
                role="status"
                className="rounded-xl border border-white/20 bg-white/10 p-5 text-white"
              >
                <CheckCircle2 size={30} className="mb-3 text-emerald-200" />
                <p className="font-bold">Thank you for your interest!</p>
                <p className="mt-1 text-sm text-white/75">
                  This is a demo subscription. No email has been saved or sent.
                </p>
                <button
                  type="button"
                  onClick={() => setSubscribed(false)}
                  className="mt-4 text-sm font-bold underline underline-offset-4 hover:text-emerald-200"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="newsletter-email"
                  className="mb-2 block text-sm font-semibold text-white"
                >
                  Email Address
                </label>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative min-w-0 flex-1">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      maxLength={254}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Enter your email address"
                      className="h-13 w-full rounded-xl border border-white/20 bg-white px-4 pl-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex h-13 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    Subscribe
                    <ArrowRight size={17} />
                  </button>
                </div>

                <p className="mt-4 flex items-center gap-2 text-xs text-white/65">
                  <Send size={13} />
                  Stay inspired. No spam, just positivity.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
