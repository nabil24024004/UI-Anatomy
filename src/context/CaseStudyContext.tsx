"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

export interface CaseStudy {
    id: string;
    title: string;
    slug: string;
    company: string;
    summary: string;
    content: string;
    tags: string[];
    cover_image: string;
    is_published: boolean;
    published_at: string;
    updated_at?: string;
}

interface CaseStudyContextType {
    caseStudies: CaseStudy[];
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    addCaseStudy: (caseStudy: Omit<CaseStudy, "id">) => Promise<CaseStudy | null>;
    updateCaseStudy: (id: string, data: Partial<CaseStudy>) => Promise<void>;
    deleteCaseStudy: (id: string) => Promise<void>;
    togglePublished: (id: string) => Promise<void>;
    getCaseStudyById: (id: string) => CaseStudy | undefined;
    getAllTags: () => string[];
}

const CaseStudyContext = createContext<CaseStudyContextType | null>(null);

export function CaseStudyProvider({ children }: { children: React.ReactNode }) {
    const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCaseStudies = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const { data, error: fetchError } = await supabase
                .from("case_studies")
                .select("*")
                .order("published_at", { ascending: false });

            if (fetchError) throw fetchError;

            setCaseStudies((data || []) as CaseStudy[]);
        } catch (err) {
            console.error("Error fetching case studies:", err);
            setError("Failed to load case studies.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCaseStudies();
    }, [fetchCaseStudies]);

    const addCaseStudy = useCallback(async (data: Omit<CaseStudy, "id">) => {
        try {
            const { data: newData, error: insertError } = await supabase
                .from("case_studies")
                .insert({
                    title: data.title,
                    slug: data.slug,
                    company: data.company,
                    summary: data.summary,
                    content: data.content,
                    tags: data.tags,
                    cover_image: data.cover_image,
                    is_published: data.is_published ?? true,
                    published_at: data.published_at || new Date().toISOString(),
                })
                .select()
                .single();

            if (insertError) throw insertError;

            setCaseStudies((prev) => [newData as CaseStudy, ...prev]);
            return newData as CaseStudy;
        } catch (err) {
            console.error("Error adding case study:", err);
            setError("Failed to create case study.");
            return null;
        }
    }, []);

    const updateCaseStudy = useCallback(async (id: string, data: Partial<CaseStudy>) => {
        try {
            const { error: updateError } = await supabase
                .from("case_studies")
                .update({ ...data, updated_at: new Date().toISOString() })
                .eq("id", id);

            if (updateError) throw updateError;

            setCaseStudies((prev) =>
                prev.map((cs) => (cs.id === id ? { ...cs, ...data } : cs))
            );
        } catch (err) {
            console.error("Error updating case study:", err);
            setError("Failed to update case study.");
        }
    }, []);

    const deleteCaseStudy = useCallback(async (id: string) => {
        try {
            const { error: deleteError } = await supabase
                .from("case_studies")
                .delete()
                .eq("id", id);

            if (deleteError) throw deleteError;

            setCaseStudies((prev) => prev.filter((cs) => cs.id !== id));
        } catch (err) {
            console.error("Error deleting case study:", err);
            setError("Failed to delete case study.");
        }
    }, []);

    const togglePublished = useCallback(async (id: string) => {
        const caseStudy = caseStudies.find((cs) => cs.id === id);
        if (!caseStudy) return;

        const newStatus = !caseStudy.is_published;

        try {
            const { error: updateError } = await supabase
                .from("case_studies")
                .update({ is_published: newStatus, updated_at: new Date().toISOString() })
                .eq("id", id);

            if (updateError) throw updateError;

            setCaseStudies((prev) =>
                prev.map((cs) => (cs.id === id ? { ...cs, is_published: newStatus } : cs))
            );
        } catch (err) {
            console.error("Error toggling published status:", err);
            setError("Failed to update status.");
        }
    }, [caseStudies]);

    const getCaseStudyById = useCallback(
        (id: string) => caseStudies.find((cs) => cs.id === id),
        [caseStudies]
    );

    const getAllTags = useCallback(() => {
        const tagSet = new Set<string>();
        caseStudies.forEach((cs) => cs.tags.forEach((tag) => tagSet.add(tag)));
        return Array.from(tagSet).sort();
    }, [caseStudies]);

    return (
        <CaseStudyContext.Provider
            value={{
                caseStudies,
                isLoading,
                error,
                refetch: fetchCaseStudies,
                addCaseStudy,
                updateCaseStudy,
                deleteCaseStudy,
                togglePublished,
                getCaseStudyById,
                getAllTags,
            }}
        >
            {children}
        </CaseStudyContext.Provider>
    );
}

export function useCaseStudies() {
    const context = useContext(CaseStudyContext);
    if (!context) {
        throw new Error("useCaseStudies must be used within CaseStudyProvider");
    }
    return context;
}
