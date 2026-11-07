"use client";

import Link from "next/link";
import { useState } from "react";
import {
  HeartHandshake,
  Menu,
  X,
  CalendarDays,
  LogIn,
  UserPlus,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <HeartHandshake size={24} strokeWidth={2.2} />
          </span>

          <span className="flex flex-col">
            <span className="text-xl font-bold leading-6 tracking-tight text-foreground">
              Kindora<span className="text-primary">.</span>
            </span>
            <span className="mt-0.5 text-[10px] font-semibold tracking-[0.13em] text-muted-foreground">
              COMMUNITY FOR GOOD
            </span>
          </span>
        </Link>

        <div className="hidden items-center md:flex">
          <Link
            href="/events"
            className="inline-flex h-11 items-center gap-2 rounded-lg px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
          >
            <CalendarDays size={18} />
            Upcoming Events
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <Link
            href="/login"
            className="inline-flex h-11 min-w-[112px] items-center justify-center gap-2 rounded-xl border border-input bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            <LogIn size={17} />
            Login
          </Link>

          <Link
            href="/register"
            className="inline-flex h-11 min-w-[136px] items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <UserPlus size={17} />
            Get Started
          </Link>
        </div>

        <div className="flex items-center gap-2.5 md:hidden">
          <ThemeToggle />

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-11 rounded-xl"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background px-4 py-5 shadow-lg md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <CalendarDays size={18} />
              Upcoming Events
            </Link>

            <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-input bg-background text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <LogIn size={17} />
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
              >
                <UserPlus size={17} />
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
