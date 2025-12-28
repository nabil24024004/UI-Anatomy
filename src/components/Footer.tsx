import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex items-center justify-center">
                                <Logo className="w-8 h-8" />
                            </div>
                            <span className="font-heading font-bold text-lg text-text-primary">
                                UI Anatomy
                            </span>
                        </Link>
                        <p className="text-text-secondary text-sm max-w-md mb-6">
                            A curated UX research library analyzing real-world product
                            interfaces. Deep-dive case studies on onboarding, retention,
                            monetization, and ethical design patterns.
                        </p>
                        {/* Mini Newsletter */}
                        <div className="flex gap-2 max-w-sm">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 px-4 py-2 rounded-lg bg-surface-secondary border border-border text-sm text-text-primary placeholder-text-muted focus:border-accent focus:outline-none transition-colors"
                            />
                            <button className="px-4 py-2 rounded-lg gradient-accent text-background font-medium text-sm hover:opacity-90 transition-opacity">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-heading font-semibold text-text-primary mb-4">
                            Explore
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/case-studies"
                                    className="text-text-secondary hover:text-accent transition-colors text-sm"
                                >
                                    Case Studies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tags/onboarding"
                                    className="text-text-secondary hover:text-accent transition-colors text-sm"
                                >
                                    Onboarding
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tags/retention"
                                    className="text-text-secondary hover:text-accent transition-colors text-sm"
                                >
                                    Retention
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tags/monetization"
                                    className="text-text-secondary hover:text-accent transition-colors text-sm"
                                >
                                    Monetization
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-text-primary mb-4">
                            Connect
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-text-secondary hover:text-accent transition-colors text-sm"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/subscribe"
                                    className="text-text-secondary hover:text-accent transition-colors text-sm"
                                >
                                    Newsletter
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-secondary hover:text-accent transition-colors text-sm"
                                >
                                    Twitter / X
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-text-secondary hover:text-accent transition-colors text-sm"
                                >
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-text-muted text-sm">
                        © {currentYear} UI Anatomy. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link
                            href="/privacy"
                            className="text-text-muted hover:text-text-secondary transition-colors text-sm"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-text-muted hover:text-text-secondary transition-colors text-sm"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
