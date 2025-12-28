"use client";

import { useState } from "react";

export default function NewsletterCTA() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return;

        setStatus("loading");

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStatus("success");
                setMessage("Thanks for subscribing! Check your inbox.");
                setEmail("");
            } else {
                const data = await res.json();
                setStatus("error");
                setMessage(data.error || "Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }
    };

    return (
        <section className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-surface" />
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-accent-orange/5 blur-3xl" />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-accent flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-background"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                </div>

                {/* Title */}
                <h2 className="font-heading font-bold text-3xl md:text-4xl text-text-primary mb-4">
                    Stay in the loop
                </h2>

                {/* Description */}
                <p className="text-text-secondary text-lg max-w-xl mx-auto mb-8">
                    Get new UX case studies delivered to your inbox. No spam, just insights
                    from real product interfaces.
                </p>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="flex-1 px-5 py-3 rounded-xl bg-surface-secondary border border-border text-text-primary placeholder-text-muted focus:border-accent focus:outline-none transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="px-6 py-3 rounded-xl gradient-accent text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === "loading" ? (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="animate-spin w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                <span>Subscribing...</span>
                            </span>
                        ) : (
                            "Subscribe"
                        )}
                    </button>
                </form>

                {/* Status Message */}
                {message && (
                    <p
                        className={`mt-4 text-sm ${status === "success" ? "text-green-400" : "text-red-400"
                            }`}
                    >
                        {message}
                    </p>
                )}

                {/* Trust Signals */}
                <p className="mt-6 text-text-muted text-sm">
                    Join 2,000+ designers and researchers. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
}
