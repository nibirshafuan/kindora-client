"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  HeartHandshake,
  Menu,
  X,
  CalendarDays,
  LogIn,
  UserPlus,
  UserCircle,
  PlusCircle,
  ClipboardList,
  CalendarCheck,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await authClient.signOut();
      setProfileMenuOpen(false);
      setMobileMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const profileLinks = [
    {
      href: "/create-event",
      label: "Create Event",
      icon: PlusCircle,
    },
    {
      href: "/manage-events",
      label: "Manage Events",
      icon: ClipboardList,
    },
    {
      href: "/joined-events",
      label: "Joined Events",
      icon: CalendarCheck,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <HeartHandshake size={22} strokeWidth={2.2} />
          </span>

          <span className="flex flex-col">
            <span className="text-lg font-bold leading-5 tracking-tight text-foreground">
              Kindora<span className="text-primary">.</span>
            </span>
            <span className="mt-0.5 text-[9px] font-semibold tracking-[0.13em] text-muted-foreground">
              COMMUNITY FOR GOOD
            </span>
          </span>
        </Link>

        <div className="hidden items-center md:flex">
          <Link
            href="/events"
            className="inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
          >
            <CalendarDays size={17} />
            Upcoming Events
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {!isPending && user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((open) => !open)}
                aria-expanded={profileMenuOpen}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-input bg-background px-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "Profile"}
                    className="size-7 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                )}

                <span className="max-w-28 truncate">
                  {user.name || "My Account"}
                </span>
                <ChevronDown size={15} />
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-xl border border-border bg-background p-2 shadow-xl">
                  <div className="border-b border-border px-3 py-2">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  {profileLinks.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
                    >
                      <Icon size={17} />
                      {label}
                    </Link>
                  ))}

                  <div className="my-1 border-t border-border" />

                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
                  >
                    <LogOut size={17} />
                    {isSigningOut ? "Signing out..." : "Logout"}
                  </button>
                </div>
              )}
            </div>
          ) : !isPending ? (
            <>
              <Link
                href="/login"
                className="inline-flex h-10 min-w-[108px] items-center justify-center gap-2 rounded-xl border border-input bg-background px-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <LogIn size={16} />
                Login
              </Link>

              <Link
                href="/register"
                className="inline-flex h-10 min-w-[128px] items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <UserPlus size={16} />
                Get Started
              </Link>
            </>
          ) : (
            <div className="h-10 w-40 animate-pulse rounded-xl bg-secondary" />
          )}
        </div>

        <div className="flex items-center gap-2.5 md:hidden">
          <ThemeToggle />

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-10 rounded-xl"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
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
              onClick={closeMobileMenu}
              className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              <CalendarDays size={18} />
              Upcoming Events
            </Link>

            {!isPending && user ? (
              <>
                <div className="flex items-center gap-3 border-t border-border pt-4">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="size-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                {profileLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeMobileMenu}
                    className="flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-primary"
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                ))}

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex h-11 items-center gap-3 rounded-xl border-t border-border px-3 pt-2 text-sm font-semibold text-red-600"
                >
                  <LogOut size={18} />
                  {isSigningOut ? "Signing out..." : "Logout"}
                </button>
              </>
            ) : !isPending ? (
              <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-input bg-background text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  <LogIn size={17} />
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMobileMenu}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
                >
                  <UserPlus size={17} />
                  Register
                </Link>
              </div>
            ) : (
              <div className="h-11 animate-pulse rounded-xl bg-secondary" />
            )}
          </div>
        </div>
      )}
    </header>
  );
}
