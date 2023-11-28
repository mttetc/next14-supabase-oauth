"use server";

import { unstable_noStore } from "next/cache";
import createSupabaseServerClient from "../supabase/server";

export default async function readUserSession() {
    unstable_noStore();
    const supabase = await createSupabaseServerClient();
    return supabase.auth.getSession();
}
