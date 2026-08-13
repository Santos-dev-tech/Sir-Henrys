import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      return NextResponse.json(
        {
          error: "Stripe is not configured",
          url: null,
        },
        { status: 200 }
      );
    }

    // Dynamic import to avoid errors when stripe isn't installed yet
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(stripeKey, { apiVersion: "2025-02-24.acacia" });

    const lineItems = items.map(
      (item: {
        name: string;
        size: string;
        priceCents: number;
        quantity: number;
      }) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: `${item.name} — ${item.size}`,
          },
          unit_amount: item.priceCents,
        },
        quantity: item.quantity,
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
