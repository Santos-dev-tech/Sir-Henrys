"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasSecondImage = product.images.length > 1;

  const isOnSale =
    product.compareAtCents !== null &&
    product.compareAtCents > product.priceCents;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="product-card-wrapper group block"
    >
      {/* Image — overflow-hidden container for contained scale */}
      <div className="relative w-full aspect-[3/4] bg-offwhite overflow-hidden">
        {/* Primary image — always visible */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="product-card-image-primary object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Secondary image — overlaid, visible on hover (desktop only) */}
        {hasSecondImage && (
          <Image
            src={product.images[1]}
            alt={`${product.name} — alternate`}
            fill
            className="product-card-image-secondary object-cover opacity-0 absolute inset-0"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
      </div>

      {/* Info */}
      <div className="px-3 py-3">
        <p className="font-ui text-[12px] tracking-[0.06em] text-primary truncate">
          {product.name}
        </p>
        <p className="font-body text-[11px] text-primary/40 mt-0.5 tracking-wide">
          {product.fabric}
        </p>
        <div className="flex items-center gap-2 mt-1">
          {isOnSale && (
            <span className="font-body text-[12px] text-primary/40 line-through">
              {formatPrice(product.compareAtCents!)}
            </span>
          )}
          <span
            className={`font-body text-[13px] ${
              isOnSale ? "text-accent" : "text-primary"
            }`}
          >
            {formatPrice(product.priceCents)}
          </span>
        </div>
      </div>
    </Link>
  );
}
