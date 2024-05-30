const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const url = 'mongodb://localhost:27017';
const dbName = 'mill';
let db;

const client = new MongoClient(url);

const initializeDBAndServer = async () => {
  try {
    await client.connect();
    db = client.db(dbName);
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/", async (req, res) => {
  res.send("Hi from server side");
});

app.post("/register/", async (request, response) => {
  const { username, email, companyName, gst, password } = request.body;
  const userCollection = db.collection('register');
  const dbUser = await userCollection.findOne({ email });

  if (!dbUser) {
    await userCollection.insertOne({
      username,
      email,
      company_name: companyName,
      gst,
      password
    });
    response.send({ display_msg: "Registration Successful" });
  } else {
    response.status(400).send({ display_msg: "User already exists" });
  }
});

app.get("/register", async (req, res) => {
  const userCollection = db.collection('register');
  const users = await userCollection.find({}).toArray();
  res.send(users);
});

app.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const userCollection = db.collection('register');
    const dbUser = await userCollection.findOne({ email });

    if (!dbUser) {
      response.status(400).send({ display_msg: "Invalid User" });
    } else {
      const isPasswordMatched = password === dbUser.password;
      if (isPasswordMatched) {
        const payload = { email };
        const jwtToken = jwt.sign(payload, "jwt_token");
        response.send({ jwtToken, display_msg: "Logged in Successful" });
      } else {
        response.status(400).send({ display_msg: "Incorrect Password" });
      }
    }
  } catch (error) {
    console.error("Error processing login request:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.get("/gram-products", async (req, res) => {
  const productCollection = db.collection('gram_products');
  const products = await productCollection.find({}).toArray();
  res.send(products);
});

app.get("/murmura-products", async (req, res) => {
  const productCollection = db.collection('murmura_products');
  const products = await productCollection.find({}).toArray();
  res.send(products);
});

app.get("/gram-products/:id", async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ display_msg: "Invalid product ID" });
  }
  const productCollection = db.collection('gram_products');
  const product = await productCollection.findOne({ _id: new ObjectId(id) });
  res.send(product);
});

app.get("/murmura-products/:id", async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ display_msg: "Invalid product ID" });
  }
  const productCollection = db.collection('murmura_products');
  const product = await productCollection.findOne({ _id: new ObjectId(id) });
  res.send(product);
});
