require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const client = new MongoClient(process.env.MONGO_URI);

let users;

app.use(express.json());
app.use(cors());

async function connectDatabase() {
    try {
        await client.connect();
        const db = client.db("pa2");
        users = db.collection("users");
        await users.createIndex({ username: 1 }, { unique: true });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB");
        console.error(error);
    }
}

app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

app.post("/signup", async (req, res) => {
    const f_name = (req.body.f_name || "").trim();
    const l_name = (req.body.l_name || "").trim();
    const username = (req.body.username || "").trim();
    const password = req.body.password || "";

    if (f_name === "" || l_name === "" || username === "" || password === "") {
        return res.status(400).json({ message: "Please fill in all of the fields." });
    }

    try {
        const existing = await users.findOne({ username: username });

        if (existing !== null) {
            return res.status(409).json({ message: "That username is already taken." });
        }

        await users.insertOne({
            f_name: f_name,
            l_name: l_name,
            username: username,
            password: password
        });

        res.status(201).json({ message: "Account created! You can log in now." });
    } catch (error) {
        console.error(error);

        if (error.code === 11000) {
            return res.status(409).json({ message: "That username is already taken." });
        }

        res.status(500).json({ message: "Something went wrong on the server. Please try again." });
    }
});

app.post("/login", async (req, res) => {
    const username = (req.body.username || "").trim();
    const password = req.body.password || "";

    if (username === "" || password === "") {
        return res.status(400).json({ message: "Please enter both a username and a password." });
    }

    try {
        const user = await users.findOne({ username: username });

        if (user === null) {
            return res.status(401).json({ message: "No account with that username exists." });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password." });
        }

        res.status(200).json({ message: "Welcome back, " + user.f_name + "! You are logged in." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong on the server. Please try again." });
    }
});

connectDatabase();

app.listen(9000, () => {
    console.log("Server running on port 9000");
});
