import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import CaseStudyCard from "@/components/CaseStudyCard";
import NewsletterCTA from "@/components/NewsletterCTA";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CaseStudy } from "@/context/CaseStudyContext";

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getCaseStudyBySlug(slug: string) {
    const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !data) return null;
    return data as CaseStudy;
}

async function getRecentCaseStudies(excludeSlug: string, limit: number = 3) {
    const { data } = await supabase
        .from("case_studies")
        .select("*")
        .neq("slug", excludeSlug)
        .order("published_at", { ascending: false })
        .limit(limit);

    return (data || []) as CaseStudy[];
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const caseStudy = await getCaseStudyBySlug(slug);

    if (!caseStudy) {
        return { title: "Not Found | UI Anatomy" };
    }

    return {
        title: `${caseStudy.title} | UI Anatomy`,
        description: caseStudy.summary,
        openGraph: {
            title: caseStudy.title,
            description: caseStudy.summary,
            images: [caseStudy.cover_image],
        },
    };
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params;
    const caseStudy = await getCaseStudyBySlug(slug);

    if (!caseStudy) {
        notFound();
    }

    const relatedCaseStudies = await getRecentCaseStudies(slug, 3);

    return (
        <article className="pt-24">
            {/* Hero */}
            <header className="relative">
                <div className="absolute inset-0 h-[50vh]">
                    <Image
                        src={caseStudy.cover_image}
                        alt={caseStudy.title}
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
                        <Link href="/" className="hover:text-text-secondary transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link
                            href="/case-studies"
                            className="hover:text-text-secondary transition-colors"
                        >
                            Case Studies
                        </Link>
                        <span>/</span>
                        <span className="text-text-secondary">{caseStudy.company}</span>
                    </nav>

                    {/* Company */}
                    <p className="text-accent font-medium uppercase tracking-widest text-sm mb-4">
                        {caseStudy.company}
                    </p>

                    {/* Title */}
                    <h1 className="font-heading font-bold text-4xl md:text-5xl text-text-primary leading-tight mb-6">
                        {caseStudy.title}
                    </h1>

                    {/* Summary */}
                    <p className="text-text-secondary text-xl leading-relaxed mb-8">
                        {caseStudy.summary}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-6 text-sm">
                        {/* Date */}
                        <div className="flex items-center gap-2 text-text-muted">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <time dateTime={caseStudy.published_at}>
                                {new Date(caseStudy.published_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        </div>

                        {/* Reading Time */}
                        <div className="flex items-center gap-2 text-text-muted">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>
                                {Math.ceil(caseStudy.content.split(" ").length / 200)} min read
                            </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {caseStudy.tags.map((tag) => (
                                <Link
                                    key={tag}
                                    href={`/tags/${tag.toLowerCase()}`}
                                    className="px-3 py-1 rounded-full bg-surface-secondary border border-border text-text-secondary text-xs hover:border-accent hover:text-accent transition-colors"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="prose-dark prose prose-lg max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {caseStudy.content}
                    </ReactMarkdown>
                </div>

                {/* Share */}
                <div className="border-t border-border mt-16 pt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-text-secondary">Found this useful? Share it!</p>
                        <div className="flex gap-4">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                                    caseStudy.title
                                )}&url=${encodeURIComponent(
                                    `https://ui-anatomy.com/case-studies/${caseStudy.slug}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl bg-surface border border-border hover:border-accent transition-colors"
                                aria-label="Share on Twitter"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                    `https://ui-anatomy.com/case-studies/${caseStudy.slug}`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl bg-surface border border-border hover:border-accent transition-colors"
                                aria-label="Share on LinkedIn"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter */}
            <NewsletterCTA />

            {/* Related */}
            {relatedCaseStudies.length > 0 && (
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-heading font-bold text-2xl text-text-primary mb-8">
                            Related Case Studies
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedCaseStudies.map((cs) => (
                                <CaseStudyCard key={cs.id} caseStudy={cs} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </article>
    );
}
