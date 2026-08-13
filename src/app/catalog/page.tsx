"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { mockProducts } from "@/lib/mockData";

type SortOption = "newest" | "price-asc" | "price-desc";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "suits", label: "Suits" },
  { value: "blazers", label: "Blazers" },
  { value: "shirts", label: "Shirts" },
  { value: "trousers", label: "Trousers" },
  { value: "accessories", label: "Accessories" },
];

export default function CatalogPage() {
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const filtered = useMemo(() => {
    let result = [...mockProducts];

    // Filter by category
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Sort
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.priceCents - b.priceCents);
        break;
      case "price-desc":
        result.sort((a, b) => b.priceCents - a.priceCents);
        break;
      case "newest":
      default:
        break;
    }

    return result;
  }, [category, sort]);

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate brief loading
    setTimeout(() => {
      setVisibleCount((c) => c + 8);
      setIsLoading(false);
    }, 400);
  };

  return (
    <main className="min-h-screen">
      {/* Page header */}
      <ScrollReveal>
        <div className="px-6 lg:px-10 pt-10 pb-6">
          <h1 className="font-display text-3xl md:text-5xl italic text-navy">
            The Collection
          </h1>
          <p className="font-body text-[15px] text-primary/50 mt-2">
            Suits, sport coats, shirts, trousers, and accessories — each piece
            from the current season
          </p>
        </div>
      </ScrollReveal>

      {/* Filter / sort bar */}
      <div className="px-6 lg:px-10 pb-8 flex flex-wrap items-center gap-3">
        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setCategory(cat.value);
                setVisibleCount(8);
              }}
              className={`btn-primary px-4 py-2 border font-ui text-[12px] tracking-[0.08em] transition-all duration-200 ${
                category === cat.value
                  ? "bg-navy text-offwhite border-navy"
                  : "bg-transparent text-primary border-hairline hover:border-brass"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="ml-auto h-10 px-3 border border-hairline bg-transparent font-ui text-[12px] tracking-[0.08em] text-primary focus:outline-none focus:border-brass cursor-pointer"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {displayed.map((product, i) => (
          <ScrollReveal key={product.id} delay={i * 0.06}>
            <ProductCard product={product} />
          </ScrollReveal>
        ))}
      </div>

      {/* Skeleton loading blocks */}
      {isLoading && (
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`skel-${i}`} className="p-0">
              <div className="aspect-[3/4] skeleton" />
              <div className="px-3 py-3 space-y-2">
                <div className="h-3 skeleton w-3/4" />
                <div className="h-3 skeleton w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && !isLoading && (
        <div className="flex justify-center py-12">
          <button
            onClick={handleLoadMore}
            className="btn-primary px-10 py-3 bg-navy text-offwhite font-ui text-[13px] tracking-[0.12em] border border-navy hover:bg-offwhite hover:text-navy transition-colors duration-200"
          >
            Load More
          </button>
        </div>
      )}

      {/* Empty state */}
      {displayed.length === 0 && !isLoading && (
        <div className="flex items-center justify-center py-20">
          <p className="font-ui text-[13px] tracking-[0.08em] text-primary/50">
            No garments found in this category
          </p>
        </div>
      )}
    </main>
  );
}
