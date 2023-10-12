const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();

/*######## MIDDLEWARE ########### */

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Simple CRUD server is running....");
});

app.listen(port, () => {
	console.log(`Crud server is running on port ${port}`);
});
