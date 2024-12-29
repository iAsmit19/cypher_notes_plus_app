import clientPromise from "@/lib/mongodb";
import { verifyToken } from "@/lib/verifyToken";
import { Db, MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// POST Request Handler
// Adds a new note
export async function POST(request: NextRequest) {
  try {
    // Extracting the token and the note data from the Request Headers which was set by the middleware
    const token = request.headers.get("authorization-token");

    // Validating the userId
    if (!token) {
      return NextResponse.json(
        { error: "Authentication token is missing" },
        { status: 401 }
      );
    }

    // Verifying the token and extracting the decoded userId
    const decoded = verifyToken(token);

    // Validating the decoded
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid or expired authentication token" },
        { status: 403 }
      );
    }

    // Extracting the userId from the decoded token
    const userId = decoded.userId;
    console.log("User ID", userId);
    console.log("Decoded User ID", decoded.userId);

    // Parsing the request body to get the note data
    const { title, content } = await request.json();

    // Validating the title and content fields
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and context are required" },
        { status: 400 }
      );
    }

    // Connecting to the database
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes-v-2");
    const notesCollection = db.collection("notes");

    // Create a new note object
    const now = new Date();
    const newNote = {
      userId,
      title,
      content,
      createdAt: now,
      day: now.getDate(),
      month: now.getMonth(),
      year: now.getFullYear(),
      hours: now.getHours(),
      mins: now.getMinutes(),
      deletedAt: null,
    };

    // Inserting the new note into the notes collection
    await notesCollection.insertOne(newNote);

    return NextResponse.json(
      { message: "Note created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create note", error },
      { status: 500 }
    );
  }
}

// PUT Request Handler
// Edits a note
export async function PUT(request: NextRequest) {
  try {
    // Extracting the token from the request header
    const token = request.headers.get("authorization-token");

    // Validating the token
    if (!token) {
      console.log("Token is missing");

      return NextResponse.json(
        { error: "Authentication token is missing" },
        { status: 401 }
      );
    }

    // Verifying the token and extracting the decoded userId
    const decoded = verifyToken(token);

    // Validating the decoded token
    if (!decoded) {
      console.log("Invalid Token");

      return NextResponse.json(
        { error: "Invalid or expired authentication token" },
        { status: 403 }
      );
    }

    // Extracting the userid from the decoded token
    const userId = decoded.userId;

    // Validating the userId
    if (!userId) {
      console.log("Unauthorized user");

      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Connecting to the database
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes-v-2");
    const notesCollection = db.collection("notes");

    // Parsing the request body to get the updated note
    const { id, ...updatedData } = await request.json();

    console.log("ID and the updated note, ", id);

    if (!id || Object.keys(updatedData).length === 0) {
      console.log("Note ID is required");

      return NextResponse.json(
        { error: "Note ID is required" },
        { status: 400 }
      );
    }

    // Updating the note with the given ID anf userId
    const result = await notesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    // Checking if the note was updated successfully
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Note not found or does not belong to the user" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Note updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error faced ", error);

    return NextResponse.json(
      { message: "Failed to update note", error },
      { status: 500 }
    );
  }
}
