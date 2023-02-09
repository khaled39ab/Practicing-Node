const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json())

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
});

app.post('/products', (req,res)=>{
    const product = req.body;
    product.id = products.length + 1;
    products.push(product)
    console.log(product);
    res.send(product)
});

app.listen(port, () =>{
    console.log('App listening at', port);
});