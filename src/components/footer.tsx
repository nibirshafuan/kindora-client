import Link from "next/link";
import {
  HeartHandshake,
  Globe,
  Camera,
  BriefcaseBusiness,
  Mail,
  MapPin,
  ArrowUpRight,
  Heart,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Create an Event", href: "/create-event" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
  { label: "Joined Events", href: "/joined-events" },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com", icon: Globe },
  { label: "Instagram", href: "https://www.instagram.com", icon: Camera },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: BriefcaseBusiness },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 border-b border-border pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <HeartHandshake size={24} strokeWidth={2.2} />
              </span>

              <span>
                <span className="block text-xl font-extrabold tracking-tight text-foreground">
                  Kindora<span className="text-primary">.</span>
                </span>
                <span className="mt-0.5 block text-[10px] font-bold tracking-[0.13em] text-muted-foreground">
                  COMMUNITY FOR GOOD
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-muted-foreground">
              Bringing people together through meaningful events, kindness,
              and community action. Every small step creates a greater impact.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-foreground">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                    <ArrowUpRight size={13} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-foreground">
              Your Account
            </h3>

            <ul className="mt-6 space-y-4">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-foreground">
              Get in Touch
            </h3>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin size={17} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Our Community
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail size={17} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Email Us
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Get in touch through our community platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-muted-foreground">
            © 2026 Kindora. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            Made with <Heart size={14} className="fill-primary text-primary" />
            for a better community.
          </p>
        </div>
      </div>
    </footer>
  );
}

