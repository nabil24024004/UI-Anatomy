"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { user } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex items-center justify-center">
                            <Logo className="w-8 h-8" />
                        </div>
                        <span className="font-heading font-bold text-lg text-text-primary group-hover:text-accent transition-colors">
                            UI Anatomy
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/case-studies"
                            className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
                        >
                            Case Studies
                        </Link>
                        <Link
                            href="/about"
                            className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
                        >
                            About
                        </Link>
                        <Link
                            href="/subscribe"
                            className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
                        >
                            Subscribe
                        </Link>
                    </div>

                    {/* Search & Admin Login */}
                    <div className="flex items-center gap-4">
                        {/* Search Button */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 rounded-lg hover:bg-surface-hover transition-colors"
                            aria-label="Search"
                        >
                            <svg
                                className="w-5 h-5 text-text-secondary"
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
                        </button>

                        {/* Admin Login / Dashboard */}
                        {user ? (
                            <Link
                                href="/admin"
                                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent border border-accent/20 text-sm font-medium hover:bg-accent/20 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-text-secondary text-sm font-medium hover:border-accent hover:text-accent transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Admin Login
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-surface-hover transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-5 h-5 text-text-secondary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Search Bar Expanded */}
                {isSearchOpen && (
                    <div className="absolute top-full left-0 right-0 p-4 glass border-t border-border animate-fade-in-up">
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search case studies..."
                                    className="w-full px-4 py-3 pl-12 rounded-xl bg-surface-secondary border border-border text-text-primary placeholder-text-muted focus:border-accent focus:outline-none transition-colors"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            window.location.href = `/case-studies?search=${encodeURIComponent(e.currentTarget.value)}`;
                                            setIsSearchOpen(false);
                                        }
                                    }}
                                />
                                <svg
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
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
                        </div>
                    </div>
                )}

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-border animate-fade-in-up">
                        <div className="px-4 py-6 space-y-4">
                            <Link
                                href="/case-studies"
                                className="block text-text-secondary hover:text-text-primary transition-colors font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Case Studies
                            </Link>
                            <Link
                                href="/about"
                                className="block text-text-secondary hover:text-text-primary transition-colors font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="/subscribe"
                                className="block text-text-secondary hover:text-text-primary transition-colors font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Subscribe
                            </Link>
                            <hr className="border-border" />
                            {user ? (
                                <Link
                                    href="/admin"
                                    className="block text-accent font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="block text-text-secondary hover:text-text-primary transition-colors font-medium"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Admin Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
