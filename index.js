const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
// import from mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

/*######## MIDDLEWARE ########### */

// imranhossainsakil22
// H31lwwDMMpzWXbT3

app.use(cors());
app.use(express.json());

const uri =
	"mongodb+srv://imranhossainsakil22:H31lwwDMMpzWXbT3@cluster0.7o1h45b.mongodb.net/?retryWrites=true&w=majority";

//MongoClientOptions object
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		// Connect the client to the server
		await client.connect();
		// Set database collection name
		const userCollection = client.db("userDB").collection("user");

		// GET API
		app.get("/users", async (req, res) => {
			// Create cursor
			const cursor = userCollection.find();
			const result = await cursor.toArray();
			res.send(result);
		});

		// POST API
		app.post("/users", async (req, res) => {
			const user = await req.body;
			console.log("New cretaed user", user);

			// Send user data to the database
			const result = await userCollection.insertOne(user);
			res.send(result);
		});

		app.delete("/users/:id", async (req, res) => {
			const id = req.params.id;
			console.log("Please delete from databse", id);

			// Delte from database
			const query = { _id: new ObjectId(id) };
			const result = await userCollection.deleteOne(query);
			res.send(result);
		});

		// Send a ping to confirm a successful connection
		await client.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);
	} finally {
		// Ensures that the client will close when you finish/error
		// If er want to keep connected 24/7. We should not close the client
		// await client.close();
	}
}
run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("Simple CRUD server is running....");
});

app.listen(port, () => {
	console.log(`Crud server is running on port ${port}`);
});
