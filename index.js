const express = require('express');
const { MongoClient, Collection } = require('mongodb');
const cors = require('cors');
require("dotenv").config();

const id = require("mongodb").id;

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors());
const corsConfig = {
    origin: '',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.options("", cors(corsConfig))
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@techplaza.md5smvx.mongodb.net/techplaza?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const infoCollection = client.db("techplaza").collection("component");


    app.get('/pc', async (req, res) => {
        const category = req.query.category;
        if (category == null) {
            const result = await infoCollection.find({}).toArray();
            res.send(result);
        }
        else {
            const result = await infoCollection.find({ category: category }).toArray();
            if (result.length > 0) {
                res.json(result);
            } else {

                res.status(404).json({ message: "No items found in the specified category" });
            }
        }





    });

    app.get("/pc/:id", async (req, res) => {

        const result = await infoCollection
            .findOne({ id: req.params.id })


        res.send(result);
    });

});


app.get('/', (req, res) => {
    res.send('HI');
});


app.listen(process.env.PORT || port);