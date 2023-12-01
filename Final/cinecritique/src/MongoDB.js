var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";
const { MongoClient } = require("mongodb");

// Mongo
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.get("/Movies", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
        .collection("Movies")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
    });

app.get("/:id", async (req, res) => {
    const robotid = Number(req.params.id);
    console.log("Movie to find :", movieid);

    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": movieid };

    const results = await db.collection("Movies")
    .findOne(query);
    
    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);
});

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});