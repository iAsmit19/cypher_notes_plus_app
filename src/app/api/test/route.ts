// Test API to test the connection with the database
import clientPromise from "@/lib/mongodb";
import { Db, MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db(
      "xJrjO+iS/vvEYFAc6jZuU5GrGckD6OUalmzvXCpfCscNRCiMb8IdyRk1eU0Cpfmcr21c3oMWlYF88pqy/kgxJg"
    );

    return NextResponse.json({
      message: "Successfully connected to the Database",
      dbName: db.databaseName,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not connect to the database", error },
      { status: 500 }
    );
  }
}
