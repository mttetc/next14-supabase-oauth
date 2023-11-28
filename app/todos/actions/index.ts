"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function createTodo(title: string) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("todos").insert({ title }).single();

    revalidatePath("/todos");

    return JSON.stringify(result);
}

export async function readTodos() {
    unstable_noStore();

    const supabase = await createSupabaseServerClient();

    return await supabase.from("todos").select("*");
}

export async function deleteTodoById(id: string) {
    const supabase = await createSupabaseServerClient();
    await supabase.from("todos").delete().eq("id", id);

    revalidatePath("/todos");
}

export async function updateTodoById(id: string, completed: boolean) {
    const supabase = await createSupabaseServerClient();
    await supabase.from("todos").update({ completed }).eq("id", id);

    revalidatePath("/todos");
}
