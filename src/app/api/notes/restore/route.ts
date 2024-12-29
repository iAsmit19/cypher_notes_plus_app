import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// PATCH Request Handler
// Recovers the note from the trash collection and add it back to the notes collection
export async function PATCH(request: NextRequest) {
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

    // Parsing the request body to get the note ID
    const { noteId } = await request.json();

    // Validating the noteId
    if (!noteId) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    // Connecting to the database
    const client = await clientPromise;
    const db = client.db("cypher-notes-v-2");

    // Accessing the trash and the notes collections
    const trashCollection = db.collection("trash");
    const notesCollection = db.collection("notes");

    // Finding the note in the trash collection
    const note = await trashCollection.findOne({ _id: new ObjectId(noteId) });

    // Validating the note
    if (!note) {
      return NextResponse.json(
        { error: "Note not found in the trash" },
        { status: 404 }
      );
    }

    // Removing the note from the trash collection
    await trashCollection.deleteOne({ _id: note._id });

    // Inserting the note back into the notes collection
    const { deletedAt, ...restoredNote } = note;
    await notesCollection.insertOne({
      ...restoredNote,
      restoredAt: new Date(),
    });

    return NextResponse.json(
      { message: "Note recovered successfully", deletedAt },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to recover note", error },
      { status: 500 }
    );
  }
}
