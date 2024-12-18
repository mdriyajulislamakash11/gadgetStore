const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(express.json());
app.use(cors())

// WwmrAb81yKaxV4MT
// gadgetStore




const uri = `mongodb+srv://gadgetStore:WwmrAb81yKaxV4MT@cluster0.zchez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // await client.connect();

    const userCollection = client.db("gadgetDB").collection("gadgets");
    

app.get("/gadget", async (req, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray();
      res.send(result)
});



    app.get("/gadgets/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await userCollection.findOne(query);
      res.send(result)
    })


    app.post("/gadgets", async (req, res) => {
      const newUser = req.body;
      console.log(newUser)
      const result = await userCollection.insertOne(newUser);
      res.send(result)
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
//     await client.close();
  }
}
run().catch(console.dir);







app.get("/", (req, res) => {
      res.send("the Cood is running...")
});

app.listen(port, () => {
      console.log(`the code is Running port:${port}`)
})
