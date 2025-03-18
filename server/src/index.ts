// import mongoose from "mongoose";
// import app from "./app";
// import { config } from "./config";
//
//
// const main = async () => {
//     try {
//         await mongoose.connect(MONGO_URI);
//         console.log("Connected to mongo db");
//
//         app.listen(Number(PORT), HOST, () => {
//             console.log(`Server is running on http://${HOST}:${PORT}`);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// };

// main();
import { config } from "./config";

const { DB_PASSWORD } = config;

import {MongoClient, ServerApiVersion} from 'mongodb';
const uri = `mongodb+srv://matet2001:${DB_PASSWORD}@learncluster.txclaxs.mongodb.net/?retryWrites=true&w=majority&appName=LearnCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        console.log("Server listening on 8080!");

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
