const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

/* 
const users = [
    { id: 1, name: 'Abad', email: 'abad@gmail.com' },
    { id: 2, name: 'Abir', email: 'Abir@gmail.com' },
    { id: 3, name: 'Anwar', email: 'Anwar@gmail.com' },
    { id: 4, name: 'Azim', email: 'Azim@gmail.com' },
    { id: 5, name: 'Atik', email: 'Atik@gmail.com' },
    { id: 6, name: 'Akkkash', email: 'Akkkash@gmail.com' },
    { id: 7, name: 'Azmol', email: 'Azmol@gmail.com' }
];
*/

const uri = `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.oxd6r4z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const usersCollection = client.db("NoMOClient").collection("users");

        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users)
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            // user._id = result.insertedId;
            console.log(user);
            res.send(result)
        });

    }
    finally {
        // await client.close();
    }
}

run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send("Hello node!!!")
});

/* 
app.get('/users', (req, res) => {
    // console.log(req.query);
    res.send(users)
});
*/

/* 
app.post('/users', (req, res) => {
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    // console.log(user);
    res.send(user)
});
*/

/* 
app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    // const user = users[id];
    const user = users.find(ur => ur.id == id)
    res.send(user)
});
*/

app.listen(port, () => {
    console.log("App is running", port);
});