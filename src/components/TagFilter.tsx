"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface TagFilterProps {
    tags: string[];
    activeTag?: string;
}

export default function TagFilter({ tags, activeTag }: TagFilterProps) {
    const pathname = usePathname();
    const isAllActive = pathname === "/case-studies" && !activeTag;

    return (
        <div className="flex flex-wrap gap-2">
            {/* All Tag */}
            <Link
                href="/case-studies"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isAllActive
                        ? "gradient-accent text-background"
                        : "bg-surface border border-border text-text-secondary hover:border-accent hover:text-accent"
                    }`}
            >
                All
            </Link>

            {/* Tag Pills */}
            {tags.map((tag) => {
                const isActive = activeTag?.toLowerCase() === tag.toLowerCase();
                return (
                    <Link
                        key={tag}
                        href={`/tags/${tag.toLowerCase()}`}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive
                                ? "gradient-accent text-background"
                                : "bg-surface border border-border text-text-secondary hover:border-accent hover:text-accent"
                            }`}
                    >
                        {tag}
                    </Link>
                );
            })}
        </div>
    );
}
