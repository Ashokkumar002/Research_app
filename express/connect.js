const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb+srv://nithishrana17:hXBXoK6uYix9ZPny@cluster0.pn1pv.mongodb.net/";
const client = new MongoClient(url);

// Database Name
const dbName = "UserDB";

async function main() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log("Connected to MongoDB");

        // Get the database and collection
        const db = client.db(dbName);
        const collection = db.collection("Auth");

        // Fetch data from the collection
        const data = await collection.find({}).toArray();
        console.log("Retrieved data:", data);

        return data;
    } catch (err) {
        console.error("Error connecting to MongoDB or retrieving data:", err);
    } finally {
        // Ensure the client is closed when done
        await client.close();
        console.log("Connection closed");
    }
}

// Call the main function
main()
    .then((data) => console.log("Operation completed"))
    .catch((err) => console.error("Unexpected error:", err));
