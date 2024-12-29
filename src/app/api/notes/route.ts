import clientPromise from "@/lib/mongodb";
import { verifyToken } from "@/lib/verifyToken";
import { Db, MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// GET Request Handler
// Gets the authenticated notes for the user from the database
export async function GET(request: NextRequest) {
  try {
    // extract the token forwarded by the middleware
    const token = request.headers.get("authorization-token");

    // validate the token
    if (!token) {
      return NextResponse.json(
        { message: "Authentication token is missing" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    console.log("GET Decoded", decoded);

    // if token is invalid or expired
    if (!decoded) {
      return NextResponse.json(
        { message: "invalid or expired authentication token" },
        { status: 403 }
      );
    }

    const userId = decoded.userId; // extract userId from the decoded token
    console.log("verified user id:", userId);

    // Connecting to the database
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes-v-2");
    const notesCollection = db.collection("notes");

    // Finding the notes for the authenticated user
    const notes = await notesCollection.find({ userId }).toArray();

    // Returning the notes in the response
    return NextResponse.json({ notes });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch notes", error },
      { status: 500 }
    );
  }
}
