import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface Params {
    params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: Params) {
    const { slug } = await params;

    try {
        const { data, error } = await supabase
            .from("case_studies")
            .select("*")
            .eq("slug", slug)
            .single();

        if (error) {
            if (error.code === "PGRST116") {
                return NextResponse.json(
                    { error: "Case study not found" },
                    { status: 404 }
                );
            }
            throw error;
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error("Error fetching case study:", error);
        return NextResponse.json(
            { error: "Failed to fetch case study" },
            { status: 500 }
        );
    }
}
