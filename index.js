const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const users = [
    { id: 1, name: 'Abad', email: 'abad@gmail.com' },
    { id: 2, name: 'Abir', email: 'Abir@gmail.com' },
    { id: 3, name: 'Anwar', email: 'Anwar@gmail.com' },
    { id: 4, name: 'Azim', email: 'Azim@gmail.com' },
    { id: 5, name: 'Atik', email: 'Atik@gmail.com' },
    { id: 6, name: 'Akkkash', email: 'Akkkash@gmail.com' },
    { id: 7, name: 'Azmol', email: 'Azmol@gmail.com' }
]

app.get('/', (req, res) => {
    res.send("Hello node!!!")
});

app.get('/users', (req, res) => {
    res.send(users)
});

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    // const user = users[id];
    const user = users.find(ur => ur.id == id)
    res.send(user)
})

app.listen(port, () => {
    console.log("App is running", port);
});