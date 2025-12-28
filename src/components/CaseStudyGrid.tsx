import CaseStudyCard from "./CaseStudyCard";
import { CaseStudy } from "@/context/CaseStudyContext";

interface CaseStudyGridProps {
    caseStudies: CaseStudy[];
    columns?: 2 | 3;
}

export default function CaseStudyGrid({
    caseStudies,
    columns = 3,
}: CaseStudyGridProps) {
    if (caseStudies.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-secondary flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-text-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h3 className="text-text-primary font-heading font-semibold text-lg mb-2">
                    No case studies found
                </h3>
                <p className="text-text-secondary text-sm">
                    Try adjusting your filters or search terms.
                </p>
            </div>
        );
    }

    return (
        <div
            className={`grid gap-6 ${columns === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
        >
            {caseStudies.map((caseStudy, index) => (
                <div
                    key={caseStudy.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <CaseStudyCard caseStudy={caseStudy} />
                </div>
            ))}
        </div>
    );
}
