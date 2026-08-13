"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { useCartStore } from "@/lib/store";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);
  const [badgePulse, setBadgePulse] = useState(false);
  const [prevCount, setPrevCount] = useState(totalItems);

  // Cart badge pulse animation when item count increases
  useEffect(() => {
    if (totalItems > prevCount) {
      setBadgePulse(true);
      const timer = setTimeout(() => setBadgePulse(false), 300);
      return () => clearTimeout(timer);
    }
    setPrevCount(totalItems);
  }, [totalItems, prevCount]);

  return (
    <>
      <header className="sticky top-[34px] z-40 bg-offwhite/95 backdrop-blur-sm border-b border-brass/40">
        <div className="flex items-center justify-between h-14 px-6 lg:px-10">
          {/* Left — Navigation (desktop) / Hamburger (mobile) */}
          <nav className="flex items-center gap-6">
            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-6 h-6 gap-[5px]"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block w-5 h-[1.5px] bg-primary" />
              <span className="block w-5 h-[1.5px] bg-primary" />
            </button>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-8">
              {siteConfig.navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link font-ui text-[13px] tracking-[0.1em] text-primary transition-opacity duration-200 ${
                      isActive ? "nav-link--active" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Center — Brand wordmark */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-display text-lg md:text-xl tracking-[0.04em] text-navy"
          >
            {siteConfig.brand}
          </Link>

          {/* Right — Cart */}
          <button
            onClick={openCart}
            className="nav-link font-ui text-[13px] tracking-[0.1em] text-primary"
          >
            Cart{" "}
            <span className={badgePulse ? "cart-badge-pulse inline-block" : "inline-block"}>
              ({totalItems})
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
