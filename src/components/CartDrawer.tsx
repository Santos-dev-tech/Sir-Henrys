"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/lib/store";

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const subtotalCents = useCartStore((s) => s.subtotalCents());

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(
          "Stripe is not configured yet. Add your STRIPE_SECRET_KEY to .env.local to enable checkout."
        );
      }
    } catch {
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={closeCart}
          />

          {/* Drawer panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-offwhite flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-14 border-b border-brass/30">
              <span className="font-ui text-[13px] tracking-[0.1em] text-primary">
                Your Cart ({items.length})
              </span>
              <button
                onClick={closeCart}
                className="text-primary text-xl hover:opacity-60 transition-opacity"
                aria-label="Close cart"
              >
                &times;
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="font-ui text-[13px] tracking-[0.08em] text-primary/60 mb-4">
                    Your cart is empty
                  </p>
                  <Link
                    href="/catalog"
                    onClick={closeCart}
                    className="nav-link font-ui text-[12px] tracking-[0.1em] text-primary"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-4 pb-6 border-b border-brass/20 last:border-0"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-24 bg-offwhite flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <p className="font-ui text-[12px] tracking-[0.06em] text-primary truncate">
                          {item.name}
                        </p>
                        <p className="font-body text-[12px] text-primary/50 mt-0.5">
                          Size: {item.size}
                          {item.fabric ? ` · ${item.fabric}` : ""}
                        </p>
                        <p className="font-body text-[13px] text-primary mt-1">
                          {formatPrice(item.priceCents)}
                        </p>

                        {/* Quantity stepper */}
                        <div className="flex items-center gap-3 mt-auto pt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 border border-brass/40 flex items-center justify-center font-body text-[13px] text-primary hover:border-brass hover:bg-navy hover:text-offwhite transition-colors duration-200"
                          >
                            &ndash;
                          </button>
                          <span className="font-body text-[13px] text-primary w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 border border-brass/40 flex items-center justify-center font-body text-[13px] text-primary hover:border-brass hover:bg-navy hover:text-offwhite transition-colors duration-200"
                          >
                            +
                          </button>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-primary/40 hover:text-accent text-lg transition-colors"
                            aria-label="Remove item"
                          >
                            &times;
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer — subtotal + checkout */}
            {items.length > 0 && (
              <div className="border-t border-navy px-6 py-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-ui text-[13px] tracking-[0.1em]">
                    Subtotal
                  </span>
                  <span className="font-display text-[16px]">
                    {formatPrice(subtotalCents)}
                  </span>
                </div>
                <p className="font-body text-[12px] text-primary/50 mb-5">
                  Taxes and shipping calculated at checkout
                </p>
                <button
                  onClick={handleCheckout}
                  className="btn-primary w-full h-12 bg-navy text-offwhite font-ui text-[13px] tracking-[0.12em] hover:bg-offwhite hover:text-navy border border-navy transition-colors duration-200"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
