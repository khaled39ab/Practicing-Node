const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express();

app.use(cors())

const products =[
    {id: 1, name: 'pen', price: 10},
    {id: 2, name: 'pencil', price: 15},
    {id: 3, name: 'cutter', price: 20},
]
app.get('/', (req, res) =>{
    res.send('App is running')
});

app.get('/products', (req, res) =>{
    res.send(products)
})

app.listen(port, () =>{
    console.log('App listening at', port);
});