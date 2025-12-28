import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import CaseStudyGrid from "@/components/CaseStudyGrid";
import TagFilter from "@/components/TagFilter";
import SearchBar from "@/components/SearchBar";
import { CaseStudy } from "@/context/CaseStudyContext";

interface PageProps {
    searchParams: Promise<{ search?: string }>;
}

async function getCaseStudies(search?: string) {
    let query = supabase
        .from("case_studies")
        .select("*")
        .order("published_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching case studies:", error);
        return [];
    }

    let results = (data || []) as CaseStudy[];

    if (search) {
        const lowerSearch = search.toLowerCase();
        results = results.filter(
            (cs) =>
                cs.title.toLowerCase().includes(lowerSearch) ||
                cs.company.toLowerCase().includes(lowerSearch) ||
                cs.summary.toLowerCase().includes(lowerSearch)
        );
    }

    return results;
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

export default async function CaseStudiesPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const searchQuery = params.search || "";

    const [caseStudies, tags] = await Promise.all([
        getCaseStudies(searchQuery),
        getTags(),
    ]);

    return (
        <div className="pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl text-text-primary mb-4">
                        Case Studies
                    </h1>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        In-depth UX research on real products. Learn how the world&apos;s best
                        companies design for engagement, retention, and growth.
                    </p>
                </div>

                {/* Search */}
                <div className="max-w-2xl mx-auto mb-8">
                    <Suspense fallback={<div className="h-12 bg-surface rounded-xl animate-pulse" />}>
                        <SearchBar initialValue={searchQuery} />
                    </Suspense>
                </div>

                {/* Tag Filters */}
                <div className="flex justify-center mb-12">
                    <TagFilter tags={tags} />
                </div>

                {/* Results Info */}
                {searchQuery && (
                    <p className="text-text-secondary text-center mb-8">
                        Found {caseStudies.length} result
                        {caseStudies.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
                    </p>
                )}

                {/* Grid */}
                <CaseStudyGrid caseStudies={caseStudies} />
            </div>
        </div>
    );
}
