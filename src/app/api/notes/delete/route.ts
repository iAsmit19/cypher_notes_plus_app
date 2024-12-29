import clientPromise from "@/lib/mongodb";
import { Db, MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// DELETE Request Handler
// Deletes all of the notes from the trash collection
export async function DELETE(request: NextRequest) {
  try {
    // Extracting the token from the request header
    const token = request.headers.get("authorization-token");

    // Validating the userId
    if (!token) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Connecting to the database
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes-v-2");

    // Accessing the trash collection
    const trashCollection = db.collection("trash");

    // Deleting the note from the trash collection
    const result = await trashCollection.deleteMany({});

    // Checking if the note was deleted
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Note not found in the trash" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Notes have been deleted from trash",
        deletedCount: result.deletedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete notes from trash", error },
      { status: 500 }
    );
  }
}
