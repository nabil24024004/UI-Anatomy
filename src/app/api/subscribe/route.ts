import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        // Validate email
        if (!email || typeof email !== "string") {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Insert into Supabase
        const { error } = await supabase
            .from("subscribers")
            .insert({ email: email.toLowerCase() });

        if (error) {
            if (error.code === "23505") {
                // Unique violation
                return NextResponse.json(
                    { error: "Email already subscribed" },
                    { status: 409 }
                );
            }
            throw error;
        }

        return NextResponse.json({
            success: true,
            message: "Successfully subscribed!",
        });
    } catch (error) {
        console.error("Error subscribing:", error);
        return NextResponse.json(
            { error: "Failed to process subscription" },
            { status: 500 }
        );
    }
}
