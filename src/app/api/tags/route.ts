import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("case_studies")
            .select("tags");

        if (error) throw error;

        // Extract unique tags
        const tagSet = new Set<string>();
        (data || []).forEach((row) => {
            (row.tags || []).forEach((tag: string) => tagSet.add(tag));
        });

        const tags = Array.from(tagSet).sort();

        return NextResponse.json({
            data: tags,
            count: tags.length,
        });
    } catch (error) {
        console.error("Error fetching tags:", error);
        return NextResponse.json(
            { error: "Failed to fetch tags" },
            { status: 500 }
        );
    }
}
