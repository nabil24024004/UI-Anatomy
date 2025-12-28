import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import CaseStudyGrid from "@/components/CaseStudyGrid";
import TagFilter from "@/components/TagFilter";
import { CaseStudy } from "@/context/CaseStudyContext";

interface PageProps {
    params: Promise<{ tag: string }>;
}

async function getCaseStudiesByTag(tag: string) {
    const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .contains("tags", [tag])
        .order("published_at", { ascending: false });

    if (error) {
        console.error("Error fetching case studies by tag:", error);
        return [];
    }

    return (data || []) as CaseStudy[];
}

async function getTags() {
    const { data } = await supabase.from("case_studies").select("tags");
    const tagSet = new Set<string>();
    (data || []).forEach((row) => {
        (row.tags || []).forEach((tag: string) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps) {
    const { tag } = await params;
    const formattedTag = tag.charAt(0).toUpperCase() + tag.slice(1);

    return {
        title: `${formattedTag} Case Studies | UI Anatomy`,
        description: `Explore UX case studies focused on ${formattedTag.toLowerCase()} patterns in real products.`,
    };
}

export default async function TagPage({ params }: PageProps) {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);

    // Try to find matching tag (case-insensitive)
    const allTags = await getTags();
    const matchedTag = allTags.find(
        (t) => t.toLowerCase() === decodedTag.toLowerCase()
    );

    if (!matchedTag) {
        notFound();
    }

    const caseStudies = await getCaseStudiesByTag(matchedTag);

    const formattedTag = matchedTag.charAt(0).toUpperCase() + matchedTag.slice(1);

    return (
        <div className="pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
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
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                        </svg>
                        {formattedTag}
                    </span>
                    <h1 className="font-heading font-bold text-4xl md:text-5xl text-text-primary mb-4">
                        {formattedTag} Patterns
                    </h1>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        {caseStudies.length} case stud{caseStudies.length === 1 ? "y" : "ies"}{" "}
                        exploring {formattedTag.toLowerCase()} patterns in real products.
                    </p>
                </div>

                {/* Tag Filters */}
                <div className="flex justify-center mb-12">
                    <TagFilter tags={allTags} activeTag={matchedTag} />
                </div>

                {/* Grid */}
                <CaseStudyGrid caseStudies={caseStudies} />
            </div>
        </div>
    );
}
