import Link from "next/link";
import { supabase } from "@/lib/supabase";
import HeroFeaturedCase from "@/components/HeroFeaturedCase";
import CaseStudyGrid from "@/components/CaseStudyGrid";
import NewsletterCTA from "@/components/NewsletterCTA";
import { CaseStudy } from "@/context/CaseStudyContext";

async function getCaseStudies() {
  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching case studies:", error);
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

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const caseStudies = await getCaseStudies();
  const tags = await getTags();

  const featuredCaseStudy = caseStudies[0];
  const recentCaseStudies = caseStudies.slice(1, 7);

  if (!featuredCaseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">No case studies yet</h1>
          <p className="text-text-secondary mb-8">Add some case studies from the admin panel.</p>
          <Link href="/admin" className="px-6 py-3 rounded-xl gradient-accent text-background font-medium">
            Go to Admin
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <HeroFeaturedCase caseStudy={featuredCaseStudy} />

      {/* Recent Case Studies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="font-heading font-bold text-3xl text-text-primary mb-2">
                Latest Research
              </h2>
              <p className="text-text-secondary">
                Deep-dive UX analysis of products you use every day.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-accent font-medium hover:underline"
            >
              <span>View all case studies</span>
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Grid */}
          {recentCaseStudies.length > 0 && (
            <CaseStudyGrid caseStudies={recentCaseStudies} />
          )}
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-text-primary mb-2">
              Explore by Topic
            </h2>
            <p className="text-text-secondary">
              Find insights on the patterns that matter to you.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag.toLowerCase()}`}
                className="px-6 py-3 rounded-xl bg-surface-secondary border border-border text-text-secondary font-medium hover:border-accent hover:text-accent transition-all hover:scale-105"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why UI Anatomy */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-medium uppercase tracking-widest text-sm">
                Why UI Anatomy
              </span>
              <h2 className="font-heading font-bold text-4xl text-text-primary mt-4 mb-6">
                Learn UX from the products that shape behavior
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-8">
                Every great product has hidden design decisions that influence
                millions of users. We dissect these patterns so you can apply
                them—or avoid them—in your own work.
              </p>
              <ul className="space-y-4">
                {[
                  "In-depth analysis of real products",
                  "Actionable insights for designers & PMs",
                  "Ethical considerations included",
                  "New case studies regularly",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-text-secondary">
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: `${caseStudies.length}+`, label: "Case Studies" },
                { number: `${tags.length}`, label: "Topics Covered" },
                { number: "2K+", label: "Subscribers" },
                { number: "100%", label: "Free to Read" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-surface border border-border text-center"
                >
                  <div className="font-heading font-bold text-4xl gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-text-secondary text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterCTA />
    </>
  );
}
