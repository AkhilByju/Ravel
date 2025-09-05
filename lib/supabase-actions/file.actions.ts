"use server";

import { supabaseServer } from "../supabase/server";

export const getFiles = async ({types = [], searchText = '', sort='$createdAt-desc', limit}: GetFilesProps) => {
    const sb = await supabaseServer();

    const { data: userRes, error: userError } = await sb.auth.getUser();
    if (userError) throw userError;
    if (!userRes.user) throw new Error("User not authenticated");

    const { data, error } = await sb
        .from('files')
        .select('*')
        .order("created_at", { ascending: false})
        .limit(1000);

        if (error) throw error;
        return data ?? [];
}