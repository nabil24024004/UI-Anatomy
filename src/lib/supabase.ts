import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface CaseStudyRow {
    id: string;
    title: string;
    slug: string;
    company: string;
    summary: string;
    content: string;
    tags: string[];
    cover_image: string;
    published_at: string;
    created_at: string;
    updated_at: string;
}

export interface SubscriberRow {
    id: string;
    email: string;
    subscribed_at: string;
}
