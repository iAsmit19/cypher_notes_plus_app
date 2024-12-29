import clientPromise from "@/lib/mongodb";
import { Db, MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    // Extracting the email and the password from the request
    const { email, password } = await request.json();

    // Validating email and password
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required!" },
        { status: 400 }
      );
    }

    // Connecting to the Database
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("cypher-notes-v-2");

    // Finding the User in the database
    const user = await db.collection("user").findOne({ email });

    // Checking if the user exists
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist." },
        { status: 401 }
      );
    }

    // Verifying the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Incorrect password!"},
        { status: 401 }
      );
    }

    // Generating a JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    // Send both token and user data
    return NextResponse.json(
      { message: "Login successful", token, user }, // Include the user data here
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Login failed", error },
      { status: 500 }
    );
  }
}
