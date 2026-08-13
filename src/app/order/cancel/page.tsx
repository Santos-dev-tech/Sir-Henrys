import Link from "next/link";

export default function OrderCancelPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-[500px] mx-auto px-6 text-center">
        <h1 className="font-display text-3xl md:text-4xl uppercase text-primary mb-4">
          Order Cancelled
        </h1>
        <p className="font-body text-sm text-primary/60 mb-10">
          Your order was not completed. Your cart items are still saved — pick up
          where you left off whenever you&apos;re ready.
        </p>

        <Link
          href="/catalog"
          className="inline-block px-8 py-3 bg-primary text-white font-ui text-[12px] uppercase tracking-[0.12em] border border-primary hover:bg-white hover:text-primary transition-colors duration-200"
        >
          Back to Catalog
        </Link>
      </div>
    </main>
  );
}
