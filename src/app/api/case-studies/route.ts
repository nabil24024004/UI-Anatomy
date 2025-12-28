import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const tag = searchParams.get("tag");

    try {
        let query = supabase
            .from("case_studies")
            .select("*")
            .order("published_at", { ascending: false });

        // Filter by tag
        if (tag) {
            query = query.contains("tags", [tag]);
        }

        const { data, error } = await query;

        if (error) {
            throw error;
        }

        let results = data || [];

        // Filter by search (client-side for flexibility)
        if (search) {
            const lowerSearch = search.toLowerCase();
            results = results.filter(
                (cs) =>
                    cs.title.toLowerCase().includes(lowerSearch) ||
                    cs.company.toLowerCase().includes(lowerSearch) ||
                    cs.summary.toLowerCase().includes(lowerSearch)
            );
        }

        return NextResponse.json({
            data: results,
            count: results.length,
        });
    } catch (error) {
        console.error("Error fetching case studies:", error);
        return NextResponse.json(
            { error: "Failed to fetch case studies" },
            { status: 500 }
        );
    }
}
