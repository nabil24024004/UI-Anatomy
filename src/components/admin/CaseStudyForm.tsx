"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCaseStudies, CaseStudy } from "@/context/CaseStudyContext";

interface CaseStudyFormProps {
    initialData?: CaseStudy;
    mode: "create" | "edit";
}

export default function CaseStudyForm({ initialData, mode }: CaseStudyFormProps) {
    const router = useRouter();
    const { addCaseStudy, updateCaseStudy } = useCaseStudies();
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        company: initialData?.company || "",
        summary: initialData?.summary || "",
        content: initialData?.content || "",
        tags: initialData?.tags.join(", ") || "",
        cover_image: initialData?.cover_image || "",
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

    const handleTitleChange = (title: string) => {
        setFormData({
            ...formData,
            title,
            slug: mode === "create" ? generateSlug(title) : formData.slug,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError("");

        const tags = formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        const caseStudyData = {
            title: formData.title,
            slug: formData.slug || generateSlug(formData.title),
            company: formData.company,
            summary: formData.summary,
            content: formData.content,
            tags,
            cover_image: formData.cover_image,
            is_published: initialData?.is_published ?? true,
            published_at: initialData?.published_at || new Date().toISOString(),
        };

        try {
            if (mode === "edit" && initialData) {
                await updateCaseStudy(initialData.id, caseStudyData);
                router.push("/admin/case-studies");
            } else {
                const result = await addCaseStudy(caseStudyData);
                if (result) {
                    router.push("/admin/case-studies");
                } else {
                    setError("Failed to create case study. Check browser console for details.");
                    setIsSaving(false);
                }
            }
        } catch (err) {
            console.error("Error saving case study:", err);
            setError("An error occurred while saving. Please try again.");
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/case-studies"
                        className="p-2 rounded-lg hover:bg-surface-hover text-text-muted hover:text-text-primary transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="font-heading font-bold text-2xl text-text-primary">
                            {mode === "create" ? "New Case Study" : "Edit Case Study"}
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/case-studies"
                        className="px-4 py-2 rounded-lg border border-border text-text-secondary hover:bg-surface-hover transition-colors"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSaving || !formData.title}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl gradient-accent text-background font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <>
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {mode === "create" ? "Publish" : "Save Changes"}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                            placeholder="How Product X Achieves Y..."
                            required
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder-text-muted focus:border-accent focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Summary */}
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Summary *
                        </label>
                        <textarea
                            value={formData.summary}
                            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                            placeholder="A brief description that appears in cards and previews..."
                            required
                            rows={3}
                            className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder-text-muted focus:border-accent focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Content Editor with Tabs */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-text-secondary">
                                Content (Markdown) *
                            </label>
                            <div className="flex rounded-lg bg-surface-secondary p-1">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("edit")}
                                    className={`px-3 py-1 rounded-md text-sm transition-colors ${activeTab === "edit"
                                        ? "bg-surface text-text-primary"
                                        : "text-text-muted hover:text-text-secondary"
                                        }`}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("preview")}
                                    className={`px-3 py-1 rounded-md text-sm transition-colors ${activeTab === "preview"
                                        ? "bg-surface text-text-primary"
                                        : "text-text-muted hover:text-text-secondary"
                                        }`}
                                >
                                    Preview
                                </button>
                            </div>
                        </div>

                        {activeTab === "edit" ? (
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="# Title

Write your case study content here using Markdown...

## Section 1

Your analysis...

## Key Takeaways

- Point 1
- Point 2"
                                required
                                rows={20}
                                className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder-text-muted focus:border-accent focus:outline-none transition-colors font-mono text-sm resize-none"
                            />
                        ) : (
                            <div className="p-6 rounded-xl bg-surface border border-border min-h-[400px] prose-dark">
                                {formData.content ? (
                                    <div className="whitespace-pre-wrap">{formData.content}</div>
                                ) : (
                                    <p className="text-text-muted italic">No content to preview</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Company */}
                    <div className="p-6 rounded-2xl bg-surface border border-border">
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Company *
                        </label>
                        <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="e.g. Duolingo"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border text-text-primary placeholder-text-muted focus:border-accent focus:outline-none transition-colors"
                        />
                    </div>

                    {/* Slug */}
                    <div className="p-6 rounded-2xl bg-surface border border-border">
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            URL Slug
                        </label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="auto-generated-from-title"
                            className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border text-text-primary placeholder-text-muted focus:border-accent focus:outline-none transition-colors font-mono text-sm"
                        />
                        <p className="text-xs text-text-muted mt-2">
                            /case-studies/{formData.slug || "..."}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="p-6 rounded-2xl bg-surface border border-border">
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Tags
                        </label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            placeholder="Retention, Gamification, Mobile"
                            className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border text-text-primary placeholder-text-muted focus:border-accent focus:outline-none transition-colors"
                        />
                        <p className="text-xs text-text-muted mt-2">
                            Comma-separated list of tags
                        </p>
                    </div>

                    {/* Cover Image */}
                    <div className="p-6 rounded-2xl bg-surface border border-border">
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Cover Image URL
                        </label>
                        <input
                            type="url"
                            value={formData.cover_image}
                            onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-4 py-3 rounded-xl bg-surface-secondary border border-border text-text-primary placeholder-text-muted focus:border-accent focus:outline-none transition-colors"
                        />
                        {formData.cover_image && (
                            <div className="mt-4 rounded-lg overflow-hidden">
                                <img
                                    src={formData.cover_image}
                                    alt="Cover preview"
                                    className="w-full h-32 object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
