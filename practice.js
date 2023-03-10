const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json())

const products = [
    { id: 1, name: 'pen', price: 10 },
    { id: 2, name: 'pencil', price: 15 },
    { id: 3, name: 'cutter', price: 20 },
];


const uri = `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.oxd6r4z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {
    try {
        const productsCollection = client.db("NoMOClient").collection("products");

        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await productsCollection.findOne(query);
            res.send(result);
        });

        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            res.send(result)
        });

        app.put('/product/:id', async (req, res) => {
            const id = req.params.id;
            const product = req.body;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateProduct = {
                $set: {
                    name: product.name,
                    price: product.price
                }
            };
            const result = await productsCollection.updateOne(query, updateProduct, options);
            res.send(result);
        });

        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await productsCollection.deleteOne(query)
            res.send(result)
        });

    }
    finally {
        // await client.close();
    }
}

run().catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('App is running')
});

/* 
app.get('/products', (req, res) => {
    res.send(products)
});
*/

/* app.post('/products', (req, res) => {
    const product = req.body;
    product.id = products.length + 1;
    products.push(product)
    console.log(product);
    res.send(product)
}); */

app.listen(port, () => {
    console.log('App listening at', port);
});