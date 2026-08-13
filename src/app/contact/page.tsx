"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-[700px] mx-auto px-6 lg:px-10 py-16">
        <h1 className="font-display text-3xl md:text-5xl italic text-navy mb-4">
          Enquiries
        </h1>
        <p className="font-body text-[15px] text-primary/60 mb-10 leading-relaxed">
          Bespoke appointments, trade pricing, fabric enquiries, or simply to
          say hello. We read and respond to every message personally.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full h-12 px-4 border border-brass/40 bg-transparent font-body text-[15px] text-primary placeholder:text-primary/40 focus:outline-none focus:border-brass transition-colors"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full h-12 px-4 border border-brass/40 bg-transparent font-body text-[15px] text-primary placeholder:text-primary/40 focus:outline-none focus:border-brass transition-colors"
            />
          </div>
          <div>
            <textarea
              placeholder="Your message"
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 border border-brass/40 bg-transparent font-body text-[15px] text-primary placeholder:text-primary/40 focus:outline-none focus:border-brass transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary w-full h-12 bg-navy text-offwhite font-ui text-[13px] tracking-[0.12em] border border-navy hover:bg-offwhite hover:text-navy transition-colors duration-200 disabled:opacity-50"
          >
            {status === "sending"
              ? "Sending..."
              : status === "sent"
              ? "Message Sent \u2713"
              : status === "error"
              ? "Failed — Please Try Again"
              : "Send Enquiry"}
          </button>
        </form>
      </div>
    </main>
  );
}
