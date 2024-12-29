import clientPromise from "@/lib/mongodb";
import { Db, MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Extracting the email and the password from the request
    const { email, password } = await request.json();

    // Validating the email and password
    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required, please try again" },
        { status: 400 }
      );
    }

    // Connecting to the database
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes-v-2");

    // Checking if the user already exists
    const existingUser = await db.collection("user").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists, you are being redirected to the login page." },
        { status: 400 }
      );
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Saving the user into the database
    const result = await db.collection("user").insertOne({
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "User has been registered successfully",
        userId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "User could not be registered", error },
      { status: 500 }
    );
  }
}
