"use client";

import { Button } from "@/components/ui/button";
import createSupabaseBrowserClient from "@/lib/supabase/browser";

export default function OAuthForm() {
    const handleLoginWithGithub = async () => {
        console.log("login with github");
        const supabase = await createSupabaseBrowserClient();

        supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${location.origin}/auth-server-action/callback`,
            },
        });
    };
    return (
        <Button className="w-full" onClick={handleLoginWithGithub}>
            Login With Github
        </Button>
    );
}
