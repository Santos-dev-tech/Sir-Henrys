"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Simple payment method icon placeholders
function PaymentIcons() {
  const icons = ["VISA", "MC", "AMEX", "PAYPAL", "APPLE PAY"];
  return (
    <div className="flex items-center gap-3">
      {icons.map((name) => (
        <div
          key={name}
          className="px-2 py-1 border border-brass/40 font-ui text-[9px] tracking-[0.08em] text-primary/50"
        >
          {name}
        </div>
      ))}
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-offwhite border-t border-brass/40">
      {/* Heritage / Newsletter section — wood grain texture */}
      <div className="wood-grain-bg bg-offwhite">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 pb-12">
          {/* Main headline */}
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl italic text-center text-navy mb-4">
            {siteConfig.footerHype}
          </h2>
          <p className="font-body text-[15px] text-primary/60 text-center max-w-lg mx-auto mb-10 leading-relaxed">
            {siteConfig.footerSubheading}
          </p>

          {/* Email capture + social row */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 mb-16">
            {/* Email form */}
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row w-full lg:w-auto gap-0"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
                className="h-12 px-4 border border-brass/60 bg-transparent font-ui text-[12px] tracking-[0.08em] text-primary placeholder:text-primary/40 w-full sm:w-72 focus:outline-none focus:ring-1 focus:ring-brass"
              />
              <button
                type="submit"
                className="btn-primary h-12 px-8 bg-navy text-offwhite font-ui text-[12px] tracking-[0.12em] border border-navy hover:bg-offwhite hover:text-navy transition-colors duration-200"
              >
                {subscribed ? "Subscribed \u2713" : "Subscribe"}
              </button>
            </form>

            {/* Social icons */}
            <div className="flex items-center gap-5">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon text-primary"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon text-primary"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
              <a
                href={siteConfig.social.x}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon text-primary"
                aria-label="X"
              >
                <XIcon />
              </a>
            </div>
          </div>

          {/* Links + payment icons row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-10 border-b border-brass/30">
            {/* Footer links */}
            <nav className="flex items-center gap-6">
              {siteConfig.footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link font-ui text-[11px] tracking-[0.1em] text-primary/60 hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Payment icons */}
            <PaymentIcons />
          </div>
        </div>
      </div>

      {/* Brand wordmark */}
      <div className="overflow-hidden pb-6 pt-4">
        <p
          className="font-display italic text-navy/20 text-center leading-none select-none"
          style={{ fontSize: "clamp(2.5rem, 12vw, 9rem)" }}
        >
          {siteConfig.brand}
        </p>
      </div>
    </footer>
  );
}
