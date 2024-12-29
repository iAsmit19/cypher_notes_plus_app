// MongoDB Configuration Utility File
import { MongoClient } from "mongodb";

// Validating the MongoDB Connection String
if (!process.env.MONGODB_URI) {
  throw new Error("Error occurred, please deifne the MONGODB_URI correctly.");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Checking whether the app is in Development mode or in Production mode to ensure no useless requests are made to the database
if (process.env.NODE_ENV === "development") {
  // Using global variabe to preserve the value/connection accross the module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  // In production, always creating a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
