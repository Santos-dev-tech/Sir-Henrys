"use client";

import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { siteConfig } from "@/lib/siteConfig";
import { mockProducts } from "@/lib/mockData";

export default function HomePage() {
  // Show first 4 products as "The Collection"
  const featured = mockProducts.slice(0, 4);

  return (
    <main>
      {/* ========== HERO ========== */}
      <section className="relative w-full" style={{ height: "90vh" }}>
        {/* Background image */}
        <Image
          src="/images/hero.jpg"
          alt="Tailored suit editorial"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ filter: "brightness(0.55)" }}
        />

        {/* Brand wordmark overlay — centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h1
            className="font-display italic text-offwhite leading-none select-none text-center"
            style={{
              fontSize: "clamp(2rem, 8vw, 7rem)",
              textShadow: "0 2px 40px rgba(0,0,0,0.4)",
            }}
          >
            {siteConfig.brand}
          </h1>
        </div>

        {/* Bottom-left CTA overlay */}
        <div className="absolute bottom-10 left-6 lg:left-10 z-10">
          <p className="font-ui text-[12px] tracking-[0.14em] text-offwhite/80 mb-3">
            {siteConfig.heroLabel}
          </p>
          <Link
            href="/catalog"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-offwhite/80 text-offwhite font-ui text-[13px] tracking-[0.12em] hover:bg-offwhite hover:text-navy transition-all duration-200"
          >
            Explore the Collection
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              <path d="M3 8H13M9 4L13 8L9 12" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ========== THE COLLECTION ========== */}
      <section className="py-16">
        {/* Section header */}
        <ScrollReveal>
          <div className="px-6 lg:px-10 mb-8">
            <h2 className="font-display text-3xl md:text-4xl italic text-navy">
              The Collection
            </h2>
            <p className="font-body text-[15px] text-primary/50 mt-2 leading-relaxed">
              Seasonal selections from the atelier — each garment made to order
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop: 4-column edge-to-edge grid */}
        <div className="hidden md:grid grid-cols-4">
          {featured.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.06}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile: horizontal scroll-snap carousel */}
        <div className="md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          <div
            className="flex"
            style={{ width: `${featured.length * 72}%` }}
          >
            {featured.map((product) => (
              <div
                key={product.id}
                className="snap-start flex-shrink-0"
                style={{ width: `${100 / featured.length}%` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
