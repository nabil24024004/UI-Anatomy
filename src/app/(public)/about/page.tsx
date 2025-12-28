import Link from "next/link";
import NewsletterCTA from "@/components/NewsletterCTA";

export const metadata = {
    title: "About | UI Anatomy",
    description:
        "Learn about UI Anatomy - a curated UX research library analyzing real-world product interfaces.",
};

export default function AboutPage() {
    return (
        <div className="pt-24">
            {/* Hero */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="font-heading font-bold text-4xl md:text-6xl text-text-primary mb-6">
                        UX Research for the{" "}
                        <span className="gradient-text">Curious Mind</span>
                    </h1>
                    <p className="text-text-secondary text-xl leading-relaxed max-w-2xl mx-auto">
                        We dissect the design decisions of the world&apos;s most successful
                        products, turning hidden patterns into actionable insights.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-accent font-medium uppercase tracking-widest text-sm">
                                Our Mission
                            </span>
                            <h2 className="font-heading font-bold text-3xl text-text-primary mt-4 mb-6">
                                Democratizing UX Knowledge
                            </h2>
                            <p className="text-text-secondary text-lg leading-relaxed mb-6">
                                The best products in the world are built on invisible
                                foundations—subtle design decisions that most users never
                                notice, but deeply feel. These patterns are often locked away in
                                expensive courses, proprietary research, or learned through
                                years of trial and error.
                            </p>
                            <p className="text-text-secondary text-lg leading-relaxed">
                                UI Anatomy opens that vault. We break down onboarding flows,
                                retention mechanics, monetization strategies, and ethical
                                considerations—making world-class UX research accessible to
                                everyone.
                            </p>
                        </div>

                        {/* Values */}
                        <div className="grid gap-6">
                            {[
                                {
                                    icon: "🔍",
                                    title: "Deep Analysis",
                                    description:
                                        "We go beyond surface-level observations to uncover the psychology and business logic behind design decisions.",
                                },
                                {
                                    icon: "⚖️",
                                    title: "Ethical Lens",
                                    description:
                                        "Every case study considers the ethical implications of design patterns—not just what works, but what should work.",
                                },
                                {
                                    icon: "🎯",
                                    title: "Actionable Insights",
                                    description:
                                        "Our research isn't just interesting—it's designed to be applied to your own products and projects.",
                                },
                                {
                                    icon: "🆓",
                                    title: "Free & Open",
                                    description:
                                        "Quality UX education shouldn't be gatekept. All our case studies are free to read, forever.",
                                },
                            ].map((value) => (
                                <div
                                    key={value.title}
                                    className="p-6 rounded-2xl bg-surface-secondary border border-border"
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="text-2xl">{value.icon}</span>
                                        <div>
                                            <h3 className="font-heading font-semibold text-text-primary mb-2">
                                                {value.title}
                                            </h3>
                                            <p className="text-text-secondary text-sm">
                                                {value.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Who It's For */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-heading font-bold text-3xl text-text-primary mb-4">
                            Built For
                        </h2>
                        <p className="text-text-secondary text-lg">
                            Whether you&apos;re learning or leading, there&apos;s something here for you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Designers & Researchers",
                                description:
                                    "Level up your craft with real-world examples of effective (and problematic) design patterns.",
                                features: [
                                    "Pattern libraries",
                                    "Psychological frameworks",
                                    "Competitor analysis techniques",
                                ],
                            },
                            {
                                title: "Product Managers",
                                description:
                                    "Understand the UX decisions that drive metrics—and the tradeoffs involved.",
                                features: [
                                    "Retention mechanics",
                                    "Monetization strategies",
                                    "Feature prioritization insights",
                                ],
                            },
                            {
                                title: "Students & Career Changers",
                                description:
                                    "Build portfolio-ready knowledge by learning from products millions of people use.",
                                features: [
                                    "Free education",
                                    "Industry-relevant examples",
                                    "Discussion fodder for interviews",
                                ],
                            },
                        ].map((persona) => (
                            <div
                                key={persona.title}
                                className="p-8 rounded-2xl bg-surface border border-border"
                            >
                                <h3 className="font-heading font-bold text-xl text-text-primary mb-4">
                                    {persona.title}
                                </h3>
                                <p className="text-text-secondary mb-6">{persona.description}</p>
                                <ul className="space-y-2">
                                    {persona.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-center gap-2 text-text-secondary text-sm"
                                        >
                                            <svg
                                                className="w-4 h-4 text-accent flex-shrink-0"
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
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-heading font-bold text-3xl text-text-primary mb-6">
                        Ready to dive in?
                    </h2>
                    <p className="text-text-secondary text-lg mb-8">
                        Start exploring our collection of UX case studies.
                    </p>
                    <Link
                        href="/case-studies"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-accent text-background font-semibold hover:opacity-90 transition-opacity"
                    >
                        <span>Browse Case Studies</span>
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
            </section>

            {/* Newsletter */}
            <NewsletterCTA />
        </div>
    );
}
