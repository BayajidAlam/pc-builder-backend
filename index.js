const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());

// mongouri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@myclaster-1.wxhqp81.mongodb.net/?retryWrites=true&w=majority`;

// Define MongoDB client outside the run function so we can reuse it.
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the MongoDB client before registering route handlers
    await client.connect();
    console.log("Connected to MongoDB");

    // collections 
    const myCollection = client.db("pcBuilder").collection("components");
    const builderComponents = client.db('pcBuilder').collection('builderCompo')

    // general/initial api
    app.get("/", (req, res) => {
      res.send("hello world");
    });

    // get all components data
    app.get("/pc", async (req, res) => {
      const query = {};
      const options = myCollection.find(query);
      const result = await options.toArray();
      res.send(result);
    });

    // load data based on component name
    app.get("/cpu", async (req, res) => {
      const pcData = myCollection.find({
        category: "CPU / Processor",
      });
      const result = await pcData.toArray();
      res.send(result);
    });
    app.get("/motherboard", async (req, res) => {
      const pcData = myCollection.find({
        category: "Motherboard",
      });
      const result = await pcData.toArray();
      res.send(result);
    });
    app.get("/ram", async (req, res) => {
      const pcData = myCollection.find({
        category: "RAM",
      });
      const result = await pcData.toArray();
      res.send(result);
    });
    app.get("/psu", async (req, res) => {
      const pcData = myCollection.find({
        category: "PSU",
      });
      const result = await pcData.toArray();
      res.send(result);
    });
    app.get("/storage", async (req, res) => {
      const pcData = myCollection.find({
        category: "Storage Device",
      });
      const result = await pcData.toArray();
      res.send(result);
    });
    app.get("/monitor", async (req, res) => {
      const pcData = myCollection.find({
        category: "Monitor",
      });
      const result = await pcData.toArray();
      res.send(result);
    });
    app.get("/others", async (req, res) => {
      const pcData = myCollection.find({
        category: "Others",
      });
      const result = await pcData.toArray();
      res.send(result);
    });

    // get a specific product details
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const pcData = await myCollection.findOne({ _id: new ObjectId(id) });
      res.send(pcData);
    });

       // get all builder components data
       app.get("/builder-data", async (req, res) => {
        const query = {};
        const options = builderComponents.find(query);
        const result = await options.toArray();
        res.send(result);
      });

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);
