"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useCaseStudies } from "@/context/CaseStudyContext";
import CaseStudyForm from "@/components/admin/CaseStudyForm";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function EditCaseStudyPage({ params }: PageProps) {
    const { id } = use(params);
    const { getCaseStudyById, isLoading } = useCaseStudies();

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="h-10 w-48 bg-surface-secondary rounded-lg" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="h-12 bg-surface-secondary rounded-xl" />
                        <div className="h-24 bg-surface-secondary rounded-xl" />
                        <div className="h-96 bg-surface-secondary rounded-xl" />
                    </div>
                    <div className="space-y-6">
                        <div className="h-32 bg-surface-secondary rounded-2xl" />
                        <div className="h-32 bg-surface-secondary rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    const caseStudy = getCaseStudyById(id);

    if (!caseStudy) {
        notFound();
    }

    return <CaseStudyForm initialData={caseStudy} mode="edit" />;
}
