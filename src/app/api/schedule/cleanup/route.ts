// Cleanup File to employ the CRON Job

import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.CRON_API_KEY;

export async function POST(request: NextRequest) {
  try {
    // Validating the API Key
    const apiKey = request.headers.get("x-api-key");
    if (!apiKey || apiKey !== API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Calculating the 30 ays
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));

    // Connecting to the database
    const client = await clientPromise;
    const db = client.db("cypher-notes-v-2");
    const trashCollection = db.collection("trash");

    // Delete the notes older than 30 days
    const result = await trashCollection.deleteMany({
      deletedAt: { $lt: thirtyDaysAgo },
    });

    return NextResponse.json(
      { message: `Clean up has been completed. ${result.deletedCount} notes deleted` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error validating API Key:", error);
    return NextResponse.json(
      { error: "Failed to validate API Key" },
      { status: 500 }
    );
  }
}
