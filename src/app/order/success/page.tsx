import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-[500px] mx-auto px-6 text-center">
        <div className="w-16 h-16 border-2 border-primary flex items-center justify-center mx-auto mb-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="font-display text-3xl md:text-4xl uppercase text-primary mb-4">
          Order Confirmed
        </h1>
        <p className="font-body text-sm text-primary/60 mb-2">
          Thank you for your order. You&apos;ll receive a confirmation email
          shortly.
        </p>
        <p className="font-ui text-[11px] uppercase tracking-[0.1em] text-primary/40 mb-10">
          Order details have been sent to your email
        </p>

        <Link
          href="/catalog"
          className="inline-block px-8 py-3 bg-primary text-white font-ui text-[12px] uppercase tracking-[0.12em] border border-primary hover:bg-white hover:text-primary transition-colors duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
