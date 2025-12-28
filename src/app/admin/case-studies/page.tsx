"use client";

import Link from "next/link";
import { useState } from "react";
import { useCaseStudies } from "@/context/CaseStudyContext";

export default function CaseStudiesListPage() {
    const { caseStudies, deleteCaseStudy, togglePublished, isLoading } = useCaseStudies();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredStudies = caseStudies.filter(
        (cs) =>
            cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cs.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        await deleteCaseStudy(id);
        setDeleteId(null);
    };

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="h-10 w-48 bg-surface-secondary rounded-lg" />
                <div className="h-12 bg-surface-secondary rounded-xl" />
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 bg-surface-secondary rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-bold text-3xl text-text-primary">
                        Case Studies
                    </h1>
                    <p className="text-text-secondary mt-1">
                        {caseStudies.length} case stud{caseStudies.length !== 1 ? "ies" : "y"}
                    </p>
                </div>
                <Link
                    href="/admin/case-studies/new"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-accent text-background font-medium hover:opacity-90 transition-opacity"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Case Study
                </Link>
            </div>

            {/* Search */}
            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search case studies..."
                    className="w-full px-4 py-3 pl-12 rounded-xl bg-surface border border-border text-text-primary placeholder-text-muted focus:border-accent focus:outline-none transition-colors"
                />
                <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {/* Case Studies Table */}
            <div className="rounded-2xl bg-surface border border-border overflow-hidden">
                <table className="w-full">
                    <thead className="bg-surface-secondary">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Title</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Company</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-text-secondary">Date</th>
                            <th className="px-6 py-4 text-right text-sm font-medium text-text-secondary">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredStudies.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center">
                                    <div className="text-text-muted">
                                        {searchQuery ? "No matching case studies found." : "No case studies yet."}
                                    </div>
                                    {!searchQuery && (
                                        <Link
                                            href="/admin/case-studies/new"
                                            className="inline-flex items-center gap-2 mt-4 text-accent hover:underline"
                                        >
                                            Create your first case study
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ) : (
                            filteredStudies.map((cs) => (
                                <tr key={cs.id} className="hover:bg-surface-hover transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-surface-secondary flex items-center justify-center text-text-muted font-bold">
                                                {cs.company.charAt(0)}
                                            </div>
                                            <span className="font-medium text-text-primary line-clamp-1 max-w-xs">
                                                {cs.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-text-secondary">{cs.company}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => togglePublished(cs.id)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors ${cs.is_published
                                                    ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                                                    : "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                                                }`}
                                        >
                                            {cs.is_published ? (
                                                <>
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Published
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                                    </svg>
                                                    Hidden
                                                </>
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-text-secondary text-sm">
                                        {new Date(cs.published_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/case-studies/${cs.slug}`}
                                                target="_blank"
                                                className="p-2 rounded-lg hover:bg-surface-secondary text-text-muted hover:text-text-primary transition-colors"
                                                title="View"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </Link>
                                            <Link
                                                href={`/admin/case-studies/${cs.id}/edit`}
                                                className="p-2 rounded-lg hover:bg-surface-secondary text-text-muted hover:text-accent transition-colors"
                                                title="Edit"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            <button
                                                onClick={() => setDeleteId(cs.id)}
                                                className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Delete Modal */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                    <div className="bg-surface border border-border rounded-2xl p-6 max-w-md w-full mx-4 animate-fade-in-up">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-heading font-semibold text-lg text-text-primary">Delete Case Study</h3>
                                <p className="text-text-secondary text-sm">This action cannot be undone.</p>
                            </div>
                        </div>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-4 py-2 rounded-lg border border-border text-text-secondary hover:bg-surface-hover transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteId)}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
