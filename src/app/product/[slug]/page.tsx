"use client";

import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@/lib/mockData";
import { useCartStore } from "@/lib/store";
import ProductViewer360 from "@/components/ProductViewer360";
import Lightbox from "@/components/Lightbox";
import SizeSelector from "@/components/SizeSelector";
import FabricSelector from "@/components/FabricSelector";
import Accordion from "@/components/Accordion";

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const addItem = useCartStore((s) => s.addItem);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxFrame, setLightboxFrame] = useState(0);

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl italic text-navy mb-4">
            Product Not Found
          </h1>
          <Link
            href="/catalog"
            className="nav-link font-ui text-[13px] tracking-[0.1em] text-primary"
          >
            Back to Collection
          </Link>
        </div>
      </main>
    );
  }

  const isOnSale =
    product.compareAtCents !== null &&
    product.compareAtCents > product.priceCents;

  const canAddToCart = !!selectedSize && !!selectedFabric;

  const handleAddToCart = () => {
    if (!canAddToCart) return;
    const fabricLabel =
      product.fabricOptions.find((f) => f.value === selectedFabric)?.label ||
      selectedFabric!;

    addItem({
      id: `${product.id}-${selectedSize}-${selectedFabric}`,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      size: selectedSize!,
      fabric: fabricLabel,
      priceCents: product.priceCents,
      image: product.images[0],
    });
  };

  const handleOpenLightbox = useCallback((frameIndex: number) => {
    setLightboxFrame(frameIndex);
    setLightboxOpen(true);
  }, []);

  // Get lightbox image source
  const hasSpinFrames = product.spinFrames && product.spinFrames.length > 0;
  const lightboxSrc = hasSpinFrames
    ? product.spinFrames[lightboxFrame] || product.images[0]
    : product.images[0] || "";

  return (
    <main className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* ===== LEFT COLUMN — Product info (40%) ===== */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* Breadcrumb */}
            <p className="font-body text-[12px] text-primary/40 mb-4">
              <Link href="/catalog" className="hover:text-primary transition-colors">
                Collection
              </Link>
              {" / "}
              <span className="text-primary/60">{product.name}</span>
            </p>

            {/* Title */}
            <h1 className="font-display text-2xl md:text-3xl italic text-navy mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-2">
              {isOnSale && (
                <span className="font-body text-[15px] text-primary/40 line-through">
                  {formatPrice(product.compareAtCents!)}
                </span>
              )}
              <span
                className={`font-display text-[18px] ${
                  isOnSale ? "text-accent" : "text-primary"
                }`}
              >
                {formatPrice(product.priceCents)}
              </span>
            </div>

            {/* Fabric info */}
            <p className="font-body text-[13px] text-brass mb-6 tracking-wide">
              {product.fabric}
            </p>

            {/* Description */}
            <p className="font-body text-[15px] text-primary/80 leading-relaxed mb-8 text-justify">
              {product.description}
            </p>

            {/* Fabric/Color Selector */}
            <div className="mb-5">
              <p className="font-ui text-[12px] tracking-[0.1em] text-primary/60 mb-2">
                Fabric &amp; Colour
              </p>
              <FabricSelector
                options={product.fabricOptions}
                selected={selectedFabric}
                onSelect={setSelectedFabric}
              />
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <p className="font-ui text-[12px] tracking-[0.1em] text-primary/60 mb-2">
                Size
              </p>
              <SizeSelector
                sizes={product.sizes}
                selected={selectedSize}
                onSelect={setSelectedSize}
                outOfStockSizes={product.outOfStockSizes}
              />
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={`btn-primary w-full h-12 font-ui text-[13px] tracking-[0.12em] border transition-colors duration-200 mb-8 ${
                canAddToCart
                  ? "bg-navy text-offwhite border-navy hover:bg-offwhite hover:text-navy cursor-pointer"
                  : "bg-[#CCCCCC] text-[#888888] border-[#CCCCCC] cursor-not-allowed"
              }`}
            >
              {canAddToCart
                ? `Add to Cart — ${formatPrice(product.priceCents)}`
                : "Select Fabric & Size"}
            </button>

            {/* Accordions */}
            <div className="border-b border-brass/30">
              {/* Fit Guide */}
              <Accordion title="Fit Guide">
                <table className="w-full text-left font-body text-[13px]">
                  <thead>
                    <tr className="border-b border-brass/20">
                      <th className="py-2 font-medium text-primary">Size</th>
                      <th className="py-2 font-medium text-primary">Chest</th>
                      <th className="py-2 font-medium text-primary">Waist</th>
                      <th className="py-2 font-medium text-primary">Sleeve</th>
                      <th className="py-2 font-medium text-primary">Inseam</th>
                    </tr>
                  </thead>
                  <tbody className="text-primary/60">
                    <tr className="border-b border-brass/10">
                      <td className="py-2">36R</td>
                      <td className="py-2">91cm</td>
                      <td className="py-2">76cm</td>
                      <td className="py-2">84cm</td>
                      <td className="py-2">81cm</td>
                    </tr>
                    <tr className="border-b border-brass/10">
                      <td className="py-2">38R</td>
                      <td className="py-2">96cm</td>
                      <td className="py-2">81cm</td>
                      <td className="py-2">85cm</td>
                      <td className="py-2">81cm</td>
                    </tr>
                    <tr className="border-b border-brass/10">
                      <td className="py-2">40R</td>
                      <td className="py-2">101cm</td>
                      <td className="py-2">86cm</td>
                      <td className="py-2">86cm</td>
                      <td className="py-2">82cm</td>
                    </tr>
                    <tr className="border-b border-brass/10">
                      <td className="py-2">42R</td>
                      <td className="py-2">107cm</td>
                      <td className="py-2">91cm</td>
                      <td className="py-2">87cm</td>
                      <td className="py-2">82cm</td>
                    </tr>
                    <tr className="border-b border-brass/10">
                      <td className="py-2">44R</td>
                      <td className="py-2">112cm</td>
                      <td className="py-2">97cm</td>
                      <td className="py-2">88cm</td>
                      <td className="py-2">82cm</td>
                    </tr>
                    <tr>
                      <td className="py-2">46R</td>
                      <td className="py-2">117cm</td>
                      <td className="py-2">102cm</td>
                      <td className="py-2">89cm</td>
                      <td className="py-2">83cm</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-3 text-[13px] text-primary/50 font-body italic">
                  Measurements are approximate. For a precise fit, we recommend
                  visiting the atelier or contacting us for guidance.
                </p>
              </Accordion>

              {/* Fabric & Care */}
              <Accordion title="Fabric &amp; Care">
                <div className="space-y-3 font-body text-[15px]">
                  <p>
                    <strong className="text-primary">Composition:</strong>{" "}
                    {product.fabric}. Woven exclusively for Ashworth & Grey by
                    heritage mills in Italy and the United Kingdom.
                  </p>
                  <p>
                    <strong className="text-primary">Interlining:</strong>{" "}
                    Full-canvas horsehair chest piece, hand-padded for a natural
                    drape that moulds to the wearer over time. No fusing.
                  </p>
                  <p>
                    <strong className="text-primary">Care:</strong> Dry clean
                    only. We recommend hanging on a shaped wooden hanger between
                    wears. Brush after each use with a natural bristle garment
                    brush. Steam lightly to remove creases — never iron directly
                    on the face of the cloth.
                  </p>
                </div>
              </Accordion>

              {/* Shipping & Returns */}
              <Accordion title="Shipping &amp; Returns">
                <div className="space-y-3 font-body text-[15px]">
                  <p>
                    <strong className="text-primary">Shipping:</strong> All
                    orders are dispatched within 3–5 business days. Complimentary
                    shipping on orders above $500. International delivery rates
                    calculated at checkout. Each garment is wrapped in tissue and
                    delivered in our signature garment bag.
                  </p>
                  <p>
                    <strong className="text-primary">Returns:</strong> We accept
                    returns within 14 days of delivery for unworn garments with
                    all tags attached. Made-to-order and altered garments are
                    final sale. Contact us to arrange a return.
                  </p>
                  <p>
                    <strong className="text-primary">Alterations:</strong>{" "}
                    Complimentary alterations are included with every suit and
                    blazer purchase. Additional alterations available at our
                    atelier.
                  </p>
                </div>
              </Accordion>
            </div>
          </div>

          {/* ===== RIGHT COLUMN — 360 Viewer (60%) ===== */}
          <div className="lg:col-span-3 order-1 lg:order-2" data-viewer360>
            <ProductViewer360
              product={product}
              onOpenLightbox={handleOpenLightbox}
            />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        imageSrc={lightboxSrc}
        alt={product.name}
        onClose={() => setLightboxOpen(false)}
      />
    </main>
  );
}
