"use client";

import { useState } from "react";
import Link from "next/link";

export default function SubscribePage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
        "idle"
    );
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
                setMessage("Welcome aboard! Check your inbox for confirmation.");
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
        <div className="pt-24 pb-20 min-h-screen flex items-center">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {status === "success" ? (
                    /* Success State */
                    <div className="text-center animate-fade-in-up">
                        <div className="w-20 h-20 mx-auto mb-8 rounded-full gradient-accent flex items-center justify-center">
                            <svg
                                className="w-10 h-10 text-background"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h1 className="font-heading font-bold text-4xl text-text-primary mb-4">
                            You&apos;re in! 🎉
                        </h1>
                        <p className="text-text-secondary text-lg mb-8">{message}</p>
                        <Link
                            href="/case-studies"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-background font-semibold hover:opacity-90 transition-opacity"
                        >
                            <span>Start Reading</span>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                    </div>
                ) : (
                    /* Form State */
                    <div className="text-center">
                        {/* Icon */}
                        <div className="w-20 h-20 mx-auto mb-8 rounded-full gradient-accent flex items-center justify-center animate-glow">
                            <svg
                                className="w-10 h-10 text-background"
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
                        <h1 className="font-heading font-bold text-4xl md:text-5xl text-text-primary mb-4">
                            Get UX insights delivered
                        </h1>

                        {/* Description */}
                        <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
                            New case studies, pattern breakdowns, and design ethics
                            discussions—straight to your inbox.
                        </p>

                        {/* What You Get */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                            {[
                                { icon: "📚", text: "Weekly case studies" },
                                { icon: "🎯", text: "Actionable insights" },
                                { icon: "🚫", text: "No spam, ever" },
                            ].map((item) => (
                                <div
                                    key={item.text}
                                    className="p-4 rounded-xl bg-surface border border-border"
                                >
                                    <span className="text-2xl mb-2 block">{item.icon}</span>
                                    <span className="text-text-secondary text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="flex-1 px-5 py-4 rounded-xl bg-surface border border-border text-text-primary placeholder-text-muted focus:border-accent focus:outline-none transition-colors text-center sm:text-left"
                                />
                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="px-8 py-4 rounded-xl gradient-accent text-background font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === "loading" ? (
                                        <span className="flex items-center justify-center gap-2">
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
                            </div>

                            {/* Error Message */}
                            {status === "error" && message && (
                                <p className="mt-4 text-red-400 text-sm">{message}</p>
                            )}
                        </form>

                        {/* Trust */}
                        <p className="mt-8 text-text-muted text-sm">
                            Join 2,000+ designers and researchers. Unsubscribe anytime.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
