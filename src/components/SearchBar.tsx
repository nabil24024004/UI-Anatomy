"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
    placeholder?: string;
    initialValue?: string;
}

export default function SearchBar({
    placeholder = "Search case studies...",
    initialValue = "",
}: SearchBarProps) {
    const [query, setQuery] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Handle search with debounce
    useEffect(() => {
        const debounce = setTimeout(() => {
            if (query) {
                router.push(`/case-studies?search=${encodeURIComponent(query)}`);
            }
        }, 400);

        return () => clearTimeout(debounce);
    }, [query, router]);

    // Keyboard shortcut (Cmd/Ctrl + K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div
            className={`relative transition-all duration-300 ${isFocused ? "scale-[1.02]" : ""
                }`}
        >
            <div
                className={`relative flex items-center rounded-xl bg-surface border transition-all duration-300 ${isFocused ? "border-accent shadow-lg shadow-accent/10" : "border-border"
                    }`}
            >
                {/* Search Icon */}
                <div className="pl-4">
                    <svg
                        className={`w-5 h-5 transition-colors ${isFocused ? "text-accent" : "text-text-muted"
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* Input */}
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder}
                    className="flex-1 px-4 py-3 bg-transparent text-text-primary placeholder-text-muted focus:outline-none"
                />

                {/* Keyboard Shortcut Hint */}
                {!isFocused && !query && (
                    <div className="hidden sm:flex items-center gap-1 pr-4">
                        <kbd className="px-2 py-1 rounded bg-surface-secondary text-text-muted text-xs font-mono border border-border">
                            ⌘
                        </kbd>
                        <kbd className="px-2 py-1 rounded bg-surface-secondary text-text-muted text-xs font-mono border border-border">
                            K
                        </kbd>
                    </div>
                )}

                {/* Clear Button */}
                {query && (
                    <button
                        onClick={() => {
                            setQuery("");
                            router.push("/case-studies");
                        }}
                        className="pr-4 text-text-muted hover:text-text-primary transition-colors"
                    >
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
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}
