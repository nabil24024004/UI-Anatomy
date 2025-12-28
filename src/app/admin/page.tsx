"use client";

import Link from "next/link";
import { useCaseStudies } from "@/context/CaseStudyContext";

export default function AdminDashboard() {
    const { caseStudies, getAllTags, isLoading, error } = useCaseStudies();

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="h-10 w-48 bg-surface-secondary rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 bg-surface-secondary rounded-xl" />
                    ))}
                </div>
                <p className="text-text-muted text-sm">Loading dashboard data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                <h2 className="text-xl font-bold text-red-400 mb-2">Error Loading Dashboard</h2>
                <p className="text-text-secondary">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 rounded-lg bg-surface border border-border hover:bg-surface-hover transition-colors text-sm"
                >
                    Retry
                </button>
            </div>
        );
    }

    // Ensure we render even if empty
    const tags = getAllTags() || [];
    const recentStudies = (caseStudies || []).slice(0, 5);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading font-bold text-3xl text-text-primary">
                        Dashboard
                    </h1>
                    <p className="text-text-secondary mt-1">
                        Manage your UX case studies
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

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-surface border border-border">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-text-muted text-sm">Total Case Studies</p>
                            <p className="font-heading font-bold text-2xl text-text-primary">
                                {caseStudies.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-surface border border-border">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent-orange/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-text-muted text-sm">Total Tags</p>
                            <p className="font-heading font-bold text-2xl text-text-primary">
                                {tags.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-surface border border-border">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-text-muted text-sm">Published</p>
                            <p className="font-heading font-bold text-2xl text-text-primary">
                                {caseStudies.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Case Studies */}
            <div className="rounded-2xl bg-surface border border-border overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h2 className="font-heading font-semibold text-lg text-text-primary">
                        Recent Case Studies
                    </h2>
                    <Link
                        href="/admin/case-studies"
                        className="text-sm text-accent hover:underline"
                    >
                        View all →
                    </Link>
                </div>
                <div className="divide-y divide-border">
                    {recentStudies.map((cs) => (
                        <div
                            key={cs.id}
                            className="p-4 flex items-center justify-between hover:bg-surface-hover transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-lg bg-surface-secondary flex items-center justify-center text-text-muted font-bold">
                                    {cs.company.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-medium text-text-primary line-clamp-1">
                                        {cs.title}
                                    </h3>
                                    <p className="text-sm text-text-muted">{cs.company}</p>
                                </div>
                            </div>
                            <Link
                                href={`/admin/case-studies/${cs.id}/edit`}
                                className="px-3 py-1.5 rounded-lg text-sm text-text-secondary border border-border hover:border-accent hover:text-accent transition-colors"
                            >
                                Edit
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                    href="/admin/case-studies/new"
                    className="p-6 rounded-2xl bg-surface border border-border hover:border-accent transition-colors group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-heading font-semibold text-text-primary group-hover:text-accent transition-colors">
                                Create New Case Study
                            </h3>
                            <p className="text-sm text-text-muted">
                                Write and publish a new UX analysis
                            </p>
                        </div>
                    </div>
                </Link>

                <Link
                    href="/"
                    target="_blank"
                    className="p-6 rounded-2xl bg-surface border border-border hover:border-accent transition-colors group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-heading font-semibold text-text-primary group-hover:text-accent transition-colors">
                                View Live Site
                            </h3>
                            <p className="text-sm text-text-muted">
                                See how your content looks to visitors
                            </p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
