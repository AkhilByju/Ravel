"use server";

import { Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";

export async function getStats() {
    const {storage, databases } = await createAdminClient();

    let totalFiles = 0;
    let totalSpace = 0;
    let cursor: string | undefined;

    while (true){
        const queries = [Query.limit(100)];
        if (cursor) queries.push(Query.cursorAfter(cursor));

        const page = await storage.listFiles(appwriteConfig.bucketId, queries);

        if (totalFiles === 0) totalFiles = page.total ?? 0;

        for (const f of page.files) {
            totalSpace += f.sizeOriginal ?? 0;
        }

        if (page.files.length < 100) break;
        cursor = page.files[page.files.length - 1].$id;
    }

    // inside getStats()
    const since = new Date(Date.now() - 7*24*60*60*1000).toISOString();

    // Count Storage files created in the last 7 days
    const recentFiles = await storage.listFiles(appwriteConfig.bucketId, [
    Query.greaterThan("$createdAt", since),
    Query.limit(1), // we only need the .total
    ]);

const recentActivity = recentFiles.total ?? 0;

    return {
        totalFiles,
        totalSpace,
        recentActivity,
    };
}