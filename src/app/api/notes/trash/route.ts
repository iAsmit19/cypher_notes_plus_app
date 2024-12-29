import clientPromise from "@/lib/mongodb";
import { verifyToken } from "@/lib/verifyToken";
import { Db, MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// GET Request Handler
// Gets the trashed notes from the trash collection
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization-token");

    if (!token) {
      return NextResponse.json(
        { message: "Authentication token is missing" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    console.log("GET Decoded", decoded);

    if (!decoded) {
      return NextResponse.json(
        { message: "Invalid or expired authentication token" },
        { status: 403 }
      );
    }

    const userId = decoded.userId;
    console.log("User ID", userId);

    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes-v-2");
    const trashCollection = db.collection("trash");

    const trashedNotes = await trashCollection.find({ userId }).toArray();

    return NextResponse.json({ trashedNotes });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch trashed notes", error },
      { status: 500 }
    );
  }
}

// PATCH Request Handler
// Moves the note to the trash collection when deleted by the user
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
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes-v-2");

    // Checking for the note's existence in the notes collection
    const notesCollection = db.collection("notes");
    const note = await notesCollection.findOne({ _id: new ObjectId(noteId) });

    // Validating the note
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    // Creating a trash object to store the note in the trash collection
    const trashCollection = db.collection("trash");
    const trashNote = {
      ...note,
      deletedAt: new Date(),
    };

    // Adding the note to the trash collection
    await trashCollection.insertOne(trashNote);

    // Removing the note from the notes collection
    await notesCollection.deleteOne({ _id: new ObjectId(noteId) });

    return NextResponse.json(
      { message: "Note has been moved to trash" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to move note to trash", error },
      { status: 500 }
    );
  }
}

// DELETE Request Handler
// Deletes the note from the trash collection
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

    // Parsing the request body to get the noteId
    const { noteId } = await request.json();

    // Validating the noteId
    if (!noteId) {
      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    // Connecting to the database
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes-v-2");

    // Accessing the trash collection
    const trashCollection = db.collection("trash");

    // Deleting the note from the trash collection
    const result = await trashCollection.deleteOne({
      _id: new ObjectId(noteId),
    });

    // Checking if the note was deleted
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Note not found in the trash" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Notes have been deleted from trash" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete notes from trash", error },
      { status: 500 }
    );
  }
}
