const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json())

const products = [
    { id: 1, name: 'pen', price: 10 },
    { id: 2, name: 'pencil', price: 15 },
    { id: 3, name: 'cutter', price: 20 },
];


const uri = "mongodb+srv://NoMoUser:LKQtJ7QWzJMPIyUI@cluster0.oxd6r4z.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {
    try {
        const productsCollection = client.db("NoMoClient").collection("products");

        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            console.log(product);
            res.send(product)
        });
    }
    finally {

    }
}

run().catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('App is running')
});

app.get('/products', (req, res) => {
    res.send(products)
});

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