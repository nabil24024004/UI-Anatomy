import Link from "next/link";
import Image from "next/image";
import { CaseStudy } from "@/context/CaseStudyContext";

interface HeroFeaturedCaseProps {
    caseStudy: CaseStudy;
}

export default function HeroFeaturedCase({ caseStudy }: HeroFeaturedCaseProps) {
    return (
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src={caseStudy.cover_image}
                    alt={caseStudy.title}
                    fill
                    className="object-cover opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-background/50" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float" />
            <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-accent-orange/10 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="max-w-3xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 backdrop-blur-sm border border-border mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-text-secondary text-sm font-medium">
                            Featured Research
                        </span>
                    </div>

                    {/* Company */}
                    <p
                        className="text-accent font-medium uppercase tracking-widest text-sm mb-4 animate-fade-in-up"
                        style={{ animationDelay: "100ms" }}
                    >
                        {caseStudy.company}
                    </p>

                    {/* Title */}
                    <h1
                        className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-text-primary leading-tight mb-6 animate-fade-in-up"
                        style={{ animationDelay: "200ms" }}
                    >
                        {caseStudy.title}
                    </h1>

                    {/* Summary */}
                    <p
                        className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8 animate-fade-in-up"
                        style={{ animationDelay: "300ms" }}
                    >
                        {caseStudy.summary}
                    </p>

                    {/* Tags */}
                    <div
                        className="flex flex-wrap gap-2 mb-8 animate-fade-in-up"
                        style={{ animationDelay: "400ms" }}
                    >
                        {caseStudy.tags.map((tag) => (
                            <Link
                                key={tag}
                                href={`/tags/${tag.toLowerCase()}`}
                                className="px-3 py-1 rounded-full bg-surface-secondary border border-border text-text-secondary text-sm hover:border-accent hover:text-accent transition-colors"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>

                    {/* CTA */}
                    <div
                        className="flex flex-wrap gap-4 animate-fade-in-up"
                        style={{ animationDelay: "500ms" }}
                    >
                        <Link
                            href={`/case-studies/${caseStudy.slug}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-background font-semibold hover:opacity-90 transition-opacity animate-glow"
                        >
                            <span>Read Case Study</span>
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
                        <Link
                            href="/case-studies"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface border border-border text-text-primary font-semibold hover:border-accent transition-colors"
                        >
                            <span>Browse All</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg
                    className="w-6 h-6 text-text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </div>
        </section>
    );
}
