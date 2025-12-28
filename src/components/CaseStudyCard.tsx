import Link from "next/link";
import Image from "next/image";
import { CaseStudy } from "@/context/CaseStudyContext";

interface CaseStudyCardProps {
    caseStudy: CaseStudy;
    featured?: boolean;
}

export default function CaseStudyCard({
    caseStudy,
    featured = false,
}: CaseStudyCardProps) {
    return (
        <Link href={`/case-studies/${caseStudy.slug}`} className="group block">
            <article
                className={`rounded-2xl overflow-hidden bg-surface border border-border card-hover ${featured ? "md:flex" : ""
                    }`}
            >
                {/* Cover Image */}
                <div
                    className={`relative overflow-hidden ${featured ? "md:w-1/2" : "aspect-[16/10]"
                        }`}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
                    <Image
                        src={caseStudy.cover_image}
                        alt={caseStudy.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Company Badge */}
                    <div className="absolute top-4 left-4 z-20">
                        <span className="px-3 py-1 rounded-full bg-surface/80 backdrop-blur-sm text-text-primary text-xs font-medium border border-border">
                            {caseStudy.company}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className={`p-6 ${featured ? "md:w-1/2 md:flex md:flex-col md:justify-center" : ""}`}>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {caseStudy.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="text-xs text-accent font-medium uppercase tracking-wide"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h3
                        className={`font-heading font-bold text-text-primary group-hover:text-accent transition-colors ${featured ? "text-2xl md:text-3xl mb-4" : "text-lg mb-2"
                            }`}
                    >
                        {caseStudy.title}
                    </h3>

                    {/* Summary */}
                    <p
                        className={`text-text-secondary leading-relaxed ${featured ? "text-base mb-6" : "text-sm line-clamp-2"
                            }`}
                    >
                        {caseStudy.summary}
                    </p>

                    {/* Read More */}
                    {featured && (
                        <div className="flex items-center gap-2 text-accent font-medium text-sm">
                            <span>Read case study</span>
                            <svg
                                className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                        </div>
                    )}

                    {/* Date */}
                    <p className={`text-text-muted text-xs ${featured ? "" : "mt-4"}`}>
                        {new Date(caseStudy.published_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </p>
                </div>
            </article>
        </Link>
    );
}
